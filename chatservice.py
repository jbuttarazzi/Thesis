import requests

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "llama3"

SYSTEM_PROMPT = """
You are an AI assistant for international students at Hamilton College.
You help students prepare for life in the United States and on campus.
Be clear, friendly, and culturally sensitive.
"""

def generate_response(user_message: str) -> str:
    payload = {
        "model": MODEL_NAME,
        "prompt": f"{SYSTEM_PROMPT}\n\nUser: {user_message}\nAssistant:",
        "stream": False
    }

    response = requests.post(OLLAMA_URL, json=payload)
    response.raise_for_status()

    return response.json()["response"]