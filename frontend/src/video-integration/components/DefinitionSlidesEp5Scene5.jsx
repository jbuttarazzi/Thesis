import { useState } from 'react';

/**
 * DefinitionSlidesEp5Scene5 Component
 *
 * Understanding immigration documents flashcards for Episode 5, Scene 5.
 *
 * Props:
 * - onComplete: Function - Callback when all flashcards are viewed
 */
const DefinitionSlidesEp5Scene5 = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const definitions = [
    {
      term: 'Passport',
      definition:
        'Your passport must always be valid while you are in the United States. It should generally be valid at least six months into the future. Your passport is issued by your home country and confirms your identity and nationality.'
    },
    {
      term: 'Visa',
      definition:
        'Your F-1 visa is a travel document placed in your passport. It allows you to request entry to the United States. The expiration date on your visa does not determine how long you may stay in the U.S.'
    },
    {
      term: 'Form I-20',
      definition:
        'The I-20 is issued by Hamilton College and confirms that you are sponsored by the College in F-1 status. It lists your program, major, and program dates. You must keep all I-20s issued to you and carry the most recent one when traveling.'
    },
    {
      term: 'Form I-94',
      definition:
        'The I-94 record shows your most recent entry into the United States and confirms your immigration status and admission period. F-1 students are typically admitted for duration of status. You should download and save a copy after each entry.'
    },
    {
      term: 'ISS Reminder',
      definition:
        'These documents work together. You are responsible for understanding them and keeping copies in a safe place.'
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

export default DefinitionSlidesEp5Scene5;
