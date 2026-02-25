"""
ingest.py — Populate the ISS knowledge base with documents.

Supports:
  - Plain text files (.txt)
  - Markdown files (.md)
  - PDFs (.pdf)

Usage:
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


def ingest_directory(store: VectorStore, directory: Path, extensions: list[str] = None):
    extensions = extensions or [".txt", ".md", ".pdf"]
    files = list(directory.rglob("*"))
    supported = [f for f in files if f.suffix.lower() in extensions and f.is_file()]
    print(f"Found {len(supported)} supported files in {directory}")
    for f in supported:
        ingest_file(store, f)


# ─────────────────────────────────────────────
# CLI
# ─────────────────────────────────────────────
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Ingest documents into the ISS knowledge base.")
    parser.add_argument("--dir", type=str, help="Directory of documents to ingest")
    parser.add_argument("--file", type=str, help="Single file to ingest")
    parser.add_argument(
        "--ext",
        nargs="+",
        default=[".pdf"],
        help="File extensions to ingest (default: .pdf)"
    )
    args = parser.parse_args()

    store = VectorStore()

    if args.dir:
        ingest_directory(store, Path(args.dir), extensions=args.ext)
    elif args.file:
        ingest_file(store, Path(args.file))
    else:
        print("No Data has been Ingested")

    print(f"\nKnowledge base now contains {store.count()} total chunks.")