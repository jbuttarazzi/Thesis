import { useState } from "react";
import ChatWidget from "./ChatWidget";
import VideoIntegration from "./video-integration/VideoIntegration";

function App() {
  const [showVideos, setShowVideos] = useState(false);

  return (
    <div>
      {/* Header */}
      <header style={styles.header}>
        <h1>
          Learning Module for Incoming Hamilton International Student Service
        </h1>
      </header>

      <main style={styles.main}>
        {/* Video Section */}
        <section style={styles.section}>
          <button
            style={styles.dropdownButton}
            onClick={() => setShowVideos(!showVideos)}
          >
            {showVideos ? "Hide Preparation Videos ▲" : "Show Preparation Videos ▼"}
          </button>

          {showVideos && (
            <div style={styles.videoContainer}>
              <VideoIntegration onBack={() => setShowVideos(false)} />
            </div>
          )}
        </section>

        {/* Chat Section */}
        <section style={styles.section}>
          <ChatWidget />
        </section>
      </main>
    </div>
  );
}

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
