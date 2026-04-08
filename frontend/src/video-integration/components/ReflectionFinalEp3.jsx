import { useState } from 'react';

/**
 * ReflectionFinalEp3 Component
 *
 * Final reflection prompt and closing message for Episode 3.
 */
const ReflectionFinalEp3 = ({ onNextEpisode, episodeNumber = 3 }) => {
  const [reflection, setReflection] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const MAX_CHARACTERS = 500;

  const handleChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARACTERS) {
      setReflection(text);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (reflection.trim()) {
      setIsSaved(true);
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
      <h1
        style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#007bff',
          marginBottom: '26px',
          textAlign: 'center',
          letterSpacing: '-0.5px'
        }}
      >
        REFLECTION
      </h1>

      {!isSaved ? (
        <>
          <h2
            style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '12px',
              textAlign: 'center'
            }}
          >
            Your Turn
          </h2>

          <p
            style={{
              fontSize: '22px',
              lineHeight: '1.55',
              color: '#1a1a1a',
              fontWeight: '600',
              textAlign: 'center',
              marginBottom: '10px'
            }}
          >
            "What part of the visa process are you most curious or nervous about?"
          </p>

          <p
            style={{
              fontSize: '16px',
              color: '#666',
              textAlign: 'center',
              marginBottom: '26px',
              fontStyle: 'italic'
            }}
          >
            Being prepared includes acknowledging your concerns.
          </p>

          <form onSubmit={handleSave}>
            <textarea
              value={reflection}
              onChange={handleChange}
              placeholder="Type your reflection here..."
              rows="8"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '16px',
                fontFamily: 'inherit',
                border: '2px solid #ddd',
                borderRadius: '12px',
                outline: 'none',
                resize: 'vertical',
                lineHeight: '1.6'
              }}
            />

            <div
              style={{
                textAlign: 'right',
                fontSize: '14px',
                color: reflection.length >= MAX_CHARACTERS ? '#dc3545' : '#666',
                marginTop: '10px',
                marginBottom: '18px',
                fontWeight: '500'
              }}
            >
              {reflection.length} / {MAX_CHARACTERS} characters
            </div>

            <button
              type="submit"
              disabled={!reflection.trim()}
              style={{
                width: '100%',
                padding: '16px 32px',
                fontSize: '18px',
                fontWeight: '600',
                fontFamily: 'inherit',
                background: reflection.trim() ? '#007bff' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: reflection.trim() ? 'pointer' : 'not-allowed'
              }}
            >
              Save Reflection
            </button>
          </form>
        </>
      ) : (
        <div
          style={{
            background: '#e8f5e9',
            border: '2px solid #4caf50',
            borderRadius: '12px',
            padding: '26px',
            textAlign: 'center'
          }}
        >
          <p
            style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#1b5e20',
              margin: '0 0 12px 0'
            }}
          >
            ISS Closing Message
          </p>

          <p
            style={{
              fontSize: '18px',
              lineHeight: '1.7',
              color: '#1b5e20',
              margin: '0 0 24px 0',
              fontWeight: '600'
            }}
          >
            "You are prepared. And you are not doing this alone."
          </p>

          {/* Continue to next episode button */}
          {onNextEpisode && (
            <button
              onClick={onNextEpisode}
              style={{
                padding: '14px 40px',
                fontSize: '16px',
                fontWeight: '600',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 123, 255, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#0056b3';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#007bff';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 8px rgba(0, 123, 255, 0.3)';
              }}
            >
              Continue to Episode {episodeNumber + 1} →
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ReflectionFinalEp3;