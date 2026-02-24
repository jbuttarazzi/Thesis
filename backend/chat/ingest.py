"""
ingest.py — Populate the ISS knowledge base with documents.

Supports:
  - Plain text files (.txt)
  - Markdown files (.md)
  - PDFs (requires: pip install pypdf)

Usage:
  python ingest.py                        # loads sample data
  python ingest.py --dir ./docs           # ingest a folder of files
  python ingest.py --file visa_info.txt   # ingest a single file
"""

import argparse
from pathlib import Path
from chat.chatbot import VectorStore

# ─────────────────────────────────────────────
# Text Chunker
# ─────────────────────────────────────────────
def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> list[str]:
    """
    Split text into overlapping chunks by word count.
    Overlap helps preserve context at chunk boundaries.
    """
    words = text.split()
    chunks = []
    i = 0
    while i < len(words):
        chunk = " ".join(words[i : i + chunk_size])
        chunks.append(chunk)
        i += chunk_size - overlap
    return [c.strip() for c in chunks if c.strip()]


def load_txt(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def load_md(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def load_pdf(path: Path) -> str:
    try:
        from pypdf import PdfReader
        reader = PdfReader(str(path))
        return "\n".join(page.extract_text() or "" for page in reader.pages)
    except ImportError:
        print("pypdf not installed. Run: pip install pypdf")
        return ""


LOADERS = {".txt": load_txt, ".md": load_md, ".pdf": load_pdf}


def ingest_file(store: VectorStore, path: Path, category: str = "general"):
    suffix = path.suffix.lower()
    if suffix not in LOADERS:
        print(f"Skipping unsupported file: {path.name}")
        return

    print(f"Ingesting: {path.name}")
    raw_text = LOADERS[suffix](path)
    if not raw_text.strip():
        print(f"  Warning: empty content in {path.name}")
        return

    chunks = chunk_text(raw_text)
    docs = [
        {"text": chunk, "source": path.name, "category": category}
        for chunk in chunks
    ]
    store.add_documents(docs)
    print(f"  → {len(docs)} chunks added from {path.name}")


def ingest_directory(store: VectorStore, directory: Path):
    files = list(directory.rglob("*"))
    supported = [f for f in files if f.suffix.lower() in LOADERS and f.is_file()]
    print(f"Found {len(supported)} supported files in {directory}")
    for f in supported:
        ingest_file(store, f)


# ─────────────────────────────────────────────
# Sample seed data (run this to test your setup)
# ─────────────────────────────────────────────
SAMPLE_DOCS = [
    {
        "text": (
            "F-1 students at Hamilton College must maintain full-time enrollment each semester. "
            "Full-time is defined as at least 12 credit hours for undergraduate students. "
            "Dropping below full-time requires prior approval from the International Student Services (ISS) office "
            "and a Reduced Course Load (RCL) authorization in SEVIS."
        ),
        "source": "f1_requirements.txt",
        "category": "visa",
    },
    {
        "text": (
            "Optional Practical Training (OPT) allows F-1 students to work in a job directly related to their major. "
            "Students must apply for OPT through the ISS office at least 90 days before their intended start date. "
            "USCIS recommends applying no earlier than 90 days before program end date. "
            "The EAD card must be received before starting work."
        ),
        "source": "opt_info.txt",
        "category": "employment",
    },
    {
        "text": (
            "Curricular Practical Training (CPT) is work authorization for internships or co-ops that are an integral "
            "part of your curriculum. CPT must be authorized before you begin working. "
            "You must have a job offer letter and your academic department must confirm the work is curriculum-related. "
            "Contact ISS to begin the CPT application process."
        ),
        "source": "cpt_info.txt",
        "category": "employment",
    },
    {
        "text": (
            "All F-1 students at Hamilton College are required to enroll in the college's health insurance plan "
            "unless they can demonstrate comparable coverage from another source. "
            "Waiver requests must be submitted online each academic year before the waiver deadline. "
            "Students who do not submit a waiver will be automatically enrolled and billed."
        ),
        "source": "health_insurance.txt",
        "category": "health",
    },
    {
        "text": (
            "F-1 students who wish to travel outside the United States must obtain a valid travel signature "
            "from the ISS office before departing. Travel signatures on Form I-20 are valid for 12 months "
            "(6 months for OPT students). Traveling with an expired travel signature may result in delays "
            "or denial of re-entry at the port of entry."
        ),
        "source": "travel_info.txt",
        "category": "travel",
    },
    {
        "text": (
            "International students at Hamilton College must report any change of address to the ISS office "
            "within 10 days of moving. This is a federal requirement under SEVIS regulations. "
            "You can update your address by visiting the ISS office in person or by emailing iss@hamilton.edu."
        ),
        "source": "reporting_requirements.txt",
        "category": "compliance",
    },
    {
        "text": (
            "New international students arriving at Hamilton College should check in with the ISS office "
            "during International Student Orientation. You will need to bring your passport, visa, I-20 or DS-2019, "
            "and I-94 record. Your I-94 can be retrieved at https://i94.cbp.dhs.gov. "
            "ISS will verify your documents and activate your SEVIS record."
        ),
        "source": "arrival_checklist.txt",
        "category": "arrival",
    },
    {
        "text": (
            "The International Student Services office at Hamilton College is located in Bristol Center. "
            "Office hours are Monday through Friday, 9:00 AM to 5:00 PM. "
            "You can reach ISS by email at iss@hamilton.edu or by phone at (315) 859-4943. "
            "Walk-in appointments are welcome, but scheduling in advance is recommended for complex questions."
        ),
        "source": "iss_contact.txt",
        "category": "contact",
    },
]


def load_sample_data(store: VectorStore):
    print("Loading sample seed data...")
    store.add_documents(SAMPLE_DOCS)
    print(f"Sample data loaded. Total documents in store: {store.count()}")


# ─────────────────────────────────────────────
# CLI
# ─────────────────────────────────────────────
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Ingest documents into the ISS knowledge base.")
    parser.add_argument("--dir", type=str, help="Directory of documents to ingest")
    parser.add_argument("--file", type=str, help="Single file to ingest")
    parser.add_argument("--sample", action="store_true", default=True, help="Load sample seed data (default)")
    args = parser.parse_args()

    store = VectorStore()

    if args.dir:
        ingest_directory(store, Path(args.dir))
    elif args.file:
        ingest_file(store, Path(args.file))
    else:
        load_sample_data(store)

    print(f"\nKnowledge base now contains {store.count()} total chunks.")