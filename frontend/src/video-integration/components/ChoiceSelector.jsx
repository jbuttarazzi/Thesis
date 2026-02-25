import { useState } from 'react';

/**
 * ChoiceSelector Component
 * 
 * Presents users with multiple choice options that link to different videos.
 * Tracks which choices have been explored and allows users to watch multiple options.
 * Users return to this screen after each choice video ends.
 * 
 * Props:
 * - onSelect: Function - Callback when a choice is clicked, receives choice object
 * - onComplete: Function - Callback when user is ready to proceed to feedback
 */
const ChoiceSelector = ({ onSelect, onComplete }) => {
  // Track array of choice IDs that user has already watched
  const [watchedChoices, setWatchedChoices] = useState([]);

  // Array of available choices with their associated videos
  // Each choice represents a first reaction scenario
  const choices = [
    { id: 1, title: 'Call family', video: '/src/assets/videos/Episode_1/scene3.mp4' },
    { id: 2, title: 'Read the email again', video: '/src/assets/videos/Episode_1/scene4.mp4' },
    { id: 3, title: 'Google the school', video: '/src/assets/videos/Episode_1/scene5.mp4' },
    { id: 4, title: 'Sit quietly and breathe', video: '/src/assets/videos/Episode_1/scene6.mp4' },
  ];

  /**
   * Handle choice button click
   * Adds choice to watched list if not already watched
   * Triggers onSelect callback to play the associated video
   */
  const handleChoiceClick = (choice) => {
    if (!watchedChoices.includes(choice.id)) {
      setWatchedChoices([...watchedChoices, choice.id]);
    }
    onSelect(choice);
  };

  return (
    <div className="choice-selector" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      {/* Main heading */}
      <h2 style={{ 
        fontSize: '28px', 
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: '10px',
        letterSpacing: '-0.5px'
      }}>
        THE FIRST REACTION
      </h2>
      {/* Progress indicator showing how many choices explored */}
      <p style={{ 
        color: '#666', 
        marginBottom: '20px',
        fontSize: '15px',
        fontWeight: '400'
      }}>
        {watchedChoices.length} of {choices.length} choices explored
      </p>
      
      {/* Grid layout for choice buttons - 2 columns */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '20px', 
        marginTop: '20px' 
      }}>
        {/* Map through choices and create clickable buttons */}
        {choices.map(choice => (
          <button
            key={choice.id}
            onClick={() => handleChoiceClick(choice)}
            style={{
              padding: '40px',
              fontSize: '18px',
              fontWeight: '500',
              fontFamily: 'inherit',
              cursor: 'pointer',
              color: '#1a1a1a',
              // Change border color to green if already watched
              border: `2px solid ${watchedChoices.includes(choice.id) ? '#28a745' : '#007bff'}`,
              borderRadius: '12px',
              // Green background tint if already watched
              background: watchedChoices.includes(choice.id) ? '#e8f5e9' : 'white',
              position: 'relative',
              transition: 'all 0.2s',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              letterSpacing: '-0.2px',
              textAlign: 'center'
            }}
          >
            {choice.title}
            {/* Checkmark indicator for watched choices */}
            {watchedChoices.includes(choice.id) && (
              <span style={{ 
                position: 'absolute', 
                top: '12px', 
                right: '12px',
                color: '#28a745',
                fontSize: '24px',
                fontWeight: 'bold'
              }}>
                ✓
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Continue button to proceed to reflection form */}
      <button
        onClick={onComplete}
        style={{
          marginTop: '30px',
          padding: '14px 28px',
          fontSize: '16px',
          fontWeight: '600',
          fontFamily: 'inherit',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: '0 2px 8px rgba(0,123,255,0.3)'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#0056b3';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 12px rgba(0,123,255,0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = '#007bff';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 2px 8px rgba(0,123,255,0.3)';
        }}
      >
        Continue
      </button>
    </div>
  );
};

export default ChoiceSelector;
