import { useState } from 'react';

/**
 * DefinitionSlidesEp4FamilyGuests Component
 *
 * Family and guests policy flashcards for Episode 4.
 *
 * Props:
 * - onComplete: Function - Callback when all flashcards are viewed
 */
const DefinitionSlidesEp4FamilyGuests = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const definitions = [
    {
      term: 'Family and Guests',
      definition:
        'Due to liability and insurance requirements, Hamilton College is unable to provide lodging or transportation for family members or guests.'
    },
    {
      term: 'Independent Arrangements',
      definition: 'We encourage families to make independent travel and lodging arrangements if they plan to accompany you.'
    }
  ];

  const handleNext = () => {
    if (currentIndex < definitions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      return;
    }

    if (onComplete) {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentDefinition = definitions[currentIndex];

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
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '14px',
          color: '#666',
          fontWeight: '500'
        }}
      >
        {currentIndex + 1} of {definitions.length}
      </div>

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
        <h2
          style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#007bff',
            marginBottom: '20px',
            textAlign: 'center',
            letterSpacing: '-0.5px'
          }}
        >
          {currentDefinition.term}
        </h2>

        <p
          style={{
            fontSize: '18px',
            lineHeight: '1.7',
            color: '#333',
            textAlign: 'center',
            fontWeight: '400'
          }}
        >
          {currentDefinition.definition}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '30px',
          gap: '20px'
        }}
      >
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600',
            fontFamily: 'inherit',
            background: currentIndex === 0 ? '#f0f0f0' : 'white',
            color: currentIndex === 0 ? '#999' : '#333',
            border: '2px solid #ddd',
            borderRadius: '8px',
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            opacity: currentIndex === 0 ? 0.5 : 1
          }}
        >
          ← Previous
        </button>

        <button
          onClick={handleNext}
          style={{
            padding: '12px 32px',
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
        >
          {currentIndex === definitions.length - 1 ? 'Continue →' : 'Next →'}
        </button>
      </div>
    </div>
  );
};

export default DefinitionSlidesEp4FamilyGuests;
