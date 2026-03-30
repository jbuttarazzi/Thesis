import { useState } from 'react';

/**
 * DefinitionSlidesEp5Scene4Intro Component
 *
 * Introduction flashcard for Understanding Your Immigration Documents.
 *
 * Props:
 * - onComplete: Function - Callback when flashcard is viewed
 */
const DefinitionSlidesEp5Scene4Intro = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const definitions = [
    {
      term: 'Understanding Your Immigration Documents',
      definition:
        'As an F-1 student, you will work with several important immigration documents. Understanding what each document does and keeping them safe is critical to maintaining your legal status in the United States.'
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
        Introductory Card
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
          justifyContent: 'flex-end',
          marginTop: '30px',
          gap: '20px'
        }}
      >
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
          Continue →
        </button>
      </div>
    </div>
  );
};

export default DefinitionSlidesEp5Scene4Intro;
