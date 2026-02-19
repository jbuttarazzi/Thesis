"""
Hamilton College - International Student Services Chatbot
RAG pipeline using Ollama (Qwen2.5) + LanceDB
"""

import os
import ollama
import lancedb
import numpy as np
from pathlib import Path
from sentence_transformers import SentenceTransformer
from typing import Optional

# ─────────────────────────────────────────────
# Config
# ─────────────────────────────────────────────
OLLAMA_MODEL = "qwen2.5:7b"
EMBED_MODEL = "all-MiniLM-L6-v2"   # fast, multilingual-friendly, ~80MB
DB_PATH = "./lancedb_store"
TABLE_NAME = "iss_knowledge"
TOP_K = 5  # number of chunks to retrieve

SYSTEM_PROMPT = """You are a helpful assistant for the International Student Services (ISS) 
department at Hamilton College. You help international students with questions about:
- Visa and immigration (F-1, J-1, OPT, CPT, STEM OPT)
- Arrival and orientation procedures
- On-campus resources and support services
- Academic policies as they relate to international students
- Health insurance requirements
- Travel signatures and re-entry procedures

Always be warm, clear, and patient. If you are unsure about something, say so and 
direct the student to contact the ISS office directly. Never provide legal advice — 
refer complex immigration questions to a DSO or PDSO.

Use only the context provided below to answer questions. If the answer is not in the 
context, say you don't have that information and suggest contacting ISS directly."""


# ─────────────────────────────────────────────
# Embedder (singleton)
# ─────────────────────────────────────────────
class Embedder:
    _instance: Optional["Embedder"] = None

    def __init__(self):
        print(f"Loading embedding model: {EMBED_MODEL}")
        self.model = SentenceTransformer(EMBED_MODEL)

    @classmethod
    def get(cls) -> "Embedder":
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def embed(self, text: str) -> list[float]:
        return self.model.encode(text, normalize_embeddings=True).tolist()

    def embed_batch(self, texts: list[str]) -> list[list[float]]:
        return self.model.encode(texts, normalize_embeddings=True).tolist()


# ─────────────────────────────────────────────
# Vector Store
# ─────────────────────────────────────────────
class VectorStore:
    def __init__(self):
        self.db = lancedb.connect(DB_PATH)
        self.embedder = Embedder.get()
        self._ensure_table()

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


# ─────────────────────────────────────────────
# RAG Chatbot
# ─────────────────────────────────────────────
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
        # 1. Retrieve relevant context
        results = self.store.search(user_message)
        context = self._build_context(results)

        # 2. Build the augmented user prompt
        augmented_prompt = f"""Context from ISS knowledge base:
{context}

Student question: {user_message}"""

        # 3. Assemble messages for the LLM
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]

        if use_history:
            messages.extend(self.conversation_history)

        messages.append({"role": "user", "content": augmented_prompt})

        # 4. Call Ollama
        response = ollama.chat(model=OLLAMA_MODEL, messages=messages)
        assistant_message = response.message.content

        # 5. Update history (store the clean user message, not the augmented one)
        if use_history:
            self.conversation_history.append({"role": "user", "content": user_message})
            self.conversation_history.append({"role": "assistant", "content": assistant_message})

        return assistant_message

    def clear_history(self):
        self.conversation_history = []
        print("Conversation history cleared.")

    def stream_chat(self, user_message: str):
        """
        Stream the response token by token (generator).
        Useful for a real-time UI feel.
        """
        results = self.store.search(user_message)
        context = self._build_context(results)

        augmented_prompt = f"""Context from ISS knowledge base:
{context}

Student question: {user_message}"""

        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        messages.extend(self.conversation_history)
        messages.append({"role": "user", "content": augmented_prompt})

        full_response = ""
        for chunk in ollama.chat(model=OLLAMA_MODEL, messages=messages, stream=True):
            token = chunk.message.content
            full_response += token
            yield token

        self.conversation_history.append({"role": "user", "content": user_message})
        self.conversation_history.append({"role": "assistant", "content": full_response})