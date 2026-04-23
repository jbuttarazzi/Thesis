"""
filename: backendmain.py

description: FastAPI Application Entry Point containing
            Hamilton College International Student Services Chatbot.

            This file initializes and runs the backend API server.
"""


# Necessary imports for the entire backend
from contextlib import asynccontextmanager
from fastapi import FastAPI
from chat.api import router as chat_router
from chat.chatbot import VectorStore
from chat.ingest import ingest_directory
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import uvicorn

# Directory containing documents to ingest at startup
DOCS_DIR = Path("./chat/docs")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    FastAPI lifespan context manager that runs once at application startup (before serving requests)
    and once at shutdown (after app stops).
    Used for auto-ingestion of documents on first run.
    """

    store = VectorStore()
    # If the vector database is empty, automatically ingest documents from DOCS_DIR
    if store.count() == 0:
        print(f"Vector store is empty. Ingesting PDFs from {DOCS_DIR}...")
        if DOCS_DIR.exists():
            ingest_directory(store, DOCS_DIR, extensions=[".pdf"])
            print(f"Ingestion complete. {store.count()} chunks in store.")
        else:
            print(f"WARNING: {DOCS_DIR} does not exist. No documents ingested.")
    else:
        print(f"Vector store already has {store.count()} chunks. Skipping ingestion.")

    # No warm-up needed — Groq is a remote API, first request latency is already fast.

    # Yield control to allow FastAPI to serve requests
    yield  

    # Shutdown (nothing added currently)


# FastAPI Application Initialization
app = FastAPI(title="International Student Support API", lifespan=lifespan)

# CORS (Cross-Origin Resource Sharing) Configuration allows frontend applications (e.g., React/Vite)
# to communicate with this backend. allow_origins=["*"] allows all origins (development mode).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mounts all routes defined in chat/api.py
app.include_router(chat_router, prefix="/api")


# Basic health endpoint used to verify the server is running, deployment succeeded,
# and Reverse proxy connectivity
@app.get("/")
def health_check():
    return {"status": "API running"}


# Launch development server using Uvicorn.
if __name__ == "__main__":
    uvicorn.run("backendmain:app", host="0.0.0.0", port=8000, reload=True)