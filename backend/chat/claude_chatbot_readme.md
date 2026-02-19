# Hamilton ISS Chatbot

A locally-deployed AI chatbot for the International Student Services department at Hamilton College.
Built with **Ollama + Qwen2.5** (LLM) and **LanceDB** (vector store) for a fully local RAG pipeline.

---

## Stack

| Component      | Tool                        | Why                                                                 |
|----------------|-----------------------------|---------------------------------------------------------------------|
| LLM            | Qwen2.5:7b via Ollama       | Strong multilingual support, great instruction following, runs locally |
| Embeddings     | all-MiniLM-L6-v2            | Fast, lightweight, good multilingual performance                    |
| Vector Store   | LanceDB                     | Embedded (no server needed), fast ANN search, disk-persistent       |
| API Layer      | FastAPI                     | Modern async Python API, built-in docs at `/docs`                   |

---

## Prerequisites

- Python 3.11+
- [Ollama](https://ollama.com) installed and running

---

## Setup

### 1. Install Ollama and pull the model

```bash
# Install Ollama from https://ollama.com
ollama pull qwen2.5:7b
ollama serve   # start the Ollama server (if not already running)
```

### 2. Install Python dependencies

```bash
pip install -r requirements.txt
```

### 3. Populate the knowledge base

```bash
# Load built-in sample data (ISS FAQ, visa info, etc.)
python ingest.py

# Or ingest your own documents
python ingest.py --dir ./your_docs_folder
python ingest.py --file path/to/document.pdf
```

### 4. Run the chatbot

**Terminal (CLI) mode:**
```bash
python cli.py
```

**API server mode:**
```bash
uvicorn api:app --reload --port 8000
# API docs available at http://localhost:8000/docs
```

---

## API Usage

### Chat
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "How do I apply for OPT?"}'
```

### Streaming Chat
```bash
curl -N -X POST http://localhost:8000/chat/stream \
  -H "Content-Type: application/json" \
  -d '{"message": "What documents do I need for arrival?"}'
```

### Ingest a new document via API
```bash
curl -X POST http://localhost:8000/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Your policy or FAQ text here...",
    "source": "new_policy.txt",
    "category": "visa"
  }'
```

---

## Project Structure

```
hamilton-iss-chatbot/
├── chatbot.py          # Core RAG chatbot (LLM + vector retrieval)
├── ingest.py           # Document ingestion & chunking
├── api.py              # FastAPI REST server
├── cli.py              # Interactive terminal chat
├── requirements.txt
├── lancedb_store/      # Auto-created: persistent vector database
└── docs/               # (Optional) Put your ISS documents here
```

---

## Adding Your Own Content

Place your ISS documents in a `docs/` folder:

```
docs/
├── visa_policies.pdf
├── opt_cpt_guide.md
├── health_insurance_faq.txt
└── orientation_checklist.pdf
```

Then run:
```bash
python ingest.py --dir ./docs
```

---

## Upgrading the Model

To use a larger, more capable model (requires more RAM/VRAM):

```bash
ollama pull qwen2.5:14b    # 14B — better reasoning, needs ~10GB RAM
ollama pull qwen2.5:32b    # 32B — high quality, needs ~20GB RAM
```

Update `OLLAMA_MODEL` in `chatbot.py` accordingly.

---

## Production Considerations

- **Per-session history**: The current API shares one chatbot instance. For production, use a session ID + Redis to store per-user history.
- **Authentication**: Add API key middleware or integrate with Hamilton's SSO.
- **Document updates**: Re-run `ingest.py` when ISS policies change.
- **Monitoring**: Add logging to track unanswered questions and improve your knowledge base.