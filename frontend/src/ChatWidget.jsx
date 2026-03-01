import { useState, useRef } from "react";

function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    setMessages(prev => [...prev, { role: "user", text: input }]);
    setMessages(prev => [...prev, { role: "assistant", text: "" }]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput, use_history: true }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const lines = decoder.decode(value).split("\n\n").filter(Boolean);
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.replace("data: ", "").trim();
          if (raw === "[DONE]") break;
          const { token } = JSON.parse(raw);
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              text: updated[updated.length - 1].text + token,
            };
            return updated;
          });
          bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      }
    } catch (err) {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", text: "Error connecting to server." };
        return updated;
      });
    }

    setLoading(false);
  };

  return (
    <div style={styles.chatContainer}>
      <h3>Ask ISS AI Assistant</h3>

      <div style={styles.messageBox}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              backgroundColor: m.role === "user" ? "#d1e7dd" : "#f8f9fa",
            }}
          >
            {/* Show "Thinking..." while the assistant bubble is still empty */}
            {m.role === "assistant" && m.text === "" && loading
              ? <span style={styles.thinking}>Thinking...</span>
              : m.text
            }
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={styles.inputRow}>
        <input
          style={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask a question..."
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          disabled={loading}
        />
        <button style={styles.button} onClick={sendMessage} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  chatContainer: {
    marginTop: "2rem",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "1rem",
    maxWidth: "600px",
  },
  messageBox: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    minHeight: "200px",
    maxHeight: "400px",
    overflowY: "auto",
    marginBottom: "1rem",
  },
  message: {
    padding: "0.6rem 1rem",
    borderRadius: "12px",
    maxWidth: "80%",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    lineHeight: "1.5",
  },
  thinking: {
    fontStyle: "italic",
    color: "#888",
    fontSize: "0.9rem",
  },
  inputRow: {
    display: "flex",
    gap: "0.5rem",
  },
  input: {
    flex: 1,
    padding: "0.5rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#003366",
    color: "white",
    cursor: "pointer",
  },
};

export default ChatWidget;