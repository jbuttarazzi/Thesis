# Hamilton ISS Learning Module
### AI-Driven Pre-Arrival Orientation — Hamilton College CS Thesis

An interactive web application built for Hamilton College's **International Student Services (ISS)** office, designed to guide incoming international students through their pre-arrival journey. The platform combines structured video-based learning episodes, embedded knowledge checks, a curated resource hub, and an AI assistant.

**Developers:** Dominic Mauretti, Joe Buttarazzi, Oluwayanmife Adeniran  
**Client:** Dr. Omobonike Odegbami => Director of International Student Services, Hamilton College

---

## What It Does

Students work through **six sequential episodes** covering the full international student journey — from initial arrival logistics to visa requirements, orientation, and reporting obligations. Each episode pairs an AI-generated narrative video (with English subtitles) with embedded quizzes that provide educational feedback on incorrect answers. An ISS AI Assistant is accessible as a floating popup throughout the entire experience, so students can ask questions without losing their place.

### Episodes
| # | Title |
|---|---|
| 1 | Interactive Arrival Experience |
| 2 | Continued Journey |
| 3 | Visa Application |
| 4 | Entry Requirements |
| 5 | International Student Orientation |
| 6 | Contact and Reporting Requirements |

---

## Features

**Learning Module**
- Six linked narrative video episodes with English subtitles
- Embedded quizzes with correct-answer explanations for wrong responses
- Sequential "Continue" flow guiding students episode to episode

**ISS AI Assistant**
- Floating chat popup accessible from any page or episode
- Scoped exclusively to ISS topics (F-1, OPT/CPT, I-20, immigration questions)
- Input and output filtering guards to block off-topic or unsafe responses
- Streaming responses via SSE with multi-turn conversation history

**Resource Hub & UI**
- Collapsible sidebar with curated links across three categories: Visa & Immigration (USCIS, Study in the States, Travel.State.Gov), Hamilton College (ISS Office, Dean of Students, Student Health Services), and Tax & Finance (Sprintax, IRS Nonresident Aliens)
- Welcome/landing page explaining the module before students begin
- Hamilton-branded header, footer, and color scheme consistent with official college sites
- Responsive layout that adjusts gracefully when the chat panel is open

---

## Tech Stack

| Layer | Technology |
|---|---|
| LLM | Ollama (`qwen2.5:7b`) |
| Vector Store | LanceDB |
| Backend | FastAPI (Python) |
| Frontend | React + Vite |
| Video | AI-generated narrative videos with `.vtt` subtitle files |

---

## Getting Started

### 1. Add Documents (Optional)

The `./docs` directory already contains the core ISS source documents. To expand the knowledge base, drop additional files (PDFs, `.txt`, `.md`) into `./docs` — they will be automatically chunked, embedded, and ingested on backend startup.

### 2. Run the Backend

```bash
pip install -r requirements.txt
python backendmain.py
```

Backend starts on `http://localhost:8000` by default.

### 3. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend available at `http://localhost:5173` by default.

---

## Project Structure

```
└── backend/
    ├── backendmain.py              # FastAPI app entry point
    └── chat/
        ├── docs/                       # ISS source documents (auto-ingested on startup)
        ├── chatbot.py                  # RAG pipeline and LLM interaction
        ├── api.py                      # /chat and /chat/stream endpoints
        ├── classifier.py               # Embedding-based input/output guards

└── frontend/
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── assets/             # Logos, images, branding
        ├── video-integration/  # Video player components and episode logic
        ├── App.jsx             # Main app layout and episode routing
        ├── ChatWidget.jsx      # Floating ISS AI Assistant popup
        ├── WelcomePage.jsx     # Landing page / module overview
        ├── HamiltonFooter.jsx  # Hamilton-branded site footer
        ├── index.css
        ├── main.jsx
     └── subtitles/          # .vtt subtitle files for each episode
        ├── video-integration/  # Video player components and episode logic
```

---

## How the AI Assistant Works

1. **Document Ingestion** — On startup, files in `./docs` are chunked, embedded, and stored in the vector database.
2. **Input Filtering** — Incoming messages are screened by an embedding-based classifier and a profanity filter. Off-topic or inappropriate inputs are rejected before reaching the LLM.
3. **Retrieval** — Relevant document chunks are retrieved from the vector store based on semantic similarity to the query.
4. **Generation** — The local LLM generates a response grounded in the retrieved ISS context and conversation history.
5. **Output Filtering** — The response is screened for hallucinations or off-topic content before being returned.
6. **Streaming** — The response is streamed to the frontend via Server-Sent Events (SSE) for a low-latency chat experience.

---

## Testing

The system was evaluated through two complementary methods. An **office event testing session** gathered direct feedback from ISS staff and students via a structured feedback form rating usability and accuracy. A **FAQs correctness spreadsheet** tracked real questions posed to the assistant, logging each question, the model's response, a correctness rating (Correct / Unsure / Wrong), and reviewer comments — enabling systematic identification of retrieval gaps and edge cases.

---

## Acknowledgements

Built in collaboration with the Hamilton College International Student Services office. Special thanks to the ISS Director Dr. Omobonike Odegbami for providing her expertise, source materials, and feedback throughout development.
