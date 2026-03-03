import { useState } from "react"; // Show/hide videos
import ChatWidget from "./ChatWidget";
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
          <button
            style={styles.dropdownButton}
            onClick={() => setShowVideos(!showVideos)}
          >
            {showVideos ? "Hide Preparation Videos ▲" : "Show Preparation Videos ▼"}
          </button>

          {showVideos && (
            <div style={styles.videoContainer}>
              {/* Passes a callback so VideoIntegration can hide itself (sets showVideos to false) */}
              <VideoIntegration onBack={() => setShowVideos(false)} />
            </div>
          )}
        </section>

        {/* ── Chat Section ──────────────────────────── */}
        <section style={styles.section}>
          <ChatWidget />
        </section>

      </main>
    </div>
  );
}

// Inline styles object — keeps all styling co-located with this component
const styles = {
  header: {
    backgroundColor: "#003366",
    color: "white",
    padding: "1.5rem",
    textAlign: "center"
  },
  main: {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  section: {
    width: "100%",
    maxWidth: "800px",
    marginBottom: "2rem"
  },
  dropdownButton: {
    padding: "0.8rem 1rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#0066cc",
    color: "white",
    cursor: "pointer"
  },
  videoContainer: {
    marginTop: "1rem",
    padding: "1rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9"
  }
};

export default App;