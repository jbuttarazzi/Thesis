import { useState } from "react";

function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    const response = await fetch("http://localhost:8000/api/chat/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();

    setMessages(prev => [
      ...prev,
      { role: "assistant", text: data.reply }
    ]);
  };

  return (
    <div style={{ marginTop: "2rem", border: "1px solid #ccc", padding: "1rem" }}>
      <h3>Ask Our AI Assistant</h3>

      <div style={{ minHeight: "150px" }}>
        {messages.map((m, i) => (
          <p key={i}><strong>{m.role}:</strong> {m.text}</p>
        ))}
      </div>

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Ask a question..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatWidget;