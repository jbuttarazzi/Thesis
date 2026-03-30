/**
 * EpisodeSelector Component
 * 
 * Main menu for selecting which episode to play.
 * Displays all available episodes with their descriptions.
 * 
 * Props:
 * - onSelectEpisode: Function - Callback when an episode is selected, receives episode ID
 */
const EpisodeSelector = ({ onSelectEpisode }) => {
  // Array of available episodes
  // Add new episodes here as they are created
  const episodes = [
    { id: 1, title: 'Episode 1', description: 'Interactive arrival experience' },
    { id: 2, title: 'Episode 2', description: 'Continued journey' },
    { id: 3, title: 'Episode 3', description: 'Visa Application' },
    { id: 4, title: 'Episode 4', description: 'Entry Requirements' },
    { id: 5, title: 'Episode 5', description: 'International Student Orientation' },
    // Add more episodes here as they're created
  ];

  return (
    <div style={{ padding: '20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      <h2 style={{ 
        fontSize: '28px', 
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: '10px',
        letterSpacing: '-0.5px'
      }}>
        Select an Episode
      </h2>
      {/* Vertical list of episode buttons */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '15px', 
        marginTop: '20px' 
      }}>
        {/* Map through episodes to create clickable cards */}
        {episodes.map(episode => (
          <button
            key={episode.id}
            onClick={() => onSelectEpisode(episode.id)}
            style={{
              padding: '24px',
              fontSize: '18px',
              fontFamily: 'inherit',
              textAlign: 'left',
              cursor: 'pointer',
              border: '2px solid #007bff',
              borderRadius: '12px',
              background: 'white',
              transition: 'all 0.2s',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#f0f8ff';
              e.target.style.transform = 'translateX(5px)';
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'white';
              e.target.style.transform = 'translateX(0)';
              e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
            }}
          >
            <div style={{ 
              fontWeight: '600', 
              marginBottom: '8px',
              fontSize: '20px',
              color: '#1a1a1a',
              letterSpacing: '-0.3px'
            }}>
              {episode.title}
            </div>
            <div style={{ 
              fontSize: '15px', 
              color: '#666',
              fontWeight: '400',
              lineHeight: '1.5'
            }}>
              {episode.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EpisodeSelector;
