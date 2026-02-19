"""
cli.py — Interactive terminal chat for testing the ISS chatbot.

Usage:
  python cli.py

Commands during chat:
  /clear    — clear conversation history
  /quit     — exit
  /count    — show number of docs in knowledge base
"""

from chatbot import ISSChatbot

def main():
    print("=" * 60)
    print("  Hamilton College — International Student Services Bot")
    print("  Type /quit to exit | /clear to reset history")
    print("=" * 60)

    bot = ISSChatbot()

    if bot.store.count() == 0:
        print("\nKnowledge base is empty. Loading sample data...")
        from ingest import load_sample_data
        load_sample_data(bot.store)

    print(f"\nReady! ({bot.store.count()} knowledge chunks loaded)\n")

    while True:
        try:
            user_input = input("You: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nGoodbye!")
            break

        if not user_input:
            continue

        if user_input.lower() == "/quit":
            print("Goodbye!")
            break
        elif user_input.lower() == "/clear":
            bot.clear_history()
            print("History cleared.\n")
            continue
        elif user_input.lower() == "/count":
            print(f"Documents in knowledge base: {bot.store.count()}\n")
            continue

        print("\nAssistant: ", end="", flush=True)
        for token in bot.stream_chat(user_input):
            print(token, end="", flush=True)
        print("\n")


if __name__ == "__main__":
    main()