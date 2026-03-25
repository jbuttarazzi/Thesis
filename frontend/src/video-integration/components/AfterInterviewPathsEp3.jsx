/**
 * AfterInterviewPathsEp3 Component
 *
 * Displays post-interview outcomes in a tree-style layout.
 */
const AfterInterviewPathsEp3 = ({ onComplete }) => {
  const outcomes = [
    {
      title: 'Visa approved',
      text: 'Your passport will be returned with an F-1 visa. You may use it to request entry to the U.S. within the allowed timeframe.',
      borderColor: '#2e7d32',
      background: '#f1fbf3'
    },
    {
      title: 'Administrative processing',
      text: 'This means additional review is required. It is common and does not mean denial.',
      borderColor: '#1565c0',
      background: '#f2f8ff'
    },
    {
      title: 'Visa decision delayed',
      text: 'This means the consular officer needs more time or documents before making a decision.',
      borderColor: '#ef6c00',
      background: '#fff8f1'
    }
  ];

  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        padding: '40px 20px',
        maxWidth: '860px',
        margin: '0 auto'
      }}
    >
      <h2
        style={{
          fontSize: '30px',
          fontWeight: '700',
          color: '#007bff',
          textAlign: 'center',
          marginBottom: '22px',
          letterSpacing: '-0.4px'
        }}
      >
        After Interview: Possible Paths
      </h2>

      <div
        style={{
          background: 'white',
          border: '2px solid #007bff',
          borderRadius: '14px',
          padding: '22px',
          marginBottom: '20px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}
      >
        <p style={{ margin: 0, fontSize: '21px', fontWeight: '700', color: '#1a1a1a' }}>
          Interview Complete
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <div style={{ width: '2px', height: '26px', background: '#90caf9' }} />
      </div>

      <div style={{ display: 'grid', gap: '14px' }}>
        {outcomes.map((outcome) => (
          <div
            key={outcome.title}
            style={{
              display: 'grid',
              gridTemplateColumns: '24px 1fr',
              alignItems: 'stretch',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '999px',
                  background: '#90caf9'
                }}
              />
            </div>

            <div
              style={{
                borderLeft: `6px solid ${outcome.borderColor}`,
                background: outcome.background,
                borderRadius: '10px',
                padding: '14px 16px'
              }}
            >
              <p style={{ margin: '0 0 8px 0', fontSize: '19px', fontWeight: '700', color: '#1a1a1a' }}>
                {outcome.title}
              </p>
              <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.65', color: '#333' }}>
                {outcome.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '20px',
          background: '#fff8e1',
          border: '1px solid #ffecb3',
          borderRadius: '10px',
          padding: '14px 16px'
        }}
      >
        <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.6', color: '#6d4c41', fontWeight: '600' }}>
          Tip: If your visa is delayed, contact International Student Services for guidance.
        </p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '18px' }}>
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
  );
};

export default AfterInterviewPathsEp3;