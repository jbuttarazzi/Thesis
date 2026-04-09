"""
Hamilton College - International Student Services Chatbot
RAG pipeline using Ollama (Qwen2.5) + LanceDB
"""

# Necessary imports for LLM and vector data base
import os
import ollama
import lancedb
import numpy as np
from pathlib import Path
from sentence_transformers import SentenceTransformer
from typing import Optional
import time


OLLAMA_MODEL = "qwen2.5:7b" # Selected LLM
EMBED_MODEL = "all-MiniLM-L6-v2" #Embedding model (# fast, multilingual-friendly, ~80MB)
DB_PATH = "./lancedb_store"  # Storage path for lancedb
TABLE_NAME = "iss_knowledge"  # Vector table name
TOP_K = 3  # Number of retrieved chunks per query 

SYSTEM_PROMPT = """You are a helpful assistant for Hamilton College's International Student Services (ISS).

You help students with: F-1/J-1 visas, OPT, CPT, STEM OPT, SEVIS, I-20s, travel signatures,
health insurance waivers, orientation, campus resources, and academic policies.

Guidelines:
- Answer only from the context provided. If the answer isn't there, say so clearly.
- For complex immigration or legal questions, refer the student to a DSO or PDSO.
- If you're unsure, suggest contacting ISS directly at iss@hamilton.edu.
- Be warm, clear, and concise."""



# Singleton Embedder (ensures one instance per process avoiding repeated model initialization)
class Embedder:
    _instance: Optional["Embedder"] = None

    def __init__(self):
        print(f"Loading embedding model: {EMBED_MODEL}")
        self.model = SentenceTransformer(EMBED_MODEL)

    # Retrieve the shared embedder instance and create one if it does not exist
    @classmethod
    def get(cls) -> "Embedder":
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    # Convert a single string into a normalized embedding vector.
    def embed(self, text: str) -> list[float]:
        return self.model.encode(text, normalize_embeddings=True).tolist()

    # Convert multiple strings into embedding vectors, used for document ingestion 
    def embed_batch(self, texts: list[str]) -> list[list[float]]:
        return self.model.encode(texts, normalize_embeddings=True).tolist()


# Vector Store Lancedb Rapper (manage table creation, store embeddings + metadata, perform similarity search)
class VectorStore:
    def __init__(self):
        self.db = lancedb.connect(DB_PATH)
        self.embedder = Embedder.get()
        self._ensure_table()

    # Ensure the vector table exists, if not create it 
    def _ensure_table(self):
        """Create table if it doesn't exist."""
        if TABLE_NAME not in self.db.table_names():
            import pyarrow as pa
            dim = 384  # all-MiniLM-L6-v2 output dimension
            schema = pa.schema([
                pa.field("vector", pa.list_(pa.float32(), dim)),
                pa.field("text", pa.string()),
                pa.field("source", pa.string()),
                pa.field("category", pa.string()),
            ])
            self.db.create_table(TABLE_NAME, schema=schema)
            print(f"Created LanceDB table: {TABLE_NAME}")
        self.table = self.db.open_table(TABLE_NAME)


    def add_documents(self, docs: list[dict]):
        """
        Add documents to the vector store.
        Each doc should have: {"text": str, "source": str, "category": str}
        """
        texts = [d["text"] for d in docs]
        vectors = self.embedder.embed_batch(texts)

        rows = [
            {
                "vector": vec,
                "text": doc["text"],
                "source": doc.get("source", "unknown"),
                "category": doc.get("category", "general"),
            }
            for vec, doc in zip(vectors, docs)
        ]
        self.table.add(rows)
        print(f"Added {len(rows)} documents to vector store.")

    def search(self, query: str, top_k: int = TOP_K) -> list[dict]:
        """Retrieve the top-k most relevant chunks for a query."""
        query_vec = self.embedder.embed(query)
        results = (
            self.table.search(query_vec)
            .limit(top_k)
            .select(["text", "source", "category"])
            .to_list()
        )
        return results

    def count(self) -> int:
        return self.table.count_rows()



# RAG Chatbot (manage vector retrieval, build augmented prompts, maintain conversation history
# call Ollama LLM, and support streaming responses)
class ISSChatbot:
    def __init__(self):
        self.store = VectorStore()
        self.conversation_history: list[dict] = []
        self._verify_ollama()

    def _verify_ollama(self):
        """Check that Ollama is running and the model is available."""
        try:
            models = [m.model for m in ollama.list().models]
            if OLLAMA_MODEL not in models:
                print(f"Model '{OLLAMA_MODEL}' not found. Pulling now...")
                ollama.pull(OLLAMA_MODEL)
                print("Model pulled successfully.")
            else:
                print(f"Model '{OLLAMA_MODEL}' is ready.")
        except Exception as e:
            raise RuntimeError(
                f"Could not connect to Ollama. Is it running? (`ollama serve`)\nError: {e}"
            )

    def _build_context(self, results: list[dict]) -> str:
        """Convert retrieved chunks into formatted context block."""
        if not results:
            return "No relevant context found."
        parts = []
        for i, r in enumerate(results, 1):
            parts.append(f"[{i}] (Source: {r['source']})\n{r['text']}")
        return "\n\n".join(parts)

    def chat(self, user_message: str, use_history: bool = True) -> str:
        """
        Send a message and get a response using RAG.

        Args:
            user_message: The student's question
            use_history:  Whether to include conversation history (multi-turn)
        """
        # Retrieve relevant context
        results = self.store.search(user_message)
        context = self._build_context(results)

        # Build the augmented user prompt
        augmented_prompt = f"""Context from ISS knowledge base:
{context}

Student question: {user_message}"""

        #Assemble messages for the LLM
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]

        if use_history:
            # Keep only the last 4 exchanges (8 messages) to limit prompt growth
            trimmed_history = self.conversation_history[-8:]
            messages.extend(trimmed_history)

        messages.append({"role": "user", "content": augmented_prompt})

        # Call Ollama
        response = ollama.chat(
            model=OLLAMA_MODEL,
            messages=messages,
            keep_alive=-1,  # keep model in GPU memory indefinitely
        )
        assistant_message = response.message.content

        # Update history (store the clean user message, not the augmented one)
        if use_history:
            self.conversation_history.append({"role": "user", "content": user_message})
            self.conversation_history.append({"role": "assistant", "content": assistant_message})

        return assistant_message

    def clear_history(self):
        self.conversation_history = []
        print("Conversation history cleared.")

    def stream_chat(self, user_message: str):
        """Streaming version of chat. Yields tokens incrementally for frontend SSE streaming.
        Includes timing instrumentation for performance debugging."""
        t0 = time.time()

        results = self.store.search(user_message)
        print(f"[TIMING] RAG search: {time.time() - t0:.2f}s")

        context = self._build_context(results)

        # Keep only the last 4 exchanges (8 messages) to limit prompt growth
        trimmed_history = self.conversation_history[-8:]

        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        messages.extend(trimmed_history)
        messages.append({"role": "user", "content": f"Context:\n{context}\n\nStudent question: {user_message}"})

        t1 = time.time()
        stream = ollama.chat(
            model=OLLAMA_MODEL,
            messages=messages,
            stream=True,
            keep_alive=-1,  # keep model in GPU memory indefinitely
        )
        first_token = True
        full_response = ""

        for chunk in stream:
            token = chunk.message.content
            if first_token:
                print(f"[TIMING] First token from Ollama: {time.time() - t1:.2f}s")
                first_token = False
            full_response += token
            yield token

        self.conversation_history.append({"role": "user", "content": user_message})
        self.conversation_history.append({"role": "assistant", "content": full_response})