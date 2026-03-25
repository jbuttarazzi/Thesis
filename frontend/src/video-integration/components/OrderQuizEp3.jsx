import { useState } from 'react';

/**
 * OrderQuizEp3 Component
 *
 * Scene 4 rearrangement quiz for visa application steps.
 * Learners reorder the steps and check their answer.
 *
 * Props:
 * - onComplete: Function - Optional callback when the correct order is submitted
 */
const OrderQuizEp3 = ({ onComplete }) => {
  const [steps, setSteps] = useState([
    'Complete DS-160',
    'Schedule visa interview',
    'Pay SEVIS fee'
  ]);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const correctOrder = [
    'Pay SEVIS fee',
    'Complete DS-160',
    'Schedule visa interview'
  ];

  const moveUp = (index) => {
    if (index === 0) {
      return;
    }

    const updated = [...steps];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setSteps(updated);
    setFeedback('');
    setIsCorrect(false);
  };

  const moveDown = (index) => {
    if (index === steps.length - 1) {
      return;
    }

    const updated = [...steps];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setSteps(updated);
    setFeedback('');
    setIsCorrect(false);
  };

  const handleCheckAnswer = () => {
    const correct = steps.every((step, idx) => step === correctOrder[idx]);

    if (correct) {
      setIsCorrect(true);
      setFeedback('Correct! Great job ordering the visa application steps.');
      return;
    }

    setIsCorrect(false);
    setFeedback('Wrong. Try again: think about which step must happen before the interview.');
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
          fontSize: '32px',
          fontWeight: '700',
          color: '#007bff',
          marginBottom: '12px',
          textAlign: 'center',
          letterSpacing: '-0.5px'
        }}
      >
        VISA APPLICATION ORDER QUIZ
      </h2>

      <p
        style={{
          fontSize: '17px',
          color: '#333',
          textAlign: 'center',
          marginBottom: '28px',
          lineHeight: '1.6'
        }}
      >
        Rearrange the steps into the correct order. Use the arrow buttons to move each item.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {steps.map((step, index) => (
          <div
            key={step}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px',
              padding: '16px 18px',
              border: '2px solid #ddd',
              borderRadius: '10px',
              background: 'white',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ fontSize: '17px', color: '#1a1a1a', fontWeight: '500' }}>
              {index + 1}. {step}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => moveUp(index)}
                disabled={index === 0 || isCorrect}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  background: index === 0 || isCorrect ? '#f0f0f0' : 'white',
                  color: index === 0 || isCorrect ? '#999' : '#333',
                  cursor: index === 0 || isCorrect ? 'not-allowed' : 'pointer',
                  fontWeight: '600'
                }}
              >
                ↑
              </button>

              <button
                onClick={() => moveDown(index)}
                disabled={index === steps.length - 1 || isCorrect}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  background: index === steps.length - 1 || isCorrect ? '#f0f0f0' : 'white',
                  color: index === steps.length - 1 || isCorrect ? '#999' : '#333',
                  cursor: index === steps.length - 1 || isCorrect ? 'not-allowed' : 'pointer',
                  fontWeight: '600'
                }}
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <button
          onClick={handleCheckAnswer}
          disabled={isCorrect}
          style={{
            padding: '12px 26px',
            fontSize: '16px',
            fontWeight: '600',
            fontFamily: 'inherit',
            background: isCorrect ? '#f0f0f0' : '#007bff',
            color: isCorrect ? '#999' : 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isCorrect ? 'not-allowed' : 'pointer',
            boxShadow: isCorrect ? 'none' : '0 2px 8px rgba(0,123,255,0.3)'
          }}
        >
          Check Answer
        </button>
      </div>

      {feedback && (
        <p
          style={{
            marginTop: '18px',
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: '600',
            color: isCorrect ? '#2e7d32' : '#c62828'
          }}
        >
          {feedback}
        </p>
      )}

      {isCorrect && (
        <div style={{ textAlign: 'center', marginTop: '18px' }}>
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

export default OrderQuizEp3;