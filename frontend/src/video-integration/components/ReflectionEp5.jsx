import { useState } from 'react';

/**
 * filename: ReflectionEp5.jsx
 *
 * description: Text reflection form for Episode 5 with completion screen and continue button.
 */
const ReflectionEp5 = ({ onComplete, onNextEpisode, episodeNumber = 5 }) => {
  const [reflectionText, setReflectionText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (reflectionText.trim()) {
      setSubmitted(true);
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
      {!submitted ? (
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
            What is one responsibility you will take seriously this semester?
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
            textAlign: 'center',
            padding: '40px 20px'
          }}
        >
          <h2
            style={{
              fontSize: '36px',
              fontWeight: '700',
              color: '#4caf50',
              marginBottom: '20px',
              fontFamily: 'inherit'
            }}
          >
            Episode 5 Complete!
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: '#333',
              lineHeight: '1.7',
              fontFamily: 'inherit',
              marginBottom: '30px'
            }}
          >
            International Student Orientation is required. Staying informed, checking your email, and asking questions are part of maintaining your status and your success.
          </p>
          <div
            style={{
              backgroundColor: '#e8f5e9',
              border: '2px solid #4caf50',
              borderRadius: '8px',
              padding: '20px',
              marginTop: '30px'
            }}
          >
            <p
              style={{
                fontSize: '16px',
                color: '#2e7d32',
                fontFamily: 'inherit',
                margin: 0
              }}
            >
              ✓ Great job completing Episode 5! You now have a solid understanding of international student orientation and the importance of maintaining your immigration status.
            </p>
          </div>
          <div
            style={{
              marginTop: '30px',
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <button
              onClick={onComplete}
              style={{
                padding: '12px 32px',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: 'inherit',
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(108,117,125,0.3)'
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
            {onNextEpisode && (
              <button
                onClick={onNextEpisode}
                style={{
                  padding: '12px 32px',
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

export default ReflectionEp5;
