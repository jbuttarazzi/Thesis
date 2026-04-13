/**
 * filename: InterviewQuestionCardEp3.jsx
 *
 * description: Displays common visa interview question with example responses.
 */
const InterviewQuestionCardEp3 = ({ onComplete }) => {
  const answerThemes = [
    'Academic reasons',
    'Learning environment',
    'Long term goals'
  ];

  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        padding: '40px 20px',
        maxWidth: '760px',
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
        Interview Practice
      </h2>

      <div
        style={{
          background: 'white',
          border: '2px solid #007bff',
          borderRadius: '14px',
          padding: '32px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <p
          style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#555',
            textTransform: 'uppercase',
            letterSpacing: '0.6px',
            marginBottom: '12px'
          }}
        >
          Interviewer Question
        </p>

        <p
          style={{
            fontSize: '24px',
            lineHeight: '1.5',
            color: '#1a1a1a',
            fontWeight: '700',
            marginBottom: '26px'
          }}
        >
          "Why did you pick this school?"
        </p>

        <div
          style={{
            background: '#f7fbff',
            border: '1px solid #cfe5ff',
            borderRadius: '10px',
            padding: '16px 18px',
            marginBottom: '20px'
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '16px',
              color: '#174a7c',
              fontWeight: '600'
            }}
          >
            Any one of these works:
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {answerThemes.map((theme) => (
            <div
              key={theme}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '14px 16px',
                background: '#fff'
              }}
            >
              <p style={{ margin: 0, fontSize: '18px', color: '#222', fontWeight: '500' }}>
                - {theme}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '22px' }}>
          <button
            onClick={onComplete}
            style={{
              padding: '12px 26px',
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
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewQuestionCardEp3;