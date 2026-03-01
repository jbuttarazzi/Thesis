from contextlib import asynccontextmanager
from fastapi import FastAPI
from chat.api import router as chat_router
from chat.chatbot import VectorStore
from chat.ingest import ingest_directory
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import threading
import ollama
import uvicorn

DOCS_DIR = Path("./chat/docs")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # ── Vector store / document ingestion ──
    store = VectorStore()
    if store.count() == 0:
        print(f"Vector store is empty. Ingesting PDFs from {DOCS_DIR}...")
        if DOCS_DIR.exists():
            ingest_directory(store, DOCS_DIR, extensions=[".pdf"])
            print(f"Ingestion complete. {store.count()} chunks in store.")
        else:
            print(f"WARNING: {DOCS_DIR} does not exist. No documents ingested.")
    else:
        print(f"Vector store already has {store.count()} chunks. Skipping ingestion.")

    # ── Warm up Ollama so the model stays in memory ──
    def warm_up():
        try:
            print("Warming up Ollama (qwen2.5:7b)...")
            ollama.chat(
                model="qwen2.5:7b",
                messages=[{"role": "user", "content": "hi"}],
                keep_alive=-1   # keep model in memory indefinitely
            )
            print("Ollama warm-up complete — first token will now be fast.")
        except Exception as e:
            print(f"Ollama warm-up failed: {e}")

    threading.Thread(target=warm_up, daemon=True).start()

    yield  # App runs here

    # Shutdown (nothing needed)


app = FastAPI(title="International Student Support API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/api")


@app.get("/")
def health_check():
    return {"status": "API running"}


if __name__ == "__main__":
    uvicorn.run("backendmain:app", host="0.0.0.0", port=8000, reload=True)