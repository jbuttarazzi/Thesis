import { useState } from 'react';

/**
 * filename: InterviewQuizEp3.jsx
 *
 * description: Multiple-choice quiz for Episode 3 visa interview question evaluation.
 */
const InterviewQuizEp3 = ({ onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectFeedback, setShowCorrectFeedback] = useState(false);
  const [showWrongFeedback, setShowWrongFeedback] = useState(false);

  const question = 'What do you plan to do after graduation?';
  const options = [
    { id: 'A', text: 'Return home' },
    { id: 'B', text: 'Stay' }
  ];
  const correctAnswer = 'A';

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);

    if (answerId === correctAnswer) {
      setShowCorrectFeedback(true);
      setShowWrongFeedback(false);
      return;
    }

    setShowCorrectFeedback(false);
    setShowWrongFeedback(true);
  };

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
        maxWidth: '760px',
        margin: '0 auto'
      }}
    >
      <h2
        style={{
          fontSize: '30px',
          fontWeight: '700',
          color: '#007bff',
          marginBottom: '24px',
          textAlign: 'center',
          letterSpacing: '-0.4px'
        }}
      >
        Interview Quiz
      </h2>

      <div
        style={{
          background: 'white',
          border: '2px solid #007bff',
          borderRadius: '14px',
          padding: '30px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <p
          style={{
            fontSize: '23px',
            lineHeight: '1.5',
            color: '#1a1a1a',
            fontWeight: '700',
            marginBottom: '24px',
            textAlign: 'center'
          }}
        >
          "{question}"
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswerSelect(option.id)}
              style={{
                padding: '16px 18px',
                fontSize: '18px',
                fontFamily: 'inherit',
                textAlign: 'left',
                cursor: 'pointer',
                border: selectedAnswer === option.id ? '2px solid #007bff' : '1px solid #ddd',
                borderRadius: '10px',
                background: selectedAnswer === option.id ? '#f5faff' : 'white',
                color: '#1a1a1a',
                fontWeight: selectedAnswer === option.id ? '600' : '500'
              }}
            >
              {option.id.toLowerCase()}. {option.text}
            </button>
          ))}
        </div>
      </div>

      {showCorrectFeedback && (
        <div
          style={{
            marginTop: '20px',
            background: '#e8f5e9',
            border: '2px solid #4caf50',
            borderRadius: '12px',
            padding: '20px'
          }}
        >
          <p
            style={{
              margin: '0 0 10px 0',
              fontSize: '18px',
              fontWeight: '700',
              color: '#1b5e20'
            }}
          >
            Correct.
          </p>
          <p
            style={{
              margin: 0,
              fontSize: '16px',
              lineHeight: '1.7',
              color: '#1b5e20',
              fontWeight: '500'
            }}
          >
            Ensure to show Nonimmigrant intent. This means you are coming to the U.S. temporarily for a specific purpose, which for F-1 students is full time study.
          </p>
        </div>
      )}

      {showWrongFeedback && (
        <p
          style={{
            marginTop: '18px',
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: '600',
            color: '#c62828'
          }}
        >
          Wrong. Try again.
        </p>
      )}

      {showCorrectFeedback && (
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <button
            onClick={handleContinue}
            style={{
              padding: '12px 26px',
              fontSize: '16px',
              fontWeight: '600',
              fontFamily: 'inherit',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,123,255,0.3)'
            }}
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  );
};

export default InterviewQuizEp3;