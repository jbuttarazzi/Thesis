// Imports React's useState hook to manage component state (show/hide videos)
import { useState } from "react";
// Imports your custom chat component
import ChatWidget from "./ChatWidget";
// Imports your video integration component from its subfolder
import VideoIntegration from "./video-integration/VideoIntegration";

function App() {
  // showVideos: tracks whether the video section is visible (false = hidden by default)
  // setShowVideos: the function used to update that value
  const [showVideos, setShowVideos] = useState(false);

  return (
    <div>
      {/* ── Header ────────────────────────────────── */}
      <header style={styles.header}>
        <h1>
          Hamilton International Student Services Learning Module
        </h1>
      </header>

      <main style={styles.main}>

        {/* ── Video Section ─────────────────────────── */}
        <section style={styles.section}>
          {/* Toggle button: flips showVideos between true and false on each click */}
          <button
            style={styles.dropdownButton}
            onClick={() => setShowVideos(!showVideos)}
          >
            {/* Changes button label depending on whether videos are shown or hidden */}
            {showVideos ? "Hide Preparation Videos ▲" : "Show Preparation Videos ▼"}
          </button>

          {/* Only renders the video container when showVideos is true */}
          {showVideos && (
            <div style={styles.videoContainer}>
              {/* Passes a callback so VideoIntegration can hide itself (sets showVideos to false) */}
              <VideoIntegration onBack={() => setShowVideos(false)} />
            </div>
          )}
        </section>

        {/* ── Chat Section ──────────────────────────── */}
        <section style={styles.section}>
          {/* Renders your ISS chatbot widget */}
          <ChatWidget />
        </section>

      </main>
    </div>
  );
}

// Inline styles object — keeps all styling co-located with this component
const styles = {
  header: {
    backgroundColor: "#003366", // Hamilton navy blue
    color: "white",
    padding: "1.5rem",
    textAlign: "center"
  },
  main: {
    padding: "2rem",
    display: "flex",
    flexDirection: "column", // Stacks sections vertically
    alignItems: "center"     // Centers sections horizontally
  },
  section: {
    width: "100%",
    maxWidth: "800px",   // Prevents sections from getting too wide
    marginBottom: "2rem" // Adds space between the video and chat sections
  },
  dropdownButton: {
    padding: "0.8rem 1rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#0066cc", // Blue toggle button
    color: "white",
    cursor: "pointer"            // Shows hand cursor on hover
  },
  videoContainer: {
    marginTop: "1rem",
    padding: "1rem",
    border: "1px solid #ddd",    // Light gray border around video area
    borderRadius: "8px",
    backgroundColor: "#f9f9f9"   // Subtle off-white background
  }
};

// Makes App available to be imported by main.jsx (the entry point)
export default App;