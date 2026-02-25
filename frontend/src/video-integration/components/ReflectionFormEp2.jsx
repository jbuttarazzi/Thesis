import { useState } from 'react';

/**
 * ReflectionFormEp2 Component
 * 
 * Collects student questions about their I-20.
 * Provides a text entry field for students to save their questions
 * for discussion with International Student Services.
 * 
 * Props:
 * - onSubmit: Function - Callback when form is submitted (receives form data)
 */
const ReflectionFormEp2 = ({ onSubmit }) => {
  // Track the question text entered by the user
  const [question, setQuestion] = useState('');
  // Track whether form has been submitted
  const [submitted, setSubmitted] = useState(false);

  /**
   * Handler: Form submission
   * Saves the question and shows confirmation message
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create form data object
    const formData = {
      question: question,
      timestamp: new Date().toISOString()
    };
    
    // Call parent callback with form data
    onSubmit(formData);
    
    // Show confirmation message
    setSubmitted(true);
  };

  /**
   * Handler: Text input change
   * Updates question state as user types
   */
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      padding: '40px 20px',
      maxWidth: '700px',
      margin: '0 auto'
    }}>
      {!submitted ? (
        // Form view - shown before submission
        <>
          {/* Screen title */}
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#007bff',
            marginBottom: '30px',
            textAlign: 'center',
            letterSpacing: '-0.5px'
          }}>
            Your Turn
          </h2>

          {/* Main prompt */}
          <p style={{
            fontSize: '20px',
            lineHeight: '1.6',
            color: '#1a1a1a',
            marginBottom: '15px',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            What questions do you have about your I-20, especially the Program of Study or dates listed?
          </p>

          {/* Subtext - encouraging message */}
          <p style={{
            fontSize: '16px',
            lineHeight: '1.5',
            color: '#666',
            marginBottom: '30px',
            textAlign: 'center',
            fontStyle: 'italic'
          }}>
            Questions are expected. Asking early helps avoid issues later.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Text entry box */}
            <textarea
              value={question}
              onChange={handleQuestionChange}
              placeholder="Enter your questions here..."
              required
              style={{
                width: '100%',
                minHeight: '150px',
                padding: '15px',
                fontSize: '16px',
                fontFamily: 'inherit',
                border: '2px solid #ddd',
                borderRadius: '8px',
                resize: 'vertical',
                marginBottom: '20px',
                lineHeight: '1.6',
                color: '#333'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#007bff';
                e.target.style.outline = 'none';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#ddd';
              }}
            />

            {/* Save button */}
            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                disabled={question.trim().length === 0}
                style={{
                  padding: '14px 32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  fontFamily: 'inherit',
                  background: question.trim().length === 0 ? '#ccc' : '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: question.trim().length === 0 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: question.trim().length === 0 ? 'none' : '0 2px 8px rgba(0,123,255,0.3)'
                }}
                onMouseEnter={(e) => {
                  if (question.trim().length > 0) {
                    e.target.style.background = '#0056b3';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(0,123,255,0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (question.trim().length > 0) {
                    e.target.style.background = '#007bff';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,123,255,0.3)';
                  }
                }}
              >
                Save Question
              </button>
            </div>
          </form>
        </>
      ) : (
        // Confirmation view - shown after submission
        <div style={{
          background: '#e8f5e9',
          border: '2px solid #4caf50',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center'
        }}>
          {/* Success message */}
          <h3 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#2e7d32',
            marginBottom: '20px'
          }}>
            ✓ Question Saved
          </h3>

          {/* Save confirmation message */}
          <p style={{
            fontSize: '18px',
            lineHeight: '1.7',
            color: '#1b5e20',
            marginBottom: '25px'
          }}>
            Your question has been saved. You can discuss it with International Student Services at any time.
          </p>

          {/* Closing message */}
          <p style={{
            fontSize: '16px',
            color: '#2e7d32',
            fontStyle: 'italic',
            fontWeight: '500'
          }}>
            Thank you for completing Episode 2.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReflectionFormEp2;
