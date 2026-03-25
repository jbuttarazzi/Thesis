import { useState } from 'react';

/**
 * DefinitionSlidesEp3 Component
 *
 * Displays Episode 3 visa application flashcards one at a time.
 * Students click through all cards before continuing.
 *
 * Props:
 * - onComplete: Function - Callback when all flashcards are viewed
 */
const DefinitionSlidesEp3 = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const definitions = [
    {
      term: 'SEVIS fee',
      definition:
        'This is a required fee paid to the U.S. government to support the Student and Exchange Visitor Information System. It must be paid before the visa interview.'
    },
    {
      term: 'DS-160',
      definition:
        'This is the online visa application form. It collects biographic, travel, and background information used by the U.S. embassy or consulate.'
    },
    {
      term: 'Visa interview',
      definition:
        'This is a short, in person conversation with a consular officer to determine eligibility for an F-1 visa.'
    }
  ];

  const handleNext = () => {
    if (currentIndex < definitions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
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
          onMouseEnter={(e) => {
            if (currentIndex !== 0) {
              e.target.style.background = '#f5f5f5';
              e.target.style.borderColor = '#999';
            }
          }}
          onMouseLeave={(e) => {
            if (currentIndex !== 0) {
              e.target.style.background = 'white';
              e.target.style.borderColor = '#ddd';
            }
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
          {currentIndex === definitions.length - 1 ? 'Continue →' : 'Next →'}
        </button>
      </div>
    </div>
  );
};

export default DefinitionSlidesEp3;