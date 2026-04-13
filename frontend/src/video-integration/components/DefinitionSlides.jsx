import { useState } from 'react';

/**
 * filename: DefinitionSlides.jsx
 * 
 * description: Flashcard slideshow for Episode 1 definitions. One definition at a time with navigation.
 * 
 */
const DefinitionSlides = ({ onComplete }) => {
  // Track current definition being displayed (0-indexed)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of definitions with terms and explanations
  const definitions = [
    {
      term: 'I-20',
      definition: 'This is an official document issued by the school that allows you to apply for an F-1 visa and enter the U.S. as a student. It stays important throughout your time in the United States.'
    },
    {
      term: 'F-1 Status',
      definition: 'This is your legal student status in the U.S. It comes with certain benefits and responsibilities, such as full-time enrollment and following employment rules.'
    },
    {
      term: 'International Student Services',
      definition: 'This is the campus office that supports international students with immigration matters, orientation, advising, and overall wellbeing. You will work closely with this office during your time here.'
    },
    {
      term: 'Admission',
      definition: 'This means the school has offered you a place academically. Immigration steps come next.'
    },
    {
      term: 'Enrollment',
      definition: 'This happens when you officially accept the offer and register for classes.'
    },
    {
      term: 'Sponsorship',
      definition: 'This means the school agrees to support your F-1 student status while you are enrolled.'
    }
  ];

  /**
   * Handler: Move to next definition
   * If on last definition, call onComplete callback
   */
  const handleNext = () => {
    if (currentIndex < definitions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // All definitions viewed, proceed to next step
      onComplete();
    }
  };

  /**
   * Handler: Move to previous definition
   * Only available if not on first definition
   */
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Current definition being displayed
  const currentDefinition = definitions[currentIndex];

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      padding: '40px 20px',
      maxWidth: '700px',
      margin: '0 auto'
    }}>
      {/* Progress indicator */}
      <div style={{
        textAlign: 'center',
        marginBottom: '30px',
        fontSize: '14px',
        color: '#666',
        fontWeight: '500'
      }}>
        {currentIndex + 1} of {definitions.length}
      </div>

      {/* Definition card */}
      <div style={{
        background: 'white',
        border: '2px solid #007bff',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        minHeight: '250px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {/* Term heading */}
        <h2 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#007bff',
          marginBottom: '20px',
          textAlign: 'center',
          letterSpacing: '-0.5px'
        }}>
          {currentDefinition.term}
        </h2>

        {/* Definition text */}
        <p style={{
          fontSize: '18px',
          lineHeight: '1.7',
          color: '#333',
          textAlign: 'center',
          fontWeight: '400'
        }}>
          {currentDefinition.definition}
        </p>
      </div>

      {/* Navigation buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '30px',
        gap: '20px'
      }}>
        {/* Previous button - only show if not on first definition */}
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

        {/* Next/Continue button */}
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

export default DefinitionSlides;
