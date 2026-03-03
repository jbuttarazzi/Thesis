// useState: manages all reactive data (messages, input text, loading state)
// useRef: lets us grab HTML element directly (for auto-scrolling)
import { useState, useRef } from "react";

function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");          // Current text in the input box
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);                  // Reference to an invisible div at the bottom of the chat, used to scroll down

  const sendMessage = async () => {
    if (!input.trim() || loading) return; // Do nothing if input is empty or already loading

    setMessages(prev => [...prev, { role: "user", text: input }]);
    setMessages(prev => [...prev, { role: "assistant", text: "" }]);

    const currentInput = input;
    setInput("");                
    setLoading(true);            

    try {
      // POST the user's message to your FastAPI streaming endpoint
      const response = await fetch("http://localhost:8000/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput, use_history: true }), // Sends the message and tells the backend to use conversation history
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder(); // Converts raw bytes into readable text

      // Keep reading chunks from the stream until it's done
      while (true) {
        const { done, value } = await reader.read();
        if (done) break; // Stream has ended

        // Split the chunk into individual SSE (Server-Sent Event) lines
        const lines = decoder.decode(value).split("\n\n").filter(Boolean);

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue; // Ignore non-data lines
          const raw = line.replace("data: ", "").trim();
          if (raw === "[DONE]") break; // Backend signals the stream is complete

          // Parse the token from the JSON payload
          const { token } = JSON.parse(raw);

          // Steaming Effect of Text
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              text: updated[updated.length - 1].text + token, // Concatenate token onto existing text
            };
            return updated;
          });

          // Scroll to the bottom of the chat as new tokens arrive
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

    setLoading(false); // Re-enable input now that the response is complete
  };

  return (
    <div style={styles.chatContainer}>
      <h3>ISS AI Assistant</h3>

      {/* Scrollable message history */}
      <div style={styles.messageBox}>
        {messages.map((m, i) => (
          <div
            key={i} // Unique key for each message
            style={{
              ...styles.message,
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              backgroundColor: m.role === "user" ? "#d1e7dd" : "#f8f9fa",
            }}
          >
            {m.role === "assistant" && m.text === "" && loading
              ? <span style={styles.thinking}>Thinking...</span>
              : m.text
            }
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input row: text field + send button */}
      <div style={styles.inputRow}>
        <input
          style={styles.input}
          value={input}                                      // Controlled input tied to state
          onChange={e => setInput(e.target.value)}           // Updates state on every keystroke
          placeholder="Ask a question..."
          onKeyDown={e => e.key === "Enter" && sendMessage()} // Allow sending with Enter key
          disabled={loading}                                  // Locks input while waiting for response
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