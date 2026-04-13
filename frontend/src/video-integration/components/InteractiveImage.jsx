import { useState } from 'react';

/**
 * filename: InteractiveImage.jsx
 * 
 * description: Full-screen scene image viewer with Continue button. Used for background context in episodes.
 * 
 */
const InteractiveImage = ({ src, onComplete }) => {
  return (
    <div className="interactive-image-container" style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      padding: '20px',
      textAlign: 'center'
    }}>
      {/* Container for the scene image */}
      <div style={{ display: 'inline-block' }}>
        {/* Main scene image with highlighted elements */}
        <img 
          src={src} 
          alt="Scene" 
          style={{ 
            maxWidth: '800px', 
            width: '100%', 
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }} 
        />
      </div>

      {/* Continue button to proceed to definitions */}
      <button 
        onClick={onComplete}
        style={{ 
          marginTop: '24px', 
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

export default InteractiveImage;
