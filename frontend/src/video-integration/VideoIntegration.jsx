import { useState } from 'react';
import EpisodeSelector from './components/EpisodeSelector';
import Episode1 from './pages/Episode1';
import Episode2 from './pages/Episode2';
import Episode3 from './pages/Episode3';

/**
 * VideoIntegration Component
 * 
 * Top-level component for the video integration module.
 * Manages navigation between episode selection and individual episodes.
 * Acts as a router for the video experience.
 */
const VideoIntegration = () => {
  // Track which episode is currently selected (null = show episode selector)
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  /**
   * Handler: User selected an episode from the menu
   * Sets the selected episode ID to display that episode
   */
  const handleSelectEpisode = (episodeId) => {
    setSelectedEpisode(episodeId);
  };

  /**
   * Handler: User wants to go back to episode selection
   * Resets selected episode to show the episode menu
   */
  const handleBackToEpisodes = () => {
    setSelectedEpisode(null);
  };

  return (
    <div>
      {/* Show episode selector when no episode is selected */}
      {!selectedEpisode && (
        <EpisodeSelector onSelectEpisode={handleSelectEpisode} />
      )}
      
      {/* Show Episode 1 when selected */}
      {selectedEpisode === 1 && (
        <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
          {/* Back button to return to episode selection */}
          <button
            onClick={handleBackToEpisodes}
            style={{
              margin: '20px',
              padding: '12px 24px',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              border: '1px solid #ddd',
              borderRadius: '8px',
              background: 'white',
              color: '#333',
              transition: 'all 0.2s',
              fontFamily: 'inherit'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#f5f5f5';
              e.target.style.borderColor = '#999';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'white';
              e.target.style.borderColor = '#ddd';
            }}
          >
            ← Back to Episodes
          </button>
          <Episode1 />
        </div>
      )}
      
      {/* Show Episode 2 when selected */}
      {selectedEpisode === 2 && (
        <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
          {/* Back button to return to episode selection */}
          <button
            onClick={handleBackToEpisodes}
            style={{
              margin: '20px',
              padding: '12px 24px',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              border: '1px solid #ddd',
              borderRadius: '8px',
              background: 'white',
              color: '#333',
              transition: 'all 0.2s',
              fontFamily: 'inherit'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#f5f5f5';
              e.target.style.borderColor = '#999';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'white';
              e.target.style.borderColor = '#ddd';
            }}
          >
            ← Back to Episodes
          </button>
          <Episode2 />
        </div>
      )}

      {/* Show Episode 3 when selected */}
      {selectedEpisode === 3 && (
        <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
          {/* Back button to return to episode selection */}
          <button
            onClick={handleBackToEpisodes}
            style={{
              margin: '20px',
              padding: '12px 24px',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              border: '1px solid #ddd',
              borderRadius: '8px',
              background: 'white',
              color: '#333',
              transition: 'all 0.2s',
              fontFamily: 'inherit'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#f5f5f5';
              e.target.style.borderColor = '#999';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'white';
              e.target.style.borderColor = '#ddd';
            }}
          >
            ← Back to Episodes
          </button>
          <Episode3 />
        </div>
      )}
      
      {/* Add more episodes here as they're created */}
    </div>
  );
};

export default VideoIntegration;
