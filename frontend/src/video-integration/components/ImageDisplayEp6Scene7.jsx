import React from 'react';

/**
 * filename: ImageDisplayEp6Scene7.jsx
 *
 * description: Image display component for Episode 6 Scene 7 (Campus Safety).
 */
const ImageDisplayEp6Scene7 = ({ onComplete }) => {
  const handleContinue = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        padding: '40px 20px',
        maxWidth: '800px',
        margin: '0 auto'
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '30px',
          fontSize: '28px'
        }}
      >
        Campus Safety
      </h2>

      <div
        style={{
          textAlign: 'center',
          marginBottom: '30px'
        }}
      >
        <img
          src="/Videos/Episode6/scene7.png"
          alt="Campus Safety"
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <button
          onClick={handleContinue}
          style={{
            padding: '12px 32px',
            fontSize: '16px',
            fontWeight: '600',
            fontFamily: 'inherit',
            background: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 2px 8px rgba(76,175,80,0.3)'
          }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default ImageDisplayEp6Scene7;
