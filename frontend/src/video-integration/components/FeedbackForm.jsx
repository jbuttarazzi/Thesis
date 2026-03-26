/**
 * FeedbackForm Component
 *
 * Embeds a Google Form for student feedback collection.
 *
 * HOW TO GET YOUR EMBED URL:
 *   1. Open your Google Form in edit mode
 *   2. Click "Send" (top-right)
 *   3. Click the "<>" (Embed) tab
 *   4. Copy the URL inside src="..." from the <iframe> code
 *   5. Paste it below as GOOGLE_FORM_EMBED_URL
 *
 * Props:
 *   - onSubmit: optional callback (kept for compatibility with parent component)
 */

// ── Paste your Google Form embed URL here ──────────────────────────────────
const GOOGLE_FORM_EMBED_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdZSPuBQsVSDv0F4xL9jqy0R-6qeFllkHmmWMFDAun0JzqaEQ/viewform?embedded=true";
// ───────────────────────────────────────────────────────────────────────────

const FeedbackForm = ({ onSubmit }) => {
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
};

export default FeedbackForm;
