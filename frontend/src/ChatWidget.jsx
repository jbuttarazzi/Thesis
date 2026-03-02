// useState: manages all reactive data (messages, input text, loading state)
// useRef: lets us grab a DOM element directly (for auto-scrolling)
import { useState, useRef } from "react";

function ChatWidget() {
  const [messages, setMessages] = useState([]);   // Array of all chat messages {role, text}
  const [input, setInput] = useState("");          // Current text in the input box
  const [loading, setLoading] = useState(false);   // True while waiting for a server response
  const bottomRef = useRef(null);                  // Reference to an invisible div at the bottom of the chat, used to scroll down

  const sendMessage = async () => {
    if (!input.trim() || loading) return; // Do nothing if input is empty or already loading

    // Immediately add the user's message to the chat
    setMessages(prev => [...prev, { role: "user", text: input }]);
    // Pre-add an empty assistant bubble (will be filled in as tokens stream in)
    setMessages(prev => [...prev, { role: "assistant", text: "" }]);

    const currentInput = input; // Save input before clearing it
    setInput("");                // Clear the input box right away
    setLoading(true);            // Disable input and show loading state

    try {
      // POST the user's message to your FastAPI streaming endpoint
      const response = await fetch("http://localhost:8000/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Sends the message and tells the backend to use conversation history
        body: JSON.stringify({ message: currentInput, use_history: true }),
      });

      // Set up a streaming reader to receive tokens as they arrive
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

          // Append the new token to the last assistant message (streaming effect)
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
      // If the fetch fails (e.g. backend is down), show an error in the assistant bubble
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
      <h3>Ask ISS AI Assistant</h3>

      {/* Scrollable message history */}
      <div style={styles.messageBox}>
        {messages.map((m, i) => (
          <div
            key={i} // Unique key for each message (required by React for list rendering)
            style={{
              ...styles.message,
              // User messages align right, assistant messages align left
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              // Different background colors for user vs assistant
              backgroundColor: m.role === "user" ? "#d1e7dd" : "#f8f9fa",
            }}
          >
            {/* Show "Thinking..." placeholder while assistant bubble is still empty */}
            {m.role === "assistant" && m.text === "" && loading
              ? <span style={styles.thinking}>Thinking...</span>
              : m.text
            }
          </div>
        ))}
        {/* Invisible div at the bottom — scrolled into view to auto-scroll chat down */}
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
          {loading ? "..." : "Send"} {/* Shows "..." while loading */}
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
    flexDirection: "column",  // Stacks messages vertically
    gap: "0.5rem",            // Space between messages
    minHeight: "200px",       // Always shows a decent sized chat area even when empty
    maxHeight: "400px",       // Caps height and enables scrolling beyond this
    overflowY: "auto",        // Adds vertical scrollbar when messages overflow
    marginBottom: "1rem",
  },
  message: {
    padding: "0.6rem 1rem",
    borderRadius: "12px",     // Rounded bubble shape
    maxWidth: "80%",          // Bubbles don't stretch the full width
    whiteSpace: "pre-wrap",   // Preserves newlines in responses
    wordBreak: "break-word",  // Prevents long words from overflowing the bubble
    lineHeight: "1.5",
  },
  thinking: {
    fontStyle: "italic",
    color: "#888",            // Gray placeholder text
    fontSize: "0.9rem",
  },
  inputRow: {
    display: "flex",
    gap: "0.5rem",            // Space between input and button
  },
  input: {
    flex: 1,                  // Input takes up all remaining space next to the button
    padding: "0.5rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#003366", // Hamilton navy blue
    color: "white",
    cursor: "pointer",
  },
};

// Makes ChatWidget available to be imported by App.jsx
export default ChatWidget;