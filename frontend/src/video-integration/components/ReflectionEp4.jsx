import { useState } from 'react';

/**
 * ReflectionEp4 Component
 *
 * Final reflection question for Episode 4.
 *
 * Props:
 * - onComplete: Function - Callback when reflection is submitted
 * - onNextEpisode: Function - Callback to proceed to next episode
 * - episodeNumber: Number - Current episode number (4)
 */
const ReflectionEp4 = ({ onComplete, onNextEpisode, episodeNumber = 4 }) => {
  const [reflectionText, setReflectionText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (reflectionText.trim()) {
      setIsSubmitted(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        padding: '40px 20px',
        maxWidth: '700px',
        margin: '0 auto'
      }}
    >
      {!isSubmitted ? (
      <div
        style={{
          background: 'white',
          border: '2px solid #007bff',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <h2
          style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#007bff',
            marginBottom: '30px',
            textAlign: 'center',
            letterSpacing: '-0.5px'
          }}
        >
          Reflection
        </h2>

        <p
          style={{
            fontSize: '18px',
            lineHeight: '1.7',
            color: '#333',
            textAlign: 'center',
            fontWeight: '500',
            marginBottom: '30px'
          }}
        >
          What is one detail you will confirm before finalizing your travel plans?
        </p>

        <textarea
          value={reflectionText}
          onChange={(e) => setReflectionText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your response here..."
          style={{
            width: '100%',
            minHeight: '150px',
            padding: '15px',
            fontSize: '16px',
            fontFamily: 'inherit',
            border: '2px solid #ddd',
            borderRadius: '8px',
            resize: 'vertical',
            boxSizing: 'border-box',
            color: '#333'
          }}
        />

        <div
          style={{
            marginTop: '30px',
            textAlign: 'center'
          }}
        >
          <button
            onClick={handleSubmit}
            disabled={!reflectionText.trim()}
            style={{
              padding: '12px 40px',
              fontSize: '16px',
              fontWeight: '600',
              fontFamily: 'inherit',
              background: reflectionText.trim() ? '#007bff' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: reflectionText.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              boxShadow: reflectionText.trim() ? '0 2px 8px rgba(0,123,255,0.3)' : 'none'
            }}
          >
            Submit Reflection
          </button>
        </div>

        <p
          style={{
            fontSize: '12px',
            color: '#999',
            textAlign: 'center',
            marginTop: '15px',
            fontStyle: 'italic'
          }}
        >
          Tip: Press Ctrl+Enter to submit
        </p>
      </div>
      ) : (
        <div
          style={{
            background: '#e8f5e9',
            border: '2px solid #4caf50',
            borderRadius: '12px',
            padding: '40px',
            textAlign: 'center'
          }}
        >
          <h3 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#2e7d32',
            marginBottom: '20px'
          }}>
            ✓ Reflection Saved
          </h3>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.7',
            color: '#1b5e20',
            marginBottom: '25px'
          }}>
            Thank you for completing Episode {episodeNumber}.
          </p>

          {/* Navigation buttons */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            {onComplete && (
              <button
                onClick={onComplete}
                style={{
                  padding: '12px 32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(108,117,125,0.3)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#5a6268';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#6c757d';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Back to Episodes
              </button>
            )}
            {onNextEpisode && (
              <button
                onClick={onNextEpisode}
                style={{
                  padding: '12px 32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(0, 123, 255, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#0056b3';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#007bff';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Continue to Episode {episodeNumber + 1} →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReflectionEp4;
