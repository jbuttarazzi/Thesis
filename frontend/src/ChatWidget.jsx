/**
 * filename: ChatWidget.jsx
 *
 * description: Interactive chat interface component. Handles user input, streams token-by-token responses
 * from the FastAPI backend, and displays the conversation history with auto-scroll.Connects to the /api/chat/stream 
 * endpoint.
 */

// useState: manages all reactive data (messages, input text, loading state)
// useRef: lets us grab HTML element directly (for auto-scrolling)
import { useState, useRef } from "react";

// Height of your fixed navbar — drawer sits flush below it + a small gap
const HEADER_HEIGHT = 60;

// Height of your footer — drawer stops above it + a small gap
const FOOTER_HEIGHT = 185;

// Breathing room above and below the drawer so it floats cleanly
const VERT_GAP = 10;

// Gap between the drawer and the right edge of the screen
const SIDE_GAP = 12;

// Must match CHAT_PUSH_WIDTH in App.jsx (drawer width + SIDE_GAP)
const DRAWER_WIDTH = 492;

// isOpen and setIsOpen are lifted up to App.jsx so the page layout can react to them
function ChatWidget({ isOpen, setIsOpen }) {
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
    // Slide-in drawer — translateX(0) when open, translateX(110%) when closed
    // No overlay: the page content compresses via margin-right in App.jsx instead
    <div style={{ ...styles.drawer, transform: isOpen ? "translateX(0)" : "translateX(110%)" }}>

      {/* Drawer header bar */}
      <div style={styles.drawerHeader}>
        <div style={styles.headerLeft}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 3C7.03 3 3 6.58 3 11c0 2.13.9 4.06 2.36 5.48L4 21l4.7-1.55A9.27 9.27 0 0 0 12 19c4.97 0 9-3.58 9-8s-4.03-8-9-8z"
              fill="white"
            />
          </svg>
          <span style={styles.drawerTitle}>ISS AI Assistant</span>
        </div>
        {/* Close button — triggers the same state in App.jsx, collapsing both the drawer and the margin */}
        <button style={styles.closeButton} onClick={() => setIsOpen(false)} aria-label="Close chat">
          ✕
        </button>
      </div>

      {/* Scrollable message history — flex:1 + minHeight:0 fills space without overflowing */}
      <div style={styles.messageBox}>
        {messages.length === 0 && (
          <p style={styles.emptyState}>
            Hi! Ask me anything about Hamilton ISS — visas, OPT, CPT, I-20s, and more.
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i} // Unique key for each message
            style={{
              ...styles.message,
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              backgroundColor: m.role === "user" ? "#d1e7dd" : "#f1f3f5",
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
  /* Floating drawer — inset from the right edge, bounded between navbar and footer */
  drawer: {
    position: "fixed",
    top: `${HEADER_HEIGHT + VERT_GAP}px`,          // Below navbar + breathing room
    bottom: `${FOOTER_HEIGHT + VERT_GAP}px`,       // Above footer + breathing room
    right: `${SIDE_GAP}px`,                        // Small gap from the screen edge
    width: `${DRAWER_WIDTH}px`,
    backgroundColor: "#fff",
    borderRadius: "14px",                           // Rounded on all sides — floats like a card
    boxShadow: "0 8px 40px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.07)",
    display: "flex",
    flexDirection: "column",                        // Header → messages → input stacked vertically
    zIndex: 1050,
    overflow: "hidden",                             // Clip children to rounded corners
    transition: "transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)", // Matches App.jsx margin transition
  },
  /* Dark header at the top of the drawer */
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 1.4rem",
    backgroundColor: "#003366",
    flexShrink: 0,            // Prevents the header from shrinking when content overflows
    borderRadius: "14px 14px 0 0",                 // Matches drawer's top rounded corners
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  drawerTitle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: "1.1rem",
  },
  /* X button in the drawer header */
  closeButton: {
    background: "none",
    border: "none",
    color: "rgba(255,255,255,0.75)",
    fontSize: "1.1rem",
    cursor: "pointer",
    lineHeight: 1,
    padding: 0,
  },
  /* Message list — flex:1 fills exactly the space between header and input bar */
  messageBox: {
    display: "flex",
    flexDirection: "column", 
    gap: "0.65rem",           
    flex: 1,
    overflowY: "auto",        
    padding: "1.4rem 1.4rem 1rem",
    minHeight: 0,             // Required for flex children to scroll correctly in column layouts
  },
  /* Placeholder shown before the first message */
  emptyState: {
    color: "#999",
    fontSize: "1rem",
    textAlign: "center",
    marginTop: "2rem",
    lineHeight: "1.7",
    padding: "0 0.5rem",
  },
  message: {
    padding: "0.75rem 1.1rem",
    borderRadius: "12px",     
    maxWidth: "82%",          
    whiteSpace: "pre-wrap",   
    wordBreak: "break-word",  
    lineHeight: "1.6",
    fontSize: "1rem",
  },
  thinking: {
    fontStyle: "italic",
    color: "#aaa",           
    fontSize: "0.95rem",
  },
  /* Input bar anchored to the bottom with a subtle background lift */
  inputRow: {
    display: "flex",
    gap: "0.6rem",
    padding: "1rem 1.4rem",
    borderTop: "1px solid #ececec",
    flexShrink: 0,            // Keeps the input bar anchored at the bottom
    backgroundColor: "#fafafa",
    borderRadius: "0 0 14px 14px",                 // Matches drawer's bottom rounded corners
  },
  input: {
    flex: 1,
    padding: "0.8rem 1rem",   // Taller input field for comfortable typing
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    backgroundColor: "#fff",
    outline: "none",
  },
  button: {
    padding: "0.8rem 1.25rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#003366",
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
  },
};

export default ChatWidget;