/**
 * filename: WelcomePage.jsx
 * description: Full-screen landing page shown before the main app that provides basic information about the learning module. 
 * Clicking "Get Started" hides this and reveals the main content.
 */

const HAMILTON_BLUE = "#002f86";
const HAMILTON_GOLD = "#d6ba8b";

export default function WelcomePage({ onEnter }) {
  return (
    <div style={s.page}>

      {/* ── Decorative top bar matching the header ───────────────── */}
      <div style={s.topBar} />

      <main style={s.main}>

        {/* ── Logo / crest placeholder ─────────────────────────── */}
        <div style={s.crest}>
          <svg viewBox="0 0 80 80" width="80" height="80" aria-hidden="true">
            <circle cx="40" cy="40" r="38" fill={HAMILTON_BLUE} stroke={HAMILTON_GOLD} strokeWidth="3"/>
            <text
              x="40" y="36"
              textAnchor="middle"
              dominantBaseline="central"
              fill={HAMILTON_GOLD}
              fontSize="11"
              fontWeight="700"
              fontFamily="Georgia, serif"
              letterSpacing="0.5"
            >
              HAMILTON
            </text>
            <text
              x="40" y="52"
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              fontSize="9"
              fontFamily="Georgia, serif"
              letterSpacing="0.5"
            >
              COLLEGE
            </text>
          </svg>
        </div>

        {/* ── Heading ──────────────────────────────────────────── */}
        <h1 style={s.heading}>
          International Student Services
        </h1>
        <p style={s.subheading}>Learning Module</p>

        {/* ── Divider ──────────────────────────────────────────── */}
        <div style={s.divider} />

        {/* ── Welcome copy ─────────────────────────────────────── */}
        <p style={s.body}>
          Welcome to Hamilton College's International Student Services learning
          module. This resource is designed to help you navigate life as an
          international student from visa and other necessary documentation requirements 
          to important first steps when arriving on campus.
        </p>
        <p style={s.body}>
          Use the preparation videos, our AI assistant, and the curated resource
          links to get the answers you need. For complex immigration questions or if you are
          not satisfied with the responses you get on this site, always follow up directly with 
          our international student services office.
        </p>

        {/* ── CTA button ───────────────────────────────────────── */}
        <button
          style={s.btn}
          onClick={onEnter}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = "#002244";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,51,102,0.35)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = HAMILTON_BLUE;
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 3px 10px rgba(0,51,102,0.25)";
          }}
        >
          Get Started →
        </button>

        {/* ── Small print ──────────────────────────────────────── */}
        <p style={s.note}>
          Need immediate help?{" "}
          <a
            href="https://www.hamilton.edu/offices/international-student-services"
            target="_blank"
            rel="noopener noreferrer"
            style={s.link}
          >
            Contact the ISS office directly ↗
          </a>
        </p>

      </main>

      {/* ── Decorative bottom bar ─────────────────────────────────── */}
      <div style={s.bottomBar}>
        <span style={s.bottomText}>
          © {new Date().getFullYear()} Hamilton College · International Student Services
        </span>
      </div>

    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f5f7fa",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  topBar: {
    height: "6px",
    background: `linear-gradient(to right, ${HAMILTON_BLUE}, #0055aa)`,
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem 1.5rem",
    maxWidth: "640px",
    margin: "0 auto",
    width: "100%",
  },
  crest: {
    marginBottom: "1.5rem",
    filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.15))",
  },
  heading: {
    fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
    fontWeight: "700",
    color: HAMILTON_BLUE,
    textAlign: "center",
    margin: "0 0 0.4rem",
    letterSpacing: "-0.5px",
    lineHeight: "1.2",
  },
  subheading: {
    fontSize: "1.05rem",
    color: "#555",
    margin: "0 0 1.5rem",
    textAlign: "center",
    fontStyle: "italic",
  },
  divider: {
    width: "60px",
    height: "3px",
    backgroundColor: HAMILTON_GOLD,
    borderRadius: "2px",
    marginBottom: "1.75rem",
  },
  body: {
    fontSize: "1rem",
    color: "#444",
    lineHeight: "1.75",
    textAlign: "center",
    maxWidth: "520px",
    margin: "0 0 1rem",
  },
  btn: {
    marginTop: "1.5rem",
    padding: "0.875rem 2.5rem",
    fontSize: "1.05rem",
    fontWeight: "600",
    color: "white",
    backgroundColor: HAMILTON_BLUE,
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 3px 10px rgba(0,51,102,0.25)",
    transition: "background-color 0.2s, transform 0.2s, box-shadow 0.2s",
    letterSpacing: "0.02em",
  },
  note: {
    marginTop: "1.25rem",
    fontSize: "0.85rem",
    color: "#888",
    textAlign: "center",
  },
  link: {
    color: "#0055aa",
    textDecoration: "none",
  },
  bottomBar: {
    backgroundColor: HAMILTON_BLUE,
    padding: "0.9rem 1.5rem",
    textAlign: "center",
  },
  bottomText: {
    color: "#99b3cc",
    fontSize: "0.8rem",
  },
};
