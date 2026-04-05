import { useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import InteractiveImage from '../components/InteractiveImage';
import DefinitionSlidesEp2 from '../components/DefinitionSlidesEp2';
import DefinitionSlidesEp2Part2 from '../components/DefinitionSlidesEp2Part2';
import QuizQuestionEp2 from '../components/QuizQuestionEp2';
import DefinitionSlidesEp2Part3 from '../components/DefinitionSlidesEp2Part3';
import ReflectionFormEp2 from '../components/ReflectionFormEp2';

/**
 * Episode2 Component
 * 
 * Main orchestrator for Episode 2 interactive experience.
 * Manages the flow through different steps:
 * 1. Introduction video (scene1.mp4)
 * 2. Scene image (scene2.png)
 * 3. Definition slides for required documents
 * 4. Scene 3 image (scene3.jpeg)
 * 5. Definition slides for I-20 fields
 * 6. Responsibility check quiz
 * 7. Definition slides for visa and travel records
 * 8. Reflection form - I-20 questions
 */
const Episode2 = () => {
  // Track current step in the episode flow
  const [currentStep, setCurrentStep] = useState(1);

  /**
   * Handler: Introduction video ended
   * Advances to scene image step
   */
  const handleIntroVideoEnd = () => {
    setCurrentStep(2);
  };

  /**
   * Handler: Scene 2 image viewing complete
   * Advances to definition slides step
   */
  const handleImageComplete = () => {
    setCurrentStep(3);
  };

  /**
   * Handler: All document requirement definitions viewed
   * Advances to scene 3 image step
   */
  const handleDefinitionsComplete = () => {
    setCurrentStep(4);
  };

  /**
   * Handler: Scene 3 image viewing complete
   * Advances to I-20 field definitions step
   */
  const handleScene3Complete = () => {
    setCurrentStep(5);
  };

  /**
   * Handler: All I-20 field definitions viewed
   * Advances to responsibility check quiz
   */
  const handleI20DefinitionsComplete = () => {
    setCurrentStep(6);
  };

  /**
   * Handler: Quiz completed
   * Advances to visa and travel records definitions
   */
  const handleQuizComplete = () => {
    setCurrentStep(7);
  };

  /**
   * Handler: All visa and travel records definitions viewed
   * Advances to reflection form
   */
  const handleVisaDefinitionsComplete = () => {
    setCurrentStep(8);
  };

  /**
   * Handler: Reflection form submitted
   * Episode complete
   */
  const handleReflectionSubmit = (formData) => {
    console.log('Reflection submitted:', formData);
    // Form data is saved and episode is complete
  };

  return (
    <div className="episode-container" style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Step 1: Introduction Video */}
      {currentStep === 1 && (
        <VideoPlayer 
          src="/src/assets/videos/Episode2/scene1.mp4" 
          subtitlePath="/src/assets/videos/Episode2/scene1.vtt"
          onEnded={handleIntroVideoEnd}
          autoPlay
        />
      )} 
      
      {/* Step 2: Scene Image */}
      {currentStep === 2 && (
        <InteractiveImage 
          src="/src/assets/videos/Episode2/scene2.png"
          onComplete={handleImageComplete}
        />
      )}

      {/* Step 3: Definition Slides for Required Documents */}
      {currentStep === 3 && (
        <DefinitionSlidesEp2 
          onComplete={handleDefinitionsComplete}
        />
      )}

      {/* Step 4: Scene 3 Image */}
      {currentStep === 4 && (
        <InteractiveImage 
          src="/src/assets/videos/Episode2/scene3.jpeg"
          onComplete={handleScene3Complete}
        />
      )}

      {/* Step 5: Definition Slides for I-20 Fields */}
      {currentStep === 5 && (
        <DefinitionSlidesEp2Part2 
          onComplete={handleI20DefinitionsComplete}
        />
      )}

      {/* Step 6: Responsibility Check Quiz */}
      {currentStep === 6 && (
        <QuizQuestionEp2 
          onComplete={handleQuizComplete}
        />
      )}

      {/* Step 7: Definition Slides for Visa and Travel Records */}
      {currentStep === 7 && (
        <DefinitionSlidesEp2Part3 
          onComplete={handleVisaDefinitionsComplete}
        />
      )}

      {/* Step 8: Reflection Form - I-20 Questions */}
      {currentStep === 8 && (
        <ReflectionFormEp2 
          onSubmit={handleReflectionSubmit}
        />
      )}
    </div>
  );
};

export default Episode2;
