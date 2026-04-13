/**
 * filename: App.jsx
 *
 * description: Root component of the application. Manages top-level state for the welcome screen, epsiode sidebar, 
 * and video section visibility. Renders the Hamilton header, helpful resources sidebar, video dropdown, chat interface, 
 * and footer in a unified layout.
 */

import { useState } from "react";
import ChatWidget from "./ChatWidget";
import VideoIntegration from "./video-integration/VideoIntegration";
import HamiltonFooter from "./HamiltonFooter";
import WelcomePage from "./WelcomePage";

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
  {
    category: "Tax & Finance",
    links: [
      { label: "Sprintax (Tax Filing)",      href: "https://www.sprintax.com" },
      { label: "IRS Nonresident Aliens",     href: "https://www.irs.gov/individuals/international-taxpayers/nonresident-aliens" },
    ],
  },
];

const SIDEBAR_WIDTH = 260;

// Total space the chat drawer occupies from the right edge (width + side gap)
// Keep in sync with DRAWER_WIDTH + SIDE_GAP in ChatWidget.jsx
const CHAT_PUSH_WIDTH = 504;

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
  const [entered, setEntered]         = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen]       = useState(false); // Lifted up so main content can react to it

  if (!entered) {
    return <WelcomePage onEnter={() => setEntered(true)} />;
  }

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

        {/* Chat trigger button in the header — toggles the drawer */}
        <button
          style={styles.chatTriggerBtn}
          onClick={() => setChatOpen(o => !o)}
          aria-label={chatOpen ? "Close ISS Assistant" : "Open ISS Assistant"}
          title="ISS AI Assistant"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 3C7.03 3 3 6.58 3 11c0 2.13.9 4.06 2.36 5.48L4 21l4.7-1.55A9.27 9.27 0 0 0 12 19c4.97 0 9-3.58 9-8s-4.03-8-9-8z"
              fill="white"
            />
          </svg>
          ISS Assistant
        </button>
      </header>

      {/* ── Body: resources sidebar + main content ──────────────── */}
      <div style={styles.body}>

        <Sidebar open={sidebarOpen} />

        {/* Main shrinks its right margin to make room for the chat drawer */}
        <main
          style={{
            ...styles.main,
            marginRight: chatOpen ? CHAT_PUSH_WIDTH : 0,
            transition: "margin-right 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* VideoIntegration owns its own two-column episode layout */}
          <VideoIntegration />
        </main>

      </div>

      <HamiltonFooter />

      {/* Chat drawer — fixed positioned, rendered outside the flow */}
      <ChatWidget isOpen={chatOpen} setIsOpen={setChatOpen} />

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
    padding: "0 1.5rem",
    height: "60px",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    position: "sticky",          // stays visible during scroll
    top: 0,
    zIndex: 100,
    flexShrink: 0,
  },
  headerTitle: {
    margin: 0,
    fontSize: "1.25rem",
    flex: 1,                     // pushes the chat button to the far right
    fontWeight: "600",
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
  /* Chat trigger in the header — pill-shaped */
  chatTriggerBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "7px 16px",
    backgroundColor: "transparent",
    border: "1.5px solid rgba(255,255,255,0.55)",
    borderRadius: "20px",
    color: "white",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "500",
    flexShrink: 0,
    whiteSpace: "nowrap",
  },

  // ── Layout ──────────────────────────────────────────────────────
  body: {
    display: "flex",
    flex: 1,
    overflow: "hidden",          // prevents double scrollbars
  },

  // ── Resources sidebar ────────────────────────────────────────────
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

  // ── Main content — VideoIntegration fills this entirely ──────────
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    minWidth: 0,                 // allows flex child to shrink below content size when chat pushes it
  },
};

export default App;
