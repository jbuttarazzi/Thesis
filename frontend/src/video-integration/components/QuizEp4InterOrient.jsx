import { useState } from 'react';

/**
 * filename: QuizEp4InterOrient.jsx
 *
 * description: Multiple-choice quiz for Episode 4 about international student orientation.
 */
const QuizEp4InterOrient = ({ onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const question = 'Which of the following is true about International Student Orientation?';
  const answers = [
    { 
      id: 'A', 
      text: 'It is optional and same as regular campus orientation.', 
      correct: false 
    },
    { 
      id: 'B', 
      text: 'It is mandatory and requires F-1 students to arrive about 2 days earlier than domestic students.', 
      correct: true 
    },
    { 
      id: 'C', 
      text: 'It only takes place on the first day of campus.', 
      correct: false 
    },
    { 
      id: 'D', 
      text: 'It is the same timing as regular orientation.', 
      correct: false 
    }
  ];

  const correctExplanation = 'Correct! International Student Orientation is mandatory for all F-1 students and differs from regular campus orientation. You must arrive about 2 days earlier to participate in this specialized program.';
  const incorrectExplanation = 'Incorrect. International Student Orientation is mandatory for all F-1 students, and you are required to arrive approximately 2 days earlier than domestic students. It is a distinct program from regular campus orientation.';

  const handleAnswerClick = (answerId) => {
    setSelectedAnswer(answerId);
    setShowFeedback(true);
  };

  const handleContinue = () => {
    if (onComplete) {
      onComplete();
    }
  };

  const isCorrect = answers.find((a) => a.id === selectedAnswer)?.correct;

  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        padding: '40px 20px',
        maxWidth: '700px',
        margin: '0 auto'
      }}
    >
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
          {question}
        </h2>

        <div style={{ marginBottom: '30px' }}>
          {answers.map((answer) => (
            <button
              key={answer.id}
              onClick={() => handleAnswerClick(answer.id)}
              disabled={showFeedback}
              style={{
                display: 'block',
                width: '100%',
                padding: '15px 20px',
                marginBottom: '12px',
                textAlign: 'left',
                fontSize: '16px',
                fontWeight: '500',
                fontFamily: 'inherit',
                border: '2px solid #ddd',
                borderRadius: '8px',
                backgroundColor:
                  selectedAnswer === answer.id
                    ? isCorrect
                      ? '#e8f5e9'
                      : '#ffebee'
                    : 'white',
                borderColor:
                  selectedAnswer === answer.id
                    ? isCorrect
                      ? '#4caf50'
                      : '#f44336'
                    : '#ddd',
                color: '#333',
                cursor: showFeedback ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!showFeedback) {
                  e.target.style.borderColor = '#007bff';
                  e.target.style.backgroundColor = '#f0f8ff';
                }
              }}
              onMouseLeave={(e) => {
                if (!showFeedback) {
                  e.target.style.borderColor = '#ddd';
                  e.target.style.backgroundColor = 'white';
                }
              }}
            >
              <strong>{answer.id}.</strong> {answer.text}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div
            style={{
              padding: '20px',
              borderRadius: '8px',
              marginTop: '20px',
              backgroundColor: isCorrect ? '#e8f5e9' : '#ffebee',
              border: `2px solid ${isCorrect ? '#4caf50' : '#f44336'}`,
              marginBottom: '20px'
            }}
          >
            <p
              style={{
                fontSize: '16px',
                color: isCorrect ? '#2e7d32' : '#c62828',
                margin: '0 0 10px 0',
                fontWeight: '600'
              }}
            >
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </p>
            <p
              style={{
                fontSize: '16px',
                color: isCorrect ? '#2e7d32' : '#c62828',
                margin: 0,
                lineHeight: '1.6'
              }}
            >
              {isCorrect ? correctExplanation : incorrectExplanation}
            </p>
          </div>
        )}
      </div>

      {showFeedback && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button
            onClick={handleContinue}
            style={{
              padding: '12px 40px',
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
      )}
    </div>
  );
};

export default QuizEp4InterOrient;
