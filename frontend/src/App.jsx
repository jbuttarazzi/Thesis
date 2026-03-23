import { useState } from "react";
import ChatWidget from "./ChatWidget";
import VideoIntegration from "./video-integration/VideoIntegration";
import HamiltonFooter from "./HamiltonFooter";


// ── Sidebar links config — easy to add/remove entries ──────────────────────
const SIDEBAR_LINKS = [
  {
    category: "Visa & Immigration",
    links: [
      { label: "USCIS Official Site",        href: "https://www.uscis.gov" },
      { label: "Study in the States (DHS)",  href: "https://studyinthestates.dhs.gov" },
      { label: "Travel.State.Gov",           href: "https://travel.state.gov" },
    ],
  },
  {
    category: "Hamilton College",
    links: [
      { label: "ISS Office",                 href: "https://www.hamilton.edu/offices/international-student-services" },
      { label: "Dean of Students",           href: "https://www.hamilton.edu/offices/dean-of-students" },
      { label: "Student Health Services",    href: "https://www.hamilton.edu/offices/health" },
    ],
  },
  //{
    //category: "Tax & Finance",
    //links: [
      //{ label: "Sprintax (Tax Filing)",      href: "https://www.sprintax.com" },
      //{ label: "IRS Nonresident Aliens",     href: "https://www.irs.gov/individuals/international-taxpayers/nonresident-aliens" },
    //],
  //},
];

const SIDEBAR_WIDTH = 260;

function Sidebar({ open }) {
  return (
    <aside style={{ ...styles.sidebar, width: open ? SIDEBAR_WIDTH : 0 }}>
      <div style={styles.sidebarInner}>
        <p style={styles.sidebarTitle}>Helpful Resources</p>

        {SIDEBAR_LINKS.map(({ category, links }) => (
          <div key={category} style={styles.linkGroup}>
            <p style={styles.category}>{category}</p>
            {links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={styles.link}
                onMouseEnter={e => (e.target.style.backgroundColor = "#e8f0fe")}
                onMouseLeave={e => (e.target.style.backgroundColor = "transparent")}
              >
                {label} ↗
              </a>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}

function App() {
  const [showVideos, setShowVideos]   = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={styles.root}>

      {/* ── Header ──────────────────────────────────────────────── */}
      <header style={styles.header}>
        {/* Toggle button lives in the header so it's always visible */}
        <button
          style={styles.toggleBtn}
          onClick={() => setSidebarOpen(o => !o)}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          title="Helpful Resources"
        >
          {sidebarOpen ? "✕" : "☰"}
        </button>
        <h1 style={styles.headerTitle}>
          Hamilton International Student Services Learning Module
        </h1>
      </header>

      {/* ── Body: sidebar + main content ────────────────────────── */}
      <div style={styles.body}>

        <Sidebar open={sidebarOpen} />

        <main style={styles.main}>

          {/* ── Video Section ───────────────────────────────────── */}
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

          {/* ── Chat Section ────────────────────────────────────── */}
          <section style={styles.section}>
            <ChatWidget />
          </section>

        </main>
      </div>
      <HamiltonFooter />
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },

  // ── Header ──────────────────────────────────────────────────────
  header: {
    backgroundColor: "#003366",
    color: "white",
    padding: "1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    position: "sticky",          // stays visible when you scroll
    top: 0,
    zIndex: 100,
  },
  headerTitle: {
    margin: 0,
    fontSize: "1.4rem",
  },
  toggleBtn: {
    background: "transparent",
    border: "2px solid white",
    color: "white",
    borderRadius: "6px",
    width: "36px",
    height: "36px",
    fontSize: "1.1rem",
    cursor: "pointer",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Layout ──────────────────────────────────────────────────────
  body: {
    display: "flex",
    flex: 1,
  },

  // ── Sidebar ─────────────────────────────────────────────────────
  sidebar: {
    backgroundColor: "#f0f4f8",
    borderRight: "1px solid #dce3ec",
    overflowX: "hidden",
    overflowY: "auto",
    transition: "width 0.25s ease",  // smooth open/close
    flexShrink: 0,
  },
  sidebarInner: {
    width: SIDEBAR_WIDTH,            // fixed inner width prevents text reflow
    padding: "1.25rem 1rem",
  },
  sidebarTitle: {
    fontWeight: "700",
    fontSize: "0.85rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#003366",
    marginBottom: "1rem",
  },
  linkGroup: {
    marginBottom: "1.25rem",
  },
  category: {
    fontWeight: "600",
    fontSize: "0.8rem",
    color: "#555",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "0.4rem",
    borderBottom: "1px solid #d0d8e4",
    paddingBottom: "0.25rem",
  },
  link: {
    display: "block",
    padding: "0.4rem 0.5rem",
    borderRadius: "5px",
    color: "#0055aa",
    textDecoration: "none",
    fontSize: "0.88rem",
    lineHeight: "1.5",
    transition: "background-color 0.15s",
  },

  // ── Main content ────────────────────────────────────────────────
  main: {
    flex: 1,
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowX: "hidden",
  },
  section: {
    width: "100%",
    maxWidth: "800px",
    marginBottom: "2rem",
  },
  dropdownButton: {
    padding: "0.8rem 1rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#0066cc",
    color: "white",
    cursor: "pointer",
  },
  videoContainer: {
    marginTop: "1rem",
    padding: "1rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
};

export default App;
