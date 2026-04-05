import { useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import DefinitionSlidesEp5Scene2 from '../components/DefinitionSlidesEp5Scene2';
import DefinitionSlidesEp5Scene3 from '../components/DefinitionSlidesEp5Scene3';
import DefinitionSlidesEp5Scene4Intro from '../components/DefinitionSlidesEp5Scene4Intro';
import DefinitionSlidesEp5Scene5 from '../components/DefinitionSlidesEp5Scene5';
import DefinitionSlidesEp5Scene8 from '../components/DefinitionSlidesEp5Scene8';
import ReflectionEp5 from '../components/ReflectionEp5';

/**
 * Episode5 Component
 *
 * International Student Orientation flow:
 * 1. Scene 1 video
 * 2. International Student Orientation flashcards
 */
const Episode5 = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleScene1VideoEnd = () => {
    setCurrentStep(2);
  };

  const handleScene2Complete = () => {
    setCurrentStep(3);
  };

  const handleScene3Complete = () => {
    setCurrentStep(4);
  };

  const handleScene4ImageClick = () => {
    setCurrentStep(5);
  };

  const handleScene4IntroComplete = () => {
    setCurrentStep(6);
  };

  const handleScene5Complete = () => {
    setCurrentStep(7);
  };

  const handleScene6ImageClick = () => {
    setCurrentStep(8);
  };

  const handleScene7ImageClick = () => {
    setCurrentStep(9);
  };

  const handleScene8Complete = () => {
    setCurrentStep(10);
  };

  const handleReflectionComplete = () => {
    setCurrentStep(1); // Reset or could handle as needed
  };

  return (
    <div className="episode-container" style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      {currentStep === 1 && (
        <VideoPlayer
          src="/src/assets/videos/Episode5/scene1.mp4"
          subtitlePath="/src/assets/videos/Episode5/scene1.vtt"
          onEnded={handleScene1VideoEnd}
          autoPlay
        />
      )}

      {currentStep === 2 && (
        <DefinitionSlidesEp5Scene2 onComplete={handleScene2Complete} />
      )}

      {currentStep === 3 && (
        <DefinitionSlidesEp5Scene3 onComplete={handleScene3Complete} />
      )}

      {currentStep === 4 && (
        <div style={{
          padding: '40px 20px',
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <img
            src="/src/assets/videos/Episode5/scene4.png"
            alt="Scene 4"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              marginBottom: '30px'
            }}
          />
          <button
            onClick={handleScene4ImageClick}
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
      )}

      {currentStep === 5 && (
        <DefinitionSlidesEp5Scene4Intro onComplete={handleScene4IntroComplete} />
      )}

      {currentStep === 6 && (
        <DefinitionSlidesEp5Scene5 onComplete={handleScene5Complete} />
      )}

      {currentStep === 7 && (
        <div style={{
          padding: '40px 20px',
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <img
            src="/src/assets/videos/Episode5/scene6.png"
            alt="Scene 6"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              marginBottom: '30px'
            }}
          />
          <button
            onClick={handleScene6ImageClick}
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
      )}

      {currentStep === 8 && (
        <div style={{
          padding: '40px 20px',
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <img
            src="/src/assets/videos/Episode5/scene7.png"
            alt="Scene 7"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              marginBottom: '30px'
            }}
          />
          <button
            onClick={handleScene7ImageClick}
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
      )}

      {currentStep === 9 && (
        <DefinitionSlidesEp5Scene8 onComplete={handleScene8Complete} />
      )}

      {currentStep === 10 && (
        <ReflectionEp5 onComplete={handleReflectionComplete} />
      )}
    </div>
  );
};

export default Episode5;
