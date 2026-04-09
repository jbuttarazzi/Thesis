import { useState } from 'react';
import Episode1 from './pages/Episode1';
import Episode2 from './pages/Episode2';
import Episode3 from './pages/Episode3';
import Episode4 from './pages/Episode4';
import Episode5 from './pages/Episode5';
import Episode6 from './pages/Episode6';

// ── Episode metadata — add new episodes here ────────────────────────────────
const EPISODES = [
  { id: 1, title: 'Episode 1', description: 'Interactive arrival experience' },
  { id: 2, title: 'Episode 2', description: 'Continued journey' },
  { id: 3, title: 'Episode 3', description: 'Visa Application' },
  { id: 4, title: 'Episode 4', description: 'Entry Requirements' },
  { id: 5, title: 'Episode 5', description: 'International Student Orientation' },
  { id: 6, title: 'Episode 6', description: 'Contact and Reporting Requirements' },
];

// ── Map episode ID → component so we avoid a long chain of conditionals ─────
const EPISODE_MAP = {
  1: Episode1,
  2: Episode2,
  3: Episode3,
  4: Episode4,
  5: Episode5,
  6: Episode6,
};

// ── Placeholder images for the welcome panel ─────────────────────────────────
// Replace these URLs with real Hamilton ISS photos when available
const WELCOME_IMAGES = [
  { url: 'https://i0.wp.com/thecustodianus.com/wp-content/uploads/2023/04/Hamilton-College-1.jpg?w=1800&ssl=1', alt: 'Hamilton campus' },
  { url: 'https://s3.amazonaws.com/mediacdn.hamilton.edu/images/16:9/1440/dsc4580largejpg.jpg', alt: 'International students' },
  { url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80', alt: 'Students studying' },
  { url: 'https://www.commonapp.org/static/f230768334feef96f469f59e00b93d7b/hamilton-college_111.jpg', alt: 'Campus life' },
];

// ── Welcome panel — shown in the right pane when no episode is selected ───────
function WelcomePanel() {
  return (
    <div style={styles.welcomePanel}>
      {/* 2×2 image grid with a welcome overlay centered on top */}
      <div style={styles.imageGrid}>
        {WELCOME_IMAGES.map((img, i) => (
          <div key={i} style={styles.imageCell}>
            <img src={img.url} alt={img.alt} style={styles.gridImage} />
          </div>
        ))}

        {/* Dark gradient overlay + welcome text sits on top of the grid */}
        <div style={styles.overlayGradient}>
          <div style={styles.overlayContent}>
            <p style={styles.overlayEyebrow}>Hamilton College</p>
            <h2 style={styles.overlayTitle}>International Student Services</h2>
            <p style={styles.overlaySubtitle}>
              Select an episode from the left to begin your orientation journey.
            </p>
          </div>
        </div>
      </div>

      {/* Cards below the image grid with quick-start info */}
      <div style={styles.infoRow}>
        {[
          { icon: '🎓', label: 'Six modules', sub: 'covering your full journey' },
          { icon: '🌐', label: 'Visa & immigration', sub: 'F-1, OPT, CPT and more' },
          { icon: '💬', label: 'AI assistant', sub: 'ask questions anytime' },
        ].map(({ icon, label, sub }) => (
          <div key={label} style={styles.infoCard}>
            <span style={styles.infoIcon}>{icon}</span>
            <span style={styles.infoLabel}>{label}</span>
            <span style={styles.infoSub}>{sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main VideoIntegration component ──────────────────────────────────────────
const VideoIntegration = () => {
  // Track which episode is currently selected (null = show welcome panel)
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  /**
   * Handler: User selected an episode from the left panel
   * Sets the selected episode ID to display that episode on the right
   */
  const handleSelectEpisode = (episodeId) => {
    setSelectedEpisode(episodeId);
    window.scrollTo(0, 0); // Scroll to top when switching episodes
  };

  /**
   * Handler: User wants to proceed to the next episode
   * Increments the episode number (max 6)
   */
  const handleNextEpisode = () => {
    if (selectedEpisode < 6) {
      setSelectedEpisode(selectedEpisode + 1);
      window.scrollTo(0, 0); // Scroll to top when moving to next episode
    }
  };

  /**
   * Handler: User wants to go back to the welcome panel
   * Resets selected episode — episode list stays visible in the left panel
   */
  const handleBackToEpisodes = () => {
    setSelectedEpisode(null);
  };

  // Resolve the component for the currently selected episode
  const EpisodeComponent = selectedEpisode ? EPISODE_MAP[selectedEpisode] : null;

  return (
    <div style={styles.container}>

      {/* ── Left panel: permanent episode list ──────────────────── */}
      <aside style={styles.episodePanel}>
        <div style={styles.episodePanelHeader}>
          <span style={styles.episodePanelTitle}>Modules</span>
        </div>

        <nav style={styles.episodeList}>
          {EPISODES.map(episode => {
            const isActive = selectedEpisode === episode.id;
            return (
              <button
                key={episode.id}
                onClick={() => handleSelectEpisode(episode.id)}
                style={{
                  ...styles.episodeCard,
                  ...(isActive ? styles.episodeCardActive : {}),
                }}
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.backgroundColor = '#eef2f8';
                }}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {/* Active indicator bar on the left edge */}
                <div style={{
                  ...styles.activeBar,
                  opacity: isActive ? 1 : 0,
                }} />

                <div style={styles.episodeCardInner}>
                  {/* Episode number badge */}
                  <div style={{
                    ...styles.episodeBadge,
                    backgroundColor: isActive ? '#003366' : '#e2e8f0',
                    color: isActive ? '#fff' : '#555',
                  }}>
                    {episode.id}
                  </div>

                  <div style={styles.episodeText}>
                    <span style={{
                      ...styles.episodeTitle,
                      color: isActive ? '#003366' : '#1a1a1a',
                    }}>
                      {episode.title}
                    </span>
                    <span style={styles.episodeDesc}>{episode.description}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ── Right panel: welcome imagery or active episode content ── */}
      <div style={styles.contentPanel}>
        {!selectedEpisode && <WelcomePanel />}

        {EpisodeComponent && (
          <div style={styles.episodeContent}>
            {/* Slim header bar above the episode with a back link */}
            <div style={styles.episodeContentHeader}>
              <button style={styles.backBtn} onClick={handleBackToEpisodes}>
                ← Back to overview
              </button>
              <span style={styles.episodeContentLabel}>
                {EPISODES.find(e => e.id === selectedEpisode)?.title}
                <span style={styles.episodeContentSub}>
                  {' · '}{EPISODES.find(e => e.id === selectedEpisode)?.description}
                </span>
              </span>
            </div>

            {/* Render the episode page component, passing through required handlers */}
            <div style={styles.episodePageWrapper}>
              <EpisodeComponent
                onNextEpisode={handleNextEpisode}
                onBackToEpisodes={handleBackToEpisodes}
              />
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

// ── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  // Two-column flex container filling the parent <main>
  container: {
    display: 'flex',
    flex: 1,
    height: '100%',
    overflow: 'hidden',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },

  // ── Left episode panel ───────────────────────────────────────────
  episodePanel: {
    width: '240px',
    flexShrink: 0,
    backgroundColor: '#f8fafc',
    borderRight: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  episodePanelHeader: {
    padding: '1.25rem 1.25rem 0.75rem',
    borderBottom: '1px solid #e2e8f0',
  },
  episodePanelTitle: {
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#64748b',
  },
  episodeList: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5rem 0',
  },
  episodeCard: {
    position: 'relative',
    display: 'flex',
    alignItems: 'stretch',
    width: '100%',
    padding: '0',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background-color 0.15s ease',
  },
  episodeCardActive: {
    backgroundColor: '#eef2ff',
  },
  // Colored left-edge bar shown on the active episode
  activeBar: {
    width: '3px',
    backgroundColor: '#003366',
    flexShrink: 0,
    borderRadius: '0 2px 2px 0',
    transition: 'opacity 0.15s ease',
  },
  episodeCardInner: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.85rem 1rem',
    flex: 1,
  },
  episodeBadge: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    fontWeight: '700',
    flexShrink: 0,
    transition: 'background-color 0.15s, color 0.15s',
  },
  episodeText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    minWidth: 0,
  },
  episodeTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'color 0.15s',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  episodeDesc: {
    fontSize: '0.75rem',
    color: '#94a3b8',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  // ── Right content panel ──────────────────────────────────────────
  contentPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    minWidth: 0,
    backgroundColor: '#fff',
  },

  // ── Welcome panel ────────────────────────────────────────────────
  welcomePanel: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  // 2×2 CSS grid for placeholder images
  imageGrid: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    height: '420px',
    overflow: 'hidden',
  },
  imageCell: {
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    filter: 'brightness(0.75)',  // Darkens images so overlay text is readable
  },
  // Gradient overlay covering the entire image grid
  overlayGradient: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(0,20,60,0.82) 0%, rgba(0,20,60,0.3) 60%, transparent 100%)',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '2.5rem',
  },
  overlayContent: {
    color: '#fff',
  },
  overlayEyebrow: {
    fontSize: '0.8rem',
    fontWeight: '600',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: '0.4rem',
  },
  overlayTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    letterSpacing: '-0.5px',
    marginBottom: '0.5rem',
    lineHeight: '1.2',
  },
  overlaySubtitle: {
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '400',
  },
  // Row of three quick-info cards below the image grid
  infoRow: {
    display: 'flex',
    gap: '1px',
    backgroundColor: '#e2e8f0',  // Gap color between cards
    borderTop: '1px solid #e2e8f0',
  },
  infoCard: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '1.4rem 1rem',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  infoIcon: {
    fontSize: '1.5rem',
    marginBottom: '4px',
  },
  infoLabel: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#1e293b',
  },
  infoSub: {
    fontSize: '0.78rem',
    color: '#94a3b8',
  },

  // ── Active episode content ───────────────────────────────────────
  episodeContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  // Slim breadcrumb-style header above the episode
  episodeContentHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.75rem 1.5rem',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    flexShrink: 0,
  },
  backBtn: {
    background: 'none',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    padding: '0.35rem 0.85rem',
    fontSize: '0.85rem',
    color: '#475569',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  episodeContentLabel: {
    fontSize: '0.92rem',
    fontWeight: '600',
    color: '#003366',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  episodeContentSub: {
    fontWeight: '400',
    color: '#64748b',
  },
  // Wrapper for the episode page — scrollable if content is tall
  episodePageWrapper: {
    flex: 1,
    overflowY: 'auto',
  },
};

export default VideoIntegration;