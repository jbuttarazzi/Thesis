/**
 * filename: App.jsx
 *
 * description: Root component of the application. Manages top-level state for the welcome screen, epsiode sidebar, 
 * and video section visibility. Renders the Hamilton header, helpful resources sidebar, video dropdown, chat interface, 
 * and footer in a unified layout.
 */

import { useState, useEffect } from "react";
import ChatWidget from "./ChatWidget";
import VideoIntegration from "./video-integration/VideoIntegration";
import HamiltonFooter from "./HamiltonFooter";
import WelcomePage from "./WelcomePage";
import { useIsMobile } from "./useIsMobile";

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
const CHAT_PUSH_WIDTH = 504;

function Sidebar({ open, isMobile }) {
  return (
    <aside style={{
      ...styles.sidebar,
      // Desktop: Animate sidebar width open/close
      ...(!isMobile && { width: open ? SIDEBAR_WIDTH : 0 }),
      // Mobile: Converts to sliding overlay drawer to keep screen layout intact
      ...(isMobile && {
        position: "fixed",
        top: "60px", 
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "calc(100dvh - 60px)",
        zIndex: 1040, 
        transform: open ? "translateX(0)" : "translateX(-110%)", 
        borderRight: "none",
        borderTop: "1px solid #dce3ec",
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      }),
    }}>
      <div style={{
        ...styles.sidebarInner,
        width: isMobile ? "100%" : SIDEBAR_WIDTH,
        padding: isMobile ? "1.5rem 1.25rem" : "1.25rem 1rem",
      }}>
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
  const [chatOpen, setChatOpen]       = useState(false); 
  const isMobile                      = useIsMobile();   

  // Lock background scrolling when overlay drawers are open on mobile
  useEffect(() => {
    if (isMobile && (sidebarOpen || chatOpen)) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen, chatOpen, isMobile]);

  if (!entered) {
    return <WelcomePage onEnter={() => setEntered(true)} />;
  }

  return (
    <div style={styles.root}>

      {/* ── Header ──────────────────────────────────────────────── */}
      <header style={styles.header}>
        <button
          style={styles.toggleBtn}
          onClick={() => setSidebarOpen(o => !o)}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          title="Helpful Resources"
        >
          {sidebarOpen ? "✕" : "☰"}
        </button>

        <h1 style={{
          ...styles.headerTitle,
          fontSize: isMobile ? "1rem" : "1.25rem",
        }}>
          {isMobile ? "Hamilton ISS Module" : "Hamilton International Student Services Learning Module"}
        </h1>

        <button
          style={styles.chatTriggerBtn}
          onClick={() => setChatOpen(o => !o)}
          aria-label={chatOpen ? "Close ISS Assistant" : "Open ISS Assistant"}
          title="ISS Assistant"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 3C7.03 3 3 6.58 3 11c0 2.13.9 4.06 2.36 5.48L4 21l4.7-1.55A9.27 9.27 0 0 0 12 19c4.97 0 9-3.58 9-8s-4.03-8-9-8z"
              fill="white"
            />
          </svg>
          {isMobile ? "Assistant" : "ISS Assistant"}
        </button>
      </header>

      {/* ── Body ───────────────────────────────────────────────── */}
      <div style={{
        ...styles.body,
        overflow: isMobile ? "visible" : "hidden",
      }}>
        <Sidebar open={sidebarOpen} isMobile={isMobile} />

        <main
          style={{
            ...styles.main,
            marginRight: chatOpen && !isMobile ? CHAT_PUSH_WIDTH : 0,
            overflow: isMobile ? "visible" : "hidden",
            transition: "margin-right 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <VideoIntegration />
        </main>
      </div>

      {/* The Footer naturally pushes to the bottom because styles.body has flex: 1 */}
      <HamiltonFooter />
      <ChatWidget isOpen={chatOpen} setIsOpen={setChatOpen} />
    </div>
  );
}

const styles = {
  root: {
    // 1. Establish the entire app as a flex column
    display: "flex",
    flexDirection: "column",
    // 2. Ensure it takes up at least the full viewport height
    minHeight: "100vh",
  },
  header: {
    backgroundColor: "#003366",
    color: "white",
    padding: "0 1rem",
    height: "60px",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    position: "sticky",          
    top: 0,
    zIndex: 1050, 
    flexShrink: 0,
  },
  headerTitle: {
    margin: 0,
    flex: 1,                     
    fontWeight: "600",
    overflow: "hidden",          
    textOverflow: "ellipsis",    
    whiteSpace: "nowrap",        
    minWidth: 0,                 
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
  chatTriggerBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    backgroundColor: "transparent",
    border: "1.5px solid rgba(255,255,255,0.55)",
    borderRadius: "20px",
    color: "white",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: "500",
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  body: {
    display: "flex",
    // 3. This tells the middle section to grow and consume all empty space
    flex: 1,
  },
  sidebar: {
    backgroundColor: "#f0f4f8",
    borderRight: "1px solid #dce3ec",
    overflowX: "hidden",
    overflowY: "auto",
    transition: "transform 0.3s ease, width 0.25s ease", 
    flexShrink: 0,
  },
  sidebarInner: {
    // Width handled dynamically in component props
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
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,                 
  },
};

export default App;