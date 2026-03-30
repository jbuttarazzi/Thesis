import { useState } from 'react';

/**
 * DefinitionSlidesEp5Scene8 Component
 *
 * Questions and ongoing support information with contact form for Episode 5, Scene 8.
 *
 * Props:
 * - onComplete: Function - Callback when scene is complete
 */
const DefinitionSlidesEp5Scene8 = ({ onComplete }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState('');

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmitForm = () => {
    if (formData.trim()) {
      setShowForm(false);
      setFormData('');
    }
  };

  const topics = [
    'Questions about enrollment',
    'Address changes',
    'Travel concerns',
    'Uncertainty about immigration responsibilities'
  ];

  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        padding: '40px 20px',
        maxWidth: '700px',
        margin: '0 auto'
      }}
    >
      {!showForm ? (
        <>
          <div
            style={{
              background: 'white',
              border: '2px solid #007bff',
              borderRadius: '16px',
              padding: '40px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
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
              Questions and Ongoing Support
            </h2>

            <p
              style={{
                fontSize: '18px',
                lineHeight: '1.7',
                color: '#333',
                textAlign: 'center',
                fontWeight: '500',
                marginBottom: '30px'
              }}
            >
              International Student Services is your primary point of contact for immigration related questions.
            </p>

            <div style={{ marginTop: '30px', paddingTop: '30px', borderTop: '2px solid #e0e0e0' }}>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#007bff',
                  marginBottom: '15px'
                }}
              >
                Ask questions regarding:
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}
              >
                {topics.map((topic, index) => (
                  <li
                    key={index}
                    style={{
                      fontSize: '16px',
                      color: '#333',
                      lineHeight: '1.8',
                      marginBottom: '12px',
                      paddingLeft: '20px',
                      position: 'relative'
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        color: '#007bff',
                        fontWeight: 'bold'
                      }}
                    >
                      •
                    </span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <button
              onClick={handleOpenForm}
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
                boxShadow: '0 2px 8px rgba(0,123,255,0.3)',
                marginRight: '15px'
              }}
            >
              Ask a Question
            </button>
            <button
              onClick={onComplete}
              style={{
                padding: '12px 32px',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: 'inherit',
                background: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(76,175,80,0.3)'
              }}
            >
              Continue →
            </button>
          </div>
        </>
      ) : (
        <div
          style={{
            background: 'white',
            border: '2px solid #007bff',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <h2
            style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#007bff',
              marginBottom: '30px',
              textAlign: 'center',
              letterSpacing: '-0.5px'
            }}
          >
            Contact International Student Services
          </h2>

          <textarea
            value={formData}
            onChange={(e) => setFormData(e.target.value)}
            placeholder="Describe your question or concern..."
            style={{
              width: '100%',
              minHeight: '150px',
              padding: '15px',
              fontSize: '16px',
              fontFamily: 'inherit',
              border: '2px solid #ddd',
              borderRadius: '8px',
              resize: 'vertical',
              boxSizing: 'border-box',
              color: '#333'
            }}
          />

          <div
            style={{
              marginTop: '30px',
              display: 'flex',
              gap: '15px',
              justifyContent: 'center'
            }}
          >
            <button
              onClick={handleCloseForm}
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: 'inherit',
                background: 'white',
                color: '#333',
                border: '2px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitForm}
              disabled={!formData.trim()}
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: 'inherit',
                background: formData.trim() ? '#007bff' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: formData.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                boxShadow: formData.trim() ? '0 2px 8px rgba(0,123,255,0.3)' : 'none'
              }}
            >
              Submit Question
            </button>
          </div>

          <p
            style={{
              fontSize: '14px',
              color: '#666',
              textAlign: 'center',
              marginTop: '20px',
              fontStyle: 'italic'
            }}
          >
            Your question will be sent to International Student Services
          </p>
        </div>
      )}
    </div>
  );
};

export default DefinitionSlidesEp5Scene8;
