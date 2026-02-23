import { useState } from "react";

function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          use_history: true
        }),
      });

      const data = await response.json();

      setMessages(prev => [
        ...prev,
        { role: "assistant", text: data.response }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", text: "Error connecting to server." }
      ]);
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
              backgroundColor: m.role === "user" ? "#d1e7dd" : "#f8f9fa"
            }}
          >
            {m.text}
          </div>
        ))}
        {loading && <div style={styles.loading}>Thinking...</div>}
      </div>

      <div style={styles.inputRow}>
        <input
          style={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask a question..."
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button style={styles.button} onClick={sendMessage}>
          Send
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
    marginBottom: "1rem"
  },
  message: {
    padding: "0.6rem 1rem",
    borderRadius: "12px",
    maxWidth: "80%"
  },
  inputRow: {
    display: "flex",
    gap: "0.5rem"
  },
  input: {
    flex: 1,
    padding: "0.5rem",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#003366",
    color: "white",
    cursor: "pointer"
  },
  loading: {
    fontStyle: "italic",
    fontSize: "0.9rem"
  }
};

export default ChatWidget;