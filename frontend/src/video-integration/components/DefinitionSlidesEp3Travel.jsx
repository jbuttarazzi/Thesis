import { useState } from 'react';

/**
 * filename: DefinitionSlidesEp3Travel.jsx
 *
 * description: Flashcards for Episode 3 travel timing and documentation requirements.
 */
const DefinitionSlidesEp3Travel = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const definitions = [
    {
      term: 'Entry window',
      definition:
        'F-1 students may enter the U.S. up to 30 days before the program start date listed on the I-20.'
    },
    {
      term: 'Port of entry',
      definition:
        'This is the airport or border crossing where you enter the U.S. and speak with a Customs and Border Protection officer.'
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
      <h2
        style={{
          fontSize: '30px',
          fontWeight: '700',
          color: '#007bff',
          marginBottom: '18px',
          textAlign: 'center',
          letterSpacing: '-0.4px'
        }}
      >
        When Can I Travel
      </h2>

      <div
        style={{
          textAlign: 'center',
          marginBottom: '24px',
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
          minHeight: '240px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <h3
          style={{
            fontSize: '30px',
            fontWeight: '700',
            color: '#007bff',
            marginBottom: '18px',
            textAlign: 'center'
          }}
        >
          {currentDefinition.term}
        </h3>

        <p
          style={{
            fontSize: '18px',
            lineHeight: '1.7',
            color: '#333',
            textAlign: 'center',
            margin: 0
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
          marginTop: '24px',
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
            boxShadow: '0 2px 8px rgba(0,123,255,0.3)'
          }}
        >
          {currentIndex === definitions.length - 1 ? 'Continue →' : 'Next →'}
        </button>
      </div>
    </div>
  );
};

export default DefinitionSlidesEp3Travel;