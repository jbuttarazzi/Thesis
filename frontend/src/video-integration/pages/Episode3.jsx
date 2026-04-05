import { useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import InteractiveImage from '../components/InteractiveImage';
import DefinitionSlidesEp3 from '../components/DefinitionSlidesEp3';
import OrderQuizEp3 from '../components/OrderQuizEp3';
import DefinitionSlidesEp3Part2 from '../components/DefinitionSlidesEp3Part2';
import InterviewQuestionCardEp3 from '../components/InterviewQuestionCardEp3';
import InterviewQuizEp3 from '../components/InterviewQuizEp3';
import AfterInterviewPathsEp3 from '../components/AfterInterviewPathsEp3';
import DefinitionSlidesEp3Travel from '../components/DefinitionSlidesEp3Travel';
import ReflectionFinalEp3 from '../components/ReflectionFinalEp3';

/**
 * Episode3 Component - Visa Application
 *
 * Visa Application flow:
 * 1. Scene 1 video
 * 2. Scene 2 image (auto-shown when video ends)
 * 3. Visa application flashcards
 * 4. Visa application order quiz
 * 5. Scene 5 image
 * 6. Visa process reference flashcards
 * 7. Scene 7 video
 * 8. Interviewer question flashcard
 * 9. Interviewer question quiz
 * 10. After interview paths tree
 * 11. Travel timing flashcards
 * 12. Final reflection
 */
const Episode3 = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleScene1VideoEnd = () => {
    setCurrentStep(2);
  };

  const handleScene2Complete = () => {
    setCurrentStep(3);
  };

  const handleFlashcardsComplete = () => {
    setCurrentStep(4);
  };

  const handleOrderQuizComplete = () => {
    setCurrentStep(5);
  };

  const handleScene5Complete = () => {
    setCurrentStep(6);
  };

  const handleFinalFlashcardsComplete = () => {
    setCurrentStep(7);
  };

  const handleScene7VideoEnd = () => {
    setCurrentStep(8);
  };

  const handleInterviewCardComplete = () => {
    setCurrentStep(9);
  };

  const handleInterviewQuizComplete = () => {
    setCurrentStep(10);
  };

  const handleAfterInterviewComplete = () => {
    setCurrentStep(11);
  };

  const handleTravelFlashcardsComplete = () => {
    setCurrentStep(12);
  };

  return (
    <div className="episode-container" style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      {currentStep === 1 && (
        <VideoPlayer
          src="/src/assets/videos/Episode3/scene1.mp4"
          subtitlePath="/src/assets/videos/Episode3/scene1.vtt"
          onEnded={handleScene1VideoEnd}
          autoPlay
        />
      )}

      {currentStep === 2 && (
        <InteractiveImage
          src="/src/assets/videos/Episode3/scene2.png"
          onComplete={handleScene2Complete}
        />
      )}

      {currentStep === 3 && (
        <DefinitionSlidesEp3 onComplete={handleFlashcardsComplete} />
      )}

      {currentStep === 4 && (
        <OrderQuizEp3 onComplete={handleOrderQuizComplete} />
      )}

      {currentStep === 5 && (
        <InteractiveImage
          src="/src/assets/videos/Episode3/scene5.png"
          onComplete={handleScene5Complete}
        />
      )}

      {currentStep === 6 && (
        <DefinitionSlidesEp3Part2 onComplete={handleFinalFlashcardsComplete} />
      )}

      {currentStep === 7 && (
        <VideoPlayer
          src="/src/assets/videos/Episode3/scene7.mp4"
          subtitlePath="/src/assets/videos/Episode3/scene7.vtt"
          onEnded={handleScene7VideoEnd}
          autoPlay
        />
      )}

      {currentStep === 8 && (
        <InterviewQuestionCardEp3 onComplete={handleInterviewCardComplete} />
      )}

      {currentStep === 9 && (
        <InterviewQuizEp3 onComplete={handleInterviewQuizComplete} />
      )}

      {currentStep === 10 && (
        <AfterInterviewPathsEp3 onComplete={handleAfterInterviewComplete} />
      )}

      {currentStep === 11 && (
        <DefinitionSlidesEp3Travel onComplete={handleTravelFlashcardsComplete} />
      )}

      {currentStep === 12 && (
        <ReflectionFinalEp3 />
      )}
    </div>
  );
};

export default Episode3;