from fastapi import APIRouter
from pydantic import BaseModel
from chat.service import generate_response

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

@router.post("/", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):
    reply = generate_response(request.message)
    return ChatResponse(reply=reply)