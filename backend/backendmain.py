from fastapi import FastAPI
from chat.api import router as chat_router
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(title="International Student Support API")

# Allow frontend to call backend
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