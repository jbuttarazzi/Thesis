import { useState } from 'react';
import Episode1 from './pages/Episode1';
import Episode2 from './pages/Episode2';
import Episode3 from './pages/Episode3';
import Episode4 from './pages/Episode4';
import Episode5 from './pages/Episode5';
import Episode6 from './pages/Episode6';
import { useIsMobile } from '../useIsMobile';

// ── Episode metadata — add new episodes here ────────────────────────────────
const EPISODES = [
  { id: 1, title: 'Episode 1', description: 'Interactive arrival experience' },
  { id: 2, title: 'Episode 2', description: 'Continued journey' },
  { id: 3, title: 'Episode 3', description: 'Visa Application' },
  { id: 4, title: 'Episode 4', description: 'Entry Requirements' },
  { id: 5, title: 'Episode 5', description: 'International Student Orientation' },
  { id: 6, title: 'Episode 6', description: 'Contact and Reporting Requirements' },
];

// ── Map episode ID → component ───────────────────────────────────────────────
const EPISODE_MAP = {
  1: Episode1,
  2: Episode2,
  3: Episode3,
  4: Episode4,
  5: Episode5,
  6: Episode6,
};

// ── Placeholder images for the welcome panel ─────────────────────────────────
const WELCOME_IMAGES = [
  { url: 'https://i0.wp.com/thecustodianus.com/wp-content/uploads/2023/04/Hamilton-College-1.jpg?w=1800&ssl=1', alt: 'Hamilton campus' },
  { url: 'https://s3.amazonaws.com/mediacdn.hamilton.edu/images/16:9/1440/dsc4580largejpg.jpg', alt: 'International students' },
  { url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80', alt: 'Students studying' },
  { url: 'https://www.commonapp.org/static/f230768334feef96f469f59e00b93d7b/hamilton-college_111.jpg', alt: 'Campus life' },
];

// ── Welcome panel ─────────────────────────────────────────────────────────────
function WelcomePanel({ isMobile }) {
  return (
    <div style={styles.welcomePanel}>
      <div style={{ ...styles.imageGrid, height: isMobile ? '260px' : '420px' }}>
        {WELCOME_IMAGES.map((img, i) => (
          <div key={i} style={styles.imageCell}>
            <img src={img.url} alt={img.alt} style={styles.gridImage} />
          </div>
        ))}

        <div style={styles.overlayGradient}>
          <div style={{ ...styles.overlayContent, padding: isMobile ? '1.25rem' : '2.5rem' }}>
            <p style={styles.overlayEyebrow}>Hamilton College</p>
            <h2 style={{ ...styles.overlayTitle, fontSize: isMobile ? '1.3rem' : '2rem' }}>
              International Student Services
            </h2>
            {!isMobile && (
              <p style={styles.overlaySubtitle}>
                Select an episode from the left to begin your orientation journey.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Info cards — stack vertically on mobile */}
      <div style={{
        ...styles.infoRow,
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '1px' : '1px',
      }}>
        {[
          { icon: '🎓', label: 'Six modules', sub: 'covering your full journey' },
          { icon: '🌐', label: 'Visa & immigration', sub: 'F-1, OPT, CPT and more' },
          { icon: '💬', label: 'AI assistant', sub: 'ask questions anytime' },
        ].map(({ icon, label, sub }) => (
          <div key={label} style={{
            ...styles.infoCard,
            minHeight: isMobile ? '75px' : undefined,
            flexDirection: isMobile ? 'row' : 'column',
            alignItems: isMobile ? 'center' : 'center',
            justifyContent: isMobile ? 'flex-start' : 'center',
            gap: isMobile ? '0.75rem' : '4px',
            // PUSHES THE INFO CARDS DOWN: Increased desktop padding to 3rem
            padding: isMobile ? '0.9rem 1.25rem' : '3rem 1rem',
            textAlign: isMobile ? 'left' : 'center',
          }}>
            <span style={{ ...styles.infoIcon, marginBottom: isMobile ? 0 : '4px' }}>{icon}</span>
            <div>
              <span style={{ ...styles.infoLabel, display: 'block' }}>{label}</span>
              <span style={styles.infoSub}>{sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main VideoIntegration component ──────────────────────────────────────────
const VideoIntegration = () => {
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const isMobile = useIsMobile();

  const showList = !isMobile || selectedEpisode === null;
  const showContent = true;

  const handleSelectEpisode = (episodeId) => {
    setSelectedEpisode(episodeId);
    window.scrollTo(0, 0);
  };

  const handleNextEpisode = () => {
    if (selectedEpisode < 6) {
      setSelectedEpisode(selectedEpisode + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBackToEpisodes = () => {
    setSelectedEpisode(null);
  };

  const EpisodeComponent = selectedEpisode ? EPISODE_MAP[selectedEpisode] : null;

  return (
    <div style={{
      ...styles.container,
      flexDirection: isMobile ? 'column' : 'row',
      height: isMobile ? 'auto' : '100%',
      overflow: isMobile ? 'visible' : 'hidden',
    }}>

      {/* ── Episode list — hidden on mobile when an episode is open ── */}
      {showList && (
        <aside style={{
          ...styles.episodePanel,
          width: isMobile ? '100%' : '240px',
          borderRight: isMobile ? 'none' : '1px solid #e2e8f0',
          borderBottom: isMobile ? '1px solid #e2e8f0' : 'none',
          maxHeight: isMobile ? '260px' : 'none',
        }}>
          <div style={styles.episodePanelHeader}>
            <span style={styles.episodePanelTitle}>Modules</span>
          </div>

          <nav style={{
            ...styles.episodeList,
            flexDirection: isMobile ? 'row' : 'column',
            overflowX: isMobile ? 'auto' : 'visible',
            padding: isMobile ? '0.5rem' : '0.5rem 0',
            gap: isMobile ? '0.5rem' : '0',
          }}>
            {EPISODES.map(episode => {
              const isActive = selectedEpisode === episode.id;
              return (
                <button
                  key={episode.id}
                  onClick={() => handleSelectEpisode(episode.id)}
                  style={{
                    ...styles.episodeCard,
                    ...(isMobile ? {
                      flexShrink: 0,
                      width: 'auto',
                      borderRadius: '8px',
                      border: isActive ? '2px solid #003366' : '1px solid #e2e8f0',
                      backgroundColor: isActive ? '#eef2ff' : '#fff',
                      padding: '0.5rem 0.85rem',
                    } : {
                      ...(isActive ? styles.episodeCardActive : {}),
                    }),
                  }}
                  onMouseEnter={e => {
                    if (!isActive && !isMobile) e.currentTarget.style.backgroundColor = '#eef2f8';
                  }}
                  onMouseLeave={e => {
                    if (!isActive && !isMobile) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {!isMobile && (
                    <div style={{ ...styles.activeBar, opacity: isActive ? 1 : 0 }} />
                  )}

                  <div style={{
                    ...styles.episodeCardInner,
                    // PUSHES THE SIDEBAR DOWN: Increased desktop padding to 1.5rem
                    padding: isMobile ? '0' : '1.5rem 1rem',
                    gap: isMobile ? '0.4rem' : '0.75rem',
                  }}>
                    <div style={{
                      ...styles.episodeBadge,
                      backgroundColor: isActive ? '#003366' : '#e2e8f0',
                      color: isActive ? '#fff' : '#555',
                      width: isMobile ? '24px' : '28px',
                      height: isMobile ? '24px' : '28px',
                      fontSize: isMobile ? '0.75rem' : '0.8rem',
                    }}>
                      {episode.id}
                    </div>

                    <div style={styles.episodeText}>
                      <span style={{
                        ...styles.episodeTitle,
                        color: isActive ? '#003366' : '#1a1a1a',
                        fontSize: isMobile ? '0.82rem' : '0.9rem',
                      }}>
                        {episode.title}
                      </span>
                      {!isMobile && (
                        <span style={styles.episodeDesc}>{episode.description}</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>
      )}

      {/* ── Content panel ───────────────────────────────────────────── */}
      {showContent && (
        <div style={{
          ...styles.contentPanel,
          overflow: isMobile ? 'visible' : 'auto',
          backgroundColor: '#fff', // Use clean white background to merge seamlessly
        }}>
          {!selectedEpisode && <WelcomePanel isMobile={isMobile} />}

          {EpisodeComponent && (
            <div style={styles.episodeContent}>
              <div style={{
                ...styles.episodeContentHeader,
                padding: isMobile ? '0.65rem 1rem' : '0.75rem 1.5rem',
              }}>
                <button style={styles.backBtn} onClick={handleBackToEpisodes}>
                  ← {isMobile ? 'Episodes' : 'Back to overview'}
                </button>
                <span style={styles.episodeContentLabel}>
                  {EPISODES.find(e => e.id === selectedEpisode)?.title}
                  {!isMobile && (
                    <span style={styles.episodeContentSub}>
                      {' · '}{EPISODES.find(e => e.id === selectedEpisode)?.description}
                    </span>
                  )}
                </span>
              </div>

              <div style={styles.episodePageWrapper}>
                <EpisodeComponent
                  onNextEpisode={handleNextEpisode}
                  onBackToEpisodes={handleBackToEpisodes}
                />
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

// ── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  container: {
    display: 'flex',
    flex: 1,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  episodePanel: {
    flexShrink: 0,
    backgroundColor: '#f8fafc',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  episodePanelHeader: {
    padding: '1.25rem 1.25rem 0.75rem',
    borderBottom: '1px solid #e2e8f0',
    flexShrink: 0,
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
    padding: '1.5rem 1rem', // Fallback for styles object
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
  contentPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    WebkitOverflowScrolling: 'touch',
    minWidth: 0,
  },
  welcomePanel: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff', // Use clean white background to merge seamlessly
  },
  imageGrid: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
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
    filter: 'brightness(0.75)',
  },
  overlayGradient: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(0,20,60,0.82) 0%, rgba(0,20,60,0.3) 60%, transparent 100%)',
    display: 'flex',
    alignItems: 'flex-end',
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
  infoRow: {
    display: 'flex',
    gap: '1px',
    backgroundColor: '#e2e8f0',
    borderTop: '1px solid #e2e8f0',
    borderBottom: '1px solid #e2e8f0', // Clean boundary before empty space
  },
  infoCard: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '3rem 1rem', // Fallback for styles object
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
  episodeContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  episodeContentHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
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
  episodePageWrapper: {
    flex: 1,
    overflowY: 'auto',
  },
};

export default VideoIntegration;