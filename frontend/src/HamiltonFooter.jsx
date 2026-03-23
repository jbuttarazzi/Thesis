/**
 * HamiltonFooter.jsx
 * Replicates the Hamilton College site footer structure.
 * Social icons use inline SVG paths since Hamilton's icon sprite
 * (/v22/images/icons.svg) is not available outside hamilton.edu.
 */

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "//www.facebook.com/HamiltonCollege",
    // Facebook "f" path
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    name: "Instagram",
    href: "//www.instagram.com/hamiltoncollege",
    // Instagram camera outline
    path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2z",
  },
  {
    name: "LinkedIn",
    href: "//www.linkedin.com/school/hamilton-college",
    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  },
  {
    name: "YouTube",
    href: "//www.youtube.com/channel/UCxwTJV0bVVvwmdaXN_rqgQw",
    path: "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
  },
  {
    name: "TikTok",
    href: "//www.tiktok.com/@hamiltoncollege",
    path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z",
  },
];

const NAV_LINKS = [
  { label: "My Hamilton",      href: "//www.hamilton.edu/myhamilton" },
  { label: "Maps & Directions", href: "//www.hamilton.edu/admission/visiting/directions" },
  { label: "Offices & Services", href: "//www.hamilton.edu/offices/offices-services" },
  { label: "Non-discrimination", href: "//www.hamilton.edu/offices/afs/policies/non-discrimination-statement" },
  { label: "Accessibility",    href: "//www.hamilton.edu/about/accessibility" },
  { label: "Privacy",          href: "//www.hamilton.edu/privacy" },
  { label: "Jobs",             href: "//www.hamilton.edu/offices/human-resources/employment/job-opportunities" },
  { label: "Contact Us",       href: "//www.hamilton.edu/about/contact" },
];

function SocialIcon({ path }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 20, height: 20 }}
    >
      <path d={path} />
    </svg>
  );
}

export default function HamiltonFooter() {
  return (
    <footer style={s.footer}>

      {/* ── Top ribbon: address + social icons ───────────────── */}
      <div style={s.ribbon}>
        <div style={s.ribbonInner}>

          {/* Address + phone */}
          <div style={s.metaInfo}>
            <a
              href="//www.google.com/maps/place/?q=place_id:ChIJ515-9xlp2YkRlZiUeiygm3w"
              target="_blank"
              rel="noopener noreferrer"
              style={s.metaLink}
            >
              198 College Hill Road, Clinton, NY 13323
            </a>
            <a href="tel:3158594011" style={s.metaLink}>
              315-859-4011
            </a>
          </div>

          {/* Social icons */}
          <div style={s.socialNav}>
            <span style={s.socialTitle}>Social</span>
            <ul style={s.socialList}>
              {SOCIAL_LINKS.map(({ name, href, path }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={s.socialLink}
                    title={name}
                    aria-label={name}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >
                    <SocialIcon path={path} />
                    <span style={s.socialLabel}>{name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar: nav links + copyright ────────────────── */}
      <div style={s.primary}>
        <div style={s.primaryInner}>

          <nav aria-label="Footer navigation">
            <ul style={s.navList}>
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={s.navLink}
                    onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                    onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p style={s.copyright}>
            © 2026 Hamilton College. All Rights Reserved.
          </p>

        </div>
      </div>

    </footer>
  );
}

const s = {
  footer: {
    backgroundColor: "#003366",
    color: "#ffffff",
    marginTop: "auto",   // pushes footer to bottom when content is short
    fontSize: "0.875rem",
  },

  // ── Ribbon ──────────────────────────────────────────────────────
  ribbon: {
    borderBottom: "1px solid rgba(255,255,255,0.15)",
    padding: "1.5rem 2rem",
  },
  ribbonInner: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1.25rem",
  },

  // ── Address / phone ─────────────────────────────────────────────
  metaInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  metaLink: {
    color: "#ccd9e8",
    textDecoration: "none",
    lineHeight: "1.6",
  },

  // ── Social ──────────────────────────────────────────────────────
  socialNav: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  socialTitle: {
    fontWeight: "600",
    fontSize: "0.8rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#ccd9e8",
  },
  socialList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap",
  },
  socialLink: {
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    gap: "0.35rem",
    textDecoration: "none",
    transition: "opacity 0.15s",
  },
  socialLabel: {
    fontSize: "0.8rem",
  },

  // ── Primary / nav bar ───────────────────────────────────────────
  primary: {
    padding: "1.25rem 2rem",
  },
  primaryInner: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
  },
  navList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexWrap: "wrap",
    gap: "0.25rem 1.5rem",
  },
  navLink: {
    color: "#ccd9e8",
    textDecoration: "none",
    lineHeight: "1.8",
  },
  copyright: {
    margin: 0,
    color: "#99afc4",
    fontSize: "0.8rem",
  },
};
