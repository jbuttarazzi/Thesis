import { useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import DefinitionSlidesEp6Scene2 from '../components/DefinitionSlidesEp6Scene2';
import QuizEp6Scene3 from '../components/QuizEp6Scene3';
import DefinitionSlidesEp6Scene4 from '../components/DefinitionSlidesEp6Scene4';
import DefinitionSlidesEp6Scene5 from '../components/DefinitionSlidesEp6Scene5';
import QuizEp6Scene6 from '../components/QuizEp6Scene6';
import ImageDisplayEp6Scene7 from '../components/ImageDisplayEp6Scene7';
import DefinitionSlidesEp6Scene8 from '../components/DefinitionSlidesEp6Scene8';
import DefinitionSlidesEp6Scene9 from '../components/DefinitionSlidesEp6Scene9';
import DefinitionSlidesEp6Scene10 from '../components/DefinitionSlidesEp6Scene10';
import QuizEp6Scene11 from '../components/QuizEp6Scene11';
import ReflectionEp6 from '../components/ReflectionEp6';

/**
 * Episode6 Component
 *
 * Contact and Reporting Requirements flow:
 * 1. Scene 1 video
 * 2. Scene 2 flashcard (ISS guidance - telephone reporting)
 * 3. Scene 3 quiz (reporting requirements)
 * 4. Scene 4 flashcard (Campus ID and Access)
 * 5. Scene 5 flashcard (Understanding Enrollment)
 * 6. Scene 6 quiz (enrollment consequences)
 * 7. Scene 7 image (Campus Safety)
 * 8. Scene 8 flashcard (ISS message on conduct violations)
 * 9. Scene 9 flashcard (Practical Student Services)
 * 10. Scene 10 flashcard (Questions and Ongoing Responsibility)
 * 11. Scene 11 quiz (When to contact ISS)
 * 12. Scene 12 reflection (End of Episode)
 */
const Episode6 = ({ onBackToEpisodes }) => {
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

  const handleScene4Complete = () => {
    setCurrentStep(5);
  };

  const handleScene5Complete = () => {
    setCurrentStep(6);
  };

  const handleScene6Complete = () => {
    setCurrentStep(7);
  };

  const handleScene7Complete = () => {
    setCurrentStep(8);
  };

  const handleScene8Complete = () => {
    setCurrentStep(9);
  };

  const handleScene9Complete = () => {
    setCurrentStep(10);
  };

  const handleScene10Complete = () => {
    setCurrentStep(11);
  };

  const handleScene11Complete = () => {
    setCurrentStep(12);
  };

  const handleScene12Complete = () => {
    if (onBackToEpisodes) {
      onBackToEpisodes();
    }
  };

  return (
    <div className="episode-container" style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      {currentStep === 1 && (
        <VideoPlayer
          src="/src/assets/videos/Episode6/scene1.mp4"
          onEnded={handleScene1VideoEnd}
          autoPlay
        />
      )}

      {currentStep === 2 && (
        <DefinitionSlidesEp6Scene2 onComplete={handleScene2Complete} />
      )}

      {currentStep === 3 && (
        <QuizEp6Scene3 onComplete={handleScene3Complete} />
      )}

      {currentStep === 4 && (
        <DefinitionSlidesEp6Scene4 onComplete={handleScene4Complete} />
      )}

      {currentStep === 5 && (
        <DefinitionSlidesEp6Scene5 onComplete={handleScene5Complete} />
      )}

      {currentStep === 6 && (
        <QuizEp6Scene6 onComplete={handleScene6Complete} />
      )}

      {currentStep === 7 && (
        <ImageDisplayEp6Scene7 onComplete={handleScene7Complete} />
      )}

      {currentStep === 8 && (
        <DefinitionSlidesEp6Scene8 onComplete={handleScene8Complete} />
      )}

      {currentStep === 9 && (
        <DefinitionSlidesEp6Scene9 onComplete={handleScene9Complete} />
      )}

      {currentStep === 10 && (
        <DefinitionSlidesEp6Scene10 onComplete={handleScene10Complete} />
      )}

      {currentStep === 11 && (
        <QuizEp6Scene11 onComplete={handleScene11Complete} />
      )}

      {currentStep === 12 && (
        <ReflectionEp6 onComplete={handleScene12Complete} />
      )}
    </div>
  );
};

export default Episode6;
