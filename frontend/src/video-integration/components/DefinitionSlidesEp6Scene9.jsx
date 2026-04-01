import { useState } from 'react';

/**
 * DefinitionSlidesEp6Scene9 Component
 *
 * Multi-card flashcard for practical student services (Episode 6, Scene 9).
 *
 * Props:
 * - onComplete: Function - Callback when all cards are viewed and Continue is clicked
 */
const DefinitionSlidesEp6Scene9 = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const definitions = [
    {
      term: 'Obtaining a U.S. Phone Number',
      definition: 'Mobile service providers will be present during orientation and can help you set up your service. Don\'t hesitate to ask people for recommendations and support in choosing the right provider for your needs.'
    },
    {
      term: 'Understanding Basic Banking Practices',
      definition: 'Read up on how banking works in the U.S. Our local NBT bank will come on campus to help you open an account and understand financial services available to international students.'
    },
    {
      term: 'Keeping Contact Information Updated',
      definition: 'Make sure to update your contact information with the College using the Hamilton College directory and with the ISS office. This ensures important communications reach you and your records are current.'
    },
    {
      term: 'ISS Guidance',
      definition: 'Reliable communication and financial organization support your academic success. Staying connected and financially prepared helps you focus on your studies.'
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
        Practical Student Services
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

export default DefinitionSlidesEp6Scene9;
