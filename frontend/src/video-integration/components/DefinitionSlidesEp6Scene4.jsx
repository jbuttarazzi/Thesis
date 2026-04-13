import { useState } from 'react';

/**
 * filename: DefinitionSlidesEp6Scene4.jsx
 *
 * description: Flashcards for Episode 6 residence hall and housing requirements.
 */
const DefinitionSlidesEp6Scene4 = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const definitions = [
    {
      term: 'Campus ID and Access',
      definition: 'Your campus ID connects you to housing access, dining services, campus buildings, and student identification.'
    },
    {
      term: 'Housing Access',
      definition: 'Your ID provides entry to your residence hall and authorized campus buildings. It should not be shared with anyone.'
    },
    {
      term: 'Dining',
      definition: 'Your ID is linked to your meal plan. Misuse can result in conduct concerns.'
    },
    {
      term: 'Campus Safety',
      definition: 'Your ID confirms you are a current student. You may be asked to present it by campus officials.'
    },
    {
      term: 'Student Identification',
      definition: 'Your ID verifies enrollment status for campus services and events.'
    },
    {
      term: 'ISS Reminder',
      definition: 'Protect your ID. Report lost cards immediately.'
    }
  ];

  const handleNext = () => {
    if (currentIndex < definitions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleContinue = () => {
    if (onComplete) {
      onComplete();
    }
  };

  const currentDefinition = definitions[currentIndex];
  const isLastCard = currentIndex === definitions.length - 1;
  const isFirstCard = currentIndex === 0;

  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        padding: '40px 20px',
        maxWidth: '700px',
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
        Campus ID and Access
      </h2>

      <div
        style={{
          background: 'white',
          border: '2px solid #007bff',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          minHeight: '250px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <h3
          style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#007bff',
            marginBottom: '20px',
            textAlign: 'center',
            letterSpacing: '-0.5px'
          }}
        >
          {currentDefinition.term}
        </h3>

        <p
          style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#333',
            textAlign: 'center',
            fontWeight: '400'
          }}
        >
          {currentDefinition.definition}
        </p>
      </div>

      <p
        style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#666',
          marginTop: '20px',
          marginBottom: '30px'
        }}
      >
        Card {currentIndex + 1} of {definitions.length}
      </p>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          marginBottom: '20px'
        }}
      >
        <button
          onClick={handlePrevious}
          disabled={isFirstCard}
          style={{
            padding: '10px 24px',
            fontSize: '14px',
            fontWeight: '600',
            fontFamily: 'inherit',
            background: isFirstCard ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isFirstCard ? 'not-allowed' : 'pointer',
            opacity: isFirstCard ? 0.6 : 1,
            transition: 'all 0.2s'
          }}
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={isLastCard}
          style={{
            padding: '10px 24px',
            fontSize: '14px',
            fontWeight: '600',
            fontFamily: 'inherit',
            background: isLastCard ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isLastCard ? 'not-allowed' : 'pointer',
            opacity: isLastCard ? 0.6 : 1,
            transition: 'all 0.2s'
          }}
        >
          Next
        </button>
      </div>

      {isLastCard && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
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
      )}
    </div>
  );
};

export default DefinitionSlidesEp6Scene4;
