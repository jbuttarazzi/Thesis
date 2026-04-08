import { useState } from 'react';

/**
 * ReflectionEp6 Component
 *
 * Final reflection for Episode 6 (Contact and Reporting Requirements).
 *
 * Props:
 * - onComplete: Function - Callback when reflection is completed
 * - onNextEpisode: Function (optional) - Callback to proceed to next episode
 */
const ReflectionEp6 = ({ onComplete, onNextEpisode }) => {
  const [reflectionText, setReflectionText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (reflectionText.trim()) {
      setSubmitted(true);
    }
  };

  const handleBackToEpisodes = () => {
    if (onComplete) {
      onComplete();
    }
  };

  const handleCancel = () => {
    setReflectionText('');
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
              marginBottom: '10px',
              textAlign: 'center',
              letterSpacing: '-0.5px'
            }}
          >
            Reflection
          </h2>

          <p
            style={{
              fontSize: '16px',
              color: '#666',
              textAlign: 'center',
              marginBottom: '30px',
              fontStyle: 'italic'
            }}
          >
            Take a moment to reflect on your learning.
          </p>

          <p
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '20px',
              textAlign: 'center'
            }}
          >
            What is one system you will take seriously to protect your status and success?
          </p>

          <textarea
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            placeholder="Share your thoughts here..."
            style={{
              width: '100%',
              borderRadius: '8px',
              borderColor: '#ddd',
              border: '2px solid #ddd',
              padding: '15px',
              fontSize: '16px',
              fontFamily: 'inherit',
              minHeight: '150px',
              resize: 'vertical',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#007bff';
              e.target.style.outline = 'none';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#ddd';
            }}
          />

          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              marginTop: '30px'
            }}
          >
            <button
              onClick={handleCancel}
              style={{
                padding: '10px 24px',
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: 'inherit',
                background: '#f0f0f0',
                color: '#333',
                border: '2px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e0e0e0';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f0f0f0';
              }}
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={!reflectionText.trim()}
              style={{
                padding: '10px 24px',
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: 'inherit',
                background: reflectionText.trim() ? '#4caf50' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: reflectionText.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                opacity: reflectionText.trim() ? 1 : 0.6
              }}
              onMouseEnter={(e) => {
                if (reflectionText.trim()) {
                  e.target.style.backgroundColor = '#45a049';
                }
              }}
              onMouseLeave={(e) => {
                if (reflectionText.trim()) {
                  e.target.style.backgroundColor = '#4caf50';
                }
              }}
            >
              Save Response
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            background: '#e8f5e9',
            border: '2px solid #4caf50',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 4px 12px rgba(76,175,80,0.2)',
            textAlign: 'center'
          }}
        >
          <h2
            style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#2e7d32',
              marginBottom: '20px',
              letterSpacing: '-0.5px'
            }}
          >
            ✓ Response Saved
          </h2>

          <p
            style={{
              fontSize: '18px',
              color: '#2e7d32',
              marginBottom: '30px',
              lineHeight: '1.6'
            }}
          >
            Thank you for completing Episode 6!
          </p>

          <div
            style={{
              background: '#f0f8ff',
              border: '2px solid #007bff',
              borderRadius: '12px',
              padding: '25px',
              marginBottom: '30px'
            }}
          >
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#007bff',
                marginBottom: '15px',
                textAlign: 'center'
              }}
            >
              ISS Guidance
            </h3>
            <p
              style={{
                fontSize: '16px',
                color: '#333',
                margin: 0,
                lineHeight: '1.7',
                textAlign: 'center'
              }}
            >
              Strong foundations support successful transitions. Daily responsibilities protect your status and your future.
            </p>
          </div>

          <button
            onClick={handleBackToEpisodes}
            style={{
              padding: '12px 40px',
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
              e.target.style.backgroundColor = '#0056b3';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#007bff';
            }}
          >
            Back to Episodes
          </button>
        </div>
      )}
    </div>
  );
};

export default ReflectionEp6;
