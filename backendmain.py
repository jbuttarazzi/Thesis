from fastapi import FastAPI
from chat.router import router as chat_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="International Student Support API")

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/api/chat")

@app.get("/")
def health_check():
    return {"status": "API running"}