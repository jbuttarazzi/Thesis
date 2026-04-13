import { useState } from 'react';

/**
 * filename: DefinitionSlidesEp4InterOrient.jsx
 *
 * description: Flashcards for Episode 4 international student orientation requirements.
 */
const DefinitionSlidesEp4InterOrient = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const definitions = [
    {
      term: 'International Student Orientation',
      definition: (
        <div style={{ textAlign: 'center', lineHeight: '1.7' }}>
          <p style={{ marginBottom: '15px' }}>
            International Student Orientation is <strong>mandatory for all F-1 students</strong> and is different from regular campus orientation.
          </p>
          <p style={{ marginBottom: '15px' }}>
            You are required to arrive approximately <strong>2 days earlier</strong> than domestic students to attend this specialized orientation program.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>For more information and dates, visit:</strong>
          </p>
          <a
            href="https://www.hamilton.edu/offices/international-student-services/international-student-orientation"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#007bff',
              textDecoration: 'underline',
              fontSize: '16px',
              fontWeight: '600',
              wordBreak: 'break-word'
            }}
          >
            hamilton.edu/offices/international-student-services/international-student-orientation
          </a>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (onComplete) {
      onComplete();
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

        <div
          style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#333',
            fontWeight: '400'
          }}
        >
          {currentDefinition.definition}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '30px'
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

export default DefinitionSlidesEp4InterOrient;
