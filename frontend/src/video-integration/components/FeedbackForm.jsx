import { useState } from 'react';

/**
 * FeedbackForm Component
 * 
 * Reflection form for students to save their thoughts about studying in the U.S.
 * Collects personal reflection with save functionality and confirmation messaging.
 * 
 * Props:
 * - onSubmit: Function - Callback when reflection is saved, receives reflection object
 */
const FeedbackForm = ({ onSubmit }) => {
  // State to manage reflection text
  const [reflection, setReflection] = useState('');
  // State to track if reflection has been saved
  const [isSaved, setIsSaved] = useState(false);
  
  // Character limit for reflection
  const MAX_CHARACTERS = 500;

  /**
   * Handle reflection text changes
   * Updates reflection state and enforces character limit
   */
  const handleChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARACTERS) {
      setReflection(text);
    }
  };

  /**
   * Handle save button click
   * Saves reflection and shows confirmation messages
   */
  const handleSave = (e) => {
    e.preventDefault();
    if (reflection.trim()) {
      onSubmit({ reflection });
      setIsSaved(true);
    }
  };

  return (
    <div className="feedback-form" style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', 
      padding: '40px 20px',
      maxWidth: '700px',
      margin: '0 auto'
    }}>
      {/* Screen Title */}
      <h1 style={{ 
        fontSize: '36px', 
        fontWeight: '700',
        color: '#007bff',
        marginBottom: '30px',
        textAlign: 'center',
        letterSpacing: '-0.5px'
      }}>
        Your Turn
      </h1>

      {!isSaved ? (
        <>
          {/* Main Prompt */}
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '12px',
            textAlign: 'center',
            letterSpacing: '-0.3px'
          }}>
            "What made you apply to study in the United States?"
          </h2>

          {/* Subtext */}
          <p style={{
            fontSize: '16px',
            color: '#666',
            textAlign: 'center',
            marginBottom: '30px',
            fontStyle: 'italic'
          }}>
            There is no right or wrong answer. This reflection is for you.
          </p>

          {/* Reflection Form */}
          <form onSubmit={handleSave}>
            {/* Open text box with character counter */}
            <div style={{ marginBottom: '12px' }}>
              <textarea
                value={reflection}
                onChange={handleChange}
                placeholder="Type your reflection here..."
                rows="8"
                style={{ 
                  width: '100%', 
                  padding: '16px', 
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  border: '2px solid #ddd',
                  borderRadius: '12px',
                  transition: 'border-color 0.2s',
                  outline: 'none',
                  resize: 'vertical',
                  lineHeight: '1.6'
                }}
                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>

            {/* Character counter */}
            <div style={{
              textAlign: 'right',
              fontSize: '14px',
              color: reflection.length >= MAX_CHARACTERS ? '#dc3545' : '#666',
              marginBottom: '20px',
              fontWeight: '500'
            }}>
              {reflection.length} / {MAX_CHARACTERS} characters
            </div>

            {/* Save button */}
            <button 
              type="submit"
              disabled={!reflection.trim()}
              style={{ 
                width: '100%',
                padding: '16px 32px',
                fontSize: '18px',
                fontWeight: '600',
                fontFamily: 'inherit',
                background: reflection.trim() ? '#007bff' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: reflection.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                boxShadow: reflection.trim() ? '0 2px 8px rgba(0,123,255,0.3)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (reflection.trim()) {
                  e.target.style.background = '#0056b3';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0,123,255,0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (reflection.trim()) {
                  e.target.style.background = '#007bff';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0,123,255,0.3)';
                }
              }}
            >
              Save Reflection
            </button>
          </form>
        </>
      ) : (
        <>
          {/* Save Confirmation Message */}
          <div style={{
            background: '#d4edda',
            border: '2px solid #28a745',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '48px',
              color: '#28a745',
              marginBottom: '12px',
              lineHeight: '1'
            }}>
              ✓
            </div>
            <p style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#155724',
              marginBottom: '8px'
            }}>
              Your reflection has been saved.
            </p>
            <p style={{
              fontSize: '15px',
              color: '#155724'
            }}>
              You can return to it at any time.
            </p>
          </div>

          {/* ISS Closing Message */}
          <div style={{
            background: '#f8f9fa',
            border: '2px solid #007bff',
            borderRadius: '12px',
            padding: '24px',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#007bff',
              marginBottom: '12px',
              letterSpacing: '-0.2px'
            }}>
              International Student Services
            </p>
            <p style={{
              fontSize: '16px',
              color: '#333',
              lineHeight: '1.6'
            }}>
              Your reasons matter. We will help you navigate the process ahead.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default FeedbackForm;
