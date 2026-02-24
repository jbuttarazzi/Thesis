"""
api.py — FastAPI server for the ISS Chatbot

Run with:
  uvicorn api:app --reload --port 8000

Endpoints:
  POST /chat          — single-turn or multi-turn chat
  POST /chat/stream   — streaming response
  POST /ingest        — add documents via API
  GET  /health        — health check
  DELETE /history     — clear conversation history
"""

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import json

from chat.chatbot import ISSChatbot
from chat.ingest import load_sample_data

router = APIRouter()

# One chatbot instance per server process
# For production, use per-session instances with a session store (e.g. Redis)
chatbot = ISSChatbot()


# ─────────────────────────────────────────────
# Schemas
# ─────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str
    use_history: bool = True  # set False for stateless single-turn


class ChatResponse(BaseModel):
    response: str
    model: str = "qwen2.5:7b"


class IngestRequest(BaseModel):
    text: str
    source: str = "api_upload"
    category: str = "general"


class IngestResponse(BaseModel):
    success: bool
    chunks_added: int
    total_documents: int


# ─────────────────────────────────────────────
# Routes
# ─────────────────────────────────────────────
@router.get("/health")
def health_check():
    return {
        "status": "ok",
        "documents_in_store": chatbot.store.count(),
        "model": "qwen2.5:7b",
    }


@router.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")
    try:
        response = chatbot.chat(req.message, use_history=req.use_history)
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/chat/stream")
def chat_stream(req: ChatRequest):
    """Stream tokens as server-sent events (SSE)."""
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    def generate():
        for token in chatbot.stream_chat(req.message):
            yield f"data: {json.dumps({'token': token})}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")


@router.post("/ingest", response_model=IngestResponse)
def ingest_document(req: IngestRequest):
    """Add a single document (text chunk) to the knowledge base."""
    from ingest import chunk_text
    chunks = chunk_text(req.text)
    docs = [
        {"text": c, "source": req.source, "category": req.category}
        for c in chunks
    ]
    chatbot.store.add_documents(docs)
    return IngestResponse(
        success=True,
        chunks_added=len(docs),
        total_documents=chatbot.store.count(),
    )


@router.post("/ingest/sample")
def ingest_sample():
    """Load the built-in sample ISS data (useful for testing)."""
    load_sample_data(chatbot.store)
    return {"success": True, "total_documents": chatbot.store.count()}


@router.delete("/history")
def clear_history():
    chatbot.clear_history()
    return {"success": True, "message": "Conversation history cleared."}