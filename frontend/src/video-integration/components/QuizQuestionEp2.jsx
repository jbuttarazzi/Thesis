import { useState } from 'react';

/**
 * QuizQuestionEp2 Component
 * 
 * Interactive quiz question for Episode 2.
 * Asks "Who is responsible for keeping copies of the I-20?"
 * Provides feedback when the correct answer is selected.
 * 
 * Props:
 * - onComplete: Function - Callback when user completes the quiz
 */
const QuizQuestionEp2 = ({ onComplete }) => {
  // Track whether an answer has been selected
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // Track whether the correct answer was chosen
  const [showFeedback, setShowFeedback] = useState(false);

  // Quiz data
  const question = "Who is responsible for keeping copies of the I-20?";
  const options = [
    { id: 'A', text: 'The student only' },
    { id: 'B', text: 'The school only' },
    { id: 'C', text: 'Both the student and the school' }
  ];
  const correctAnswer = 'C';
  const feedback = "The school must retain copies as part of federal compliance requirements. Students should keep copies for personal records, travel, employment, and future immigration use.";
  const narration = "This isn't just paperwork. It is a shared responsibility.";

  /**
   * Handler: User selects an answer
   * Shows feedback for both correct and incorrect answers
   */
  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
    setShowFeedback(true);
  };

  /**
   * Handler: User clicks continue after viewing feedback
   * Proceeds to next step
   */
  const handleContinue = () => {
    onComplete();
  };

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      padding: '40px 20px',
      maxWidth: '700px',
      margin: '0 auto'
    }}>
      {/* Screen title */}
      <h2 style={{
        fontSize: '32px',
        fontWeight: '700',
        color: '#007bff',
        marginBottom: '40px',
        textAlign: 'center',
        letterSpacing: '-0.5px'
      }}>
        RESPONSIBILITY CHECK
      </h2>

      {/* Subtitle */}
      <h3 style={{
        fontSize: '24px',
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: '30px',
        textAlign: 'center',
        letterSpacing: '-0.3px'
      }}>
        Who Keeps What
      </h3>

      {/* Question */}
      <div style={{
        background: 'white',
        border: '2px solid #007bff',
        borderRadius: '16px',
        padding: '30px',
        marginBottom: '30px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <p style={{
          fontSize: '20px',
          lineHeight: '1.6',
          color: '#333',
          textAlign: 'center',
          fontWeight: '600',
          marginBottom: '30px'
        }}>
          {question}
        </p>

        {/* Answer options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswerSelect(option.id)}
              disabled={showFeedback}
              style={{
                padding: '18px 24px',
                fontSize: '18px',
                fontFamily: 'inherit',
                textAlign: 'left',
                cursor: showFeedback ? 'default' : 'pointer',
                border: selectedAnswer === option.id 
                  ? '3px solid #007bff' 
                  : '2px solid #ddd',
                borderRadius: '10px',
                background: selectedAnswer === option.id 
                  ? (option.id === correctAnswer ? '#e8f5e9' : '#fff3e0')
                  : 'white',
                color: '#1a1a1a',
                transition: 'all 0.2s',
                fontWeight: selectedAnswer === option.id ? '600' : '400',
                opacity: showFeedback && selectedAnswer !== option.id ? 0.5 : 1
              }}
              onMouseEnter={(e) => {
                if (!showFeedback && selectedAnswer !== option.id) {
                  e.target.style.background = '#f5f5f5';
                  e.target.style.borderColor = '#999';
                }
              }}
              onMouseLeave={(e) => {
                if (!showFeedback && selectedAnswer !== option.id) {
                  e.target.style.background = 'white';
                  e.target.style.borderColor = '#ddd';
                }
              }}
            >
              <span style={{ fontWeight: '700', marginRight: '12px' }}>{option.id}.</span>
              {option.text}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback section - shown after any answer selected */}
      {showFeedback && (
        <div style={{
          background: selectedAnswer === correctAnswer ? '#e8f5e9' : '#ffebee',
          border: `2px solid ${selectedAnswer === correctAnswer ? '#4caf50' : '#f44336'}`,
          borderRadius: '12px',
          padding: '25px',
          marginBottom: '25px'
        }}>
          {/* Feedback label */}
          <p style={{
            fontSize: '18px',
            fontWeight: '700',
            color: selectedAnswer === correctAnswer ? '#1b5e20' : '#c62828',
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            {selectedAnswer === correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
          </p>

          {/* Explanation text */}
          <p style={{
            fontSize: '17px',
            lineHeight: '1.7',
            color: selectedAnswer === correctAnswer ? '#1b5e20' : '#b71c1c',
            marginBottom: '20px',
            fontWeight: '500'
          }}>
            {feedback}
          </p>

          {/* Mei's narration */}
          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            color: selectedAnswer === correctAnswer ? '#2e7d32' : '#d32f2f',
            fontStyle: 'italic',
            fontWeight: '600',
            textAlign: 'center',
            borderTop: selectedAnswer === correctAnswer ? '1px solid #81c784' : '1px solid #ef9a9a',
            paddingTop: '20px'
          }}>
            "{narration}"
          </p>
        </div>
      )}

      {/* Continue button - only shown after correct answer */}
      {showFeedback && (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleContinue}
            style={{
              padding: '14px 32px',
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
            Continue →
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizQuestionEp2;
