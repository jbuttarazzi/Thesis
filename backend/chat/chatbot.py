"""
filename: chatbot.py

description: Hamilton College - International Student Services Chatbot
             RAG pipeline using Groq (Qwen3-32b) + LanceDB
"""

# Necessary imports for LLM and vector data base
import os
from groq import Groq
import lancedb
from pathlib import Path
from sentence_transformers import SentenceTransformer
from typing import Optional
import time

from dotenv import load_dotenv
load_dotenv()


GROQ_MODEL = "qwen/qwen3-32b"    # Selected LLM (hosted on Groq)
EMBED_MODEL = "all-MiniLM-L6-v2" #Embedding model
DB_PATH = "./lancedb_store"  # Storage path for lancedb
TABLE_NAME = "iss_knowledge"  # Vector table name
TOP_K = 5  # Number of retrieved chunks per query 

SYSTEM_PROMPT = """You are a helpful assistant for Hamilton College's International Student Services (ISS).

You help students with: F-1/J-1 visas, OPT, CPT, STEM OPT, SEVIS, I-20s, travel signatures,
health insurance waivers, orientation, campus resources, and academic policies.

Guidelines:
- Answer only from the context provided. The context provided is your brain. If the answer isn't there, say clearly.
- For complex immigration or legal questions, refer the student to a DSO or PDSO.
- If you're unsure, suggest contacting ISS directly at iss@hamilton.edu.
- Be warm, clear, and concise."""


# Singleton Groq client (one instance per process)
class GroqClient:
    _instance: Optional["GroqClient"] = None

    def __init__(self):
        api_key = os.environ.get("GROQ_API_KEY")
        if not api_key:
            raise RuntimeError("GROQ_API_KEY environment variable is not set.")
        self.client = Groq(api_key=api_key)
        print(f"Groq client initialized. Model: {GROQ_MODEL}")

    # Retrieve the shared client instance and create one if it does not exist
    @classmethod
    def get(cls) -> "GroqClient":
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance


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


# Vector Store LanceDB Wrapper (manage table creation, store embeddings + metadata, perform similarity search)
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



# RAG Chatbot (manage vector retrieval, build augmented prompts, maintain conversation history,
# call Groq LLM, and support streaming responses)
class ISSChatbot:
    def __init__(self):
        self.store = VectorStore()
        self.groq = GroqClient.get()
        self.conversation_history: list[dict] = []

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

        # Assemble messages for the LLM
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]

        if use_history:
            # Keep only the last 4 exchanges (8 messages) to limit prompt growth
            trimmed_history = self.conversation_history[-8:]
            messages.extend(trimmed_history)

        messages.append({"role": "user", "content": augmented_prompt})

        # Call Groq
        response = self.groq.client.chat.completions.create(
            model=GROQ_MODEL,
            messages=messages,
            extra_body={"reasoning_effort": "none"}  # Disables reasoning tokens entirely for Qwen 3
        )
        assistant_message = response.choices[0].message.content

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

        # Call Groq with streaming enabled
        stream = self.groq.client.chat.completions.create(
            model=GROQ_MODEL,
            messages=messages,
            stream=True,
            extra_body={"reasoning_effort": "none"}  # Disables reasoning tokens entirely for Qwen 3
        )

        first_token = True
        full_response = ""

        for chunk in stream:
            token = chunk.choices[0].delta.content or ""
            if first_token and token:
                print(f"[TIMING] First token from Groq: {time.time() - t1:.2f}s")
                first_token = False
            full_response += token
            yield token

        self.conversation_history.append({"role": "user", "content": user_message})
        self.conversation_history.append({"role": "assistant", "content": full_response})