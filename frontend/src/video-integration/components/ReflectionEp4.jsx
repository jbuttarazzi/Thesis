/**
 * filename: ReflectionEp4.jsx
 * 
 * description: Google Form embed for Episode 4 feedback. Shows form then continue button.
 * 
 */

// ── Episode 4 Google Form URL ─────────────────────────────────────────────
const GOOGLE_FORM_EMBED_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf5ZWFl7o_fo6OSkMrvQ8Q5PYPPKJCH1O3jQimDQDSxnryFfw/viewform?embedded=true";
// ──────────────────────────────────────────────────────────────────────────

const ReflectionEp4 = ({ onNextEpisode, episodeNumber = 4 }) => {
  return (
    <div style={styles.wrapper}>
      {/* Section title */}
      <h1 style={styles.title}>Your Turn</h1>

      <p style={styles.subtitle}>
        Share your feedback using the form below. Your responses go directly to
        the International Student Services team.
      </p>

      {/* Google Form iframe */}
      <div style={styles.iframeWrapper}>
        <iframe
          src={GOOGLE_FORM_EMBED_URL}
          title="ISS Feedback Form"
          style={styles.iframe}
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
        >
          Loading form…
        </iframe>
      </div>

      {/* Footer note */}
      <p style={styles.note}>
        Having trouble with the form?{" "}
        <a
          href={GOOGLE_FORM_EMBED_URL.replace("?embedded=true", "")}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          Open it in a new tab ↗
        </a>
      </p>

      {/* Continue to Next Episode button */}
      {onNextEpisode && (
        <div style={styles.buttonContainer}>
          <button
            onClick={onNextEpisode}
            style={styles.continueButton}
            onMouseEnter={(e) => e.target.style.background = '#0056b3'}
            onMouseLeave={(e) => e.target.style.background = '#007bff'}
          >
            Continue to Episode {episodeNumber + 1} →
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    padding: "40px 20px",
    maxWidth: "760px",
    margin: "0 auto",
  },
  title: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#003366",
    marginBottom: "12px",
    textAlign: "center",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#555",
    textAlign: "center",
    marginBottom: "28px",
    lineHeight: "1.6",
  },
  iframeWrapper: {
    borderRadius: "12px",
    overflow: "hidden",
    border: "2px solid #dce3ec",
    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
  },
  iframe: {
    width: "100%",
    height: "700px",   // ← increase if your form is long
    display: "block",
    background: "#fff",
  },
  note: {
    fontSize: "14px",
    color: "#888",
    textAlign: "center",
    marginTop: "16px",
  },
  link: {
    color: "#0055aa",
    textDecoration: "none",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "32px",
    paddingTop: "20px",
    borderTop: "1px solid #eee",
  },
  continueButton: {
    padding: "14px 40px",
    fontSize: "16px",
    fontWeight: "600",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 8px rgba(0, 123, 255, 0.3)",
  },
};

export default ReflectionEp4;
