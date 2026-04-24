/**
 * filename: Episode1.jsx
 *
 * description: Manages the flow of episode 1 including the starting video, flashcards, interactive video selection
 * and feedback form. 
 */

import { useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import InteractiveImage from '../components/InteractiveImage';
import DefinitionSlides from '../components/DefinitionSlides';
import ChoiceSelector from '../components/ChoiceSelector';
import FeedbackForm from '../components/FeedbackForm';

/**
 * Episode1 Component
 * 
 * Main orchestrator for Episode 1 interactive experience.
 * Manages the flow through different steps:
 * 1. Introduction video (scene1main.mp4)
 * 2. Scene image with highlighted elements
 * 3. Definition slides for key immigration terms
 * 4. Choice selection (returns here after each video)
 * 5. Selected choice video playback
 * 6. Feedback form collection
 */
const Episode1 = ({ onNextEpisode }) => {
  // Track current step in the episode flow (1-6)
  const [currentStep, setCurrentStep] = useState(1);
  // Store the choice object selected by user
  const [selectedChoice, setSelectedChoice] = useState(null);

  /**
   * Handler: Introduction video ended
   * Advances to scene image step
   */
  const handleIntroVideoEnd = () => {
    setCurrentStep(2);
  };

  /**
   * Handler: Scene image viewing complete
   * Advances to definition slides step
   */
  const handleImageComplete = () => {
    setCurrentStep(3);
  };

  /**
   * Handler: All definitions viewed
   * Advances to choice selection step
   */
  const handleDefinitionsComplete = () => {
    setCurrentStep(4);
  };

  /**
   * Handler: User selected a choice
   * Stores the choice and advances to play its associated video
   */
  const handleChoiceSelected = (choice) => {
    setSelectedChoice(choice);
    setCurrentStep(5);
  };

  /**
   * Handler: Choice video ended
   * Returns to choice selector so user can explore other options
   */
  const handleChoiceVideoEnd = () => {
    setCurrentStep(4);
    setSelectedChoice(null);
  };

  /**
   * Handler: User ready to complete episode
   * Advances to feedback form step
   */
  const handleAllComplete = () => {
    setCurrentStep(6);
  };

  /**
   * Helper: Convert video path to subtitle path
   * Replaces .mp4 extension with .vtt
   */
  const getSubtitlePath = (videoPath) => {
    if (!videoPath) return null;
    return videoPath.replace(/\.mp4$/, '.vtt');
  };

  return (
    <div className="episode-container" style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Step 1: Introduction Video */}
      {currentStep === 1 && (
        <VideoPlayer 
          src="/Videos/Episode_1/scene1main.mp4"
          subtitlePath="/Videos/Episode_1/scene1main.vtt"
          onEnded={handleIntroVideoEnd}
          autoPlay
        />
      )} 
      
      {/* Step 2: Scene Image with Highlighted Elements */}
      {currentStep === 2 && (
        <InteractiveImage 
          src="/Videos/Episode_1/scene2.png"
          onComplete={handleImageComplete}
        />
      )}
      
      {/* Step 3: Definition Slides */}
      {currentStep === 3 && (
        <DefinitionSlides 
          onComplete={handleDefinitionsComplete}
        />
      )}
      
      {/* Step 4: Choice Selection Menu */}
      {currentStep === 4 && (
        <ChoiceSelector 
          onSelect={handleChoiceSelected}
          onComplete={handleAllComplete}
        />
      )}
      
      {/* Step 5: Play Selected Choice Video */}
      {currentStep === 5 && selectedChoice && (
        <VideoPlayer 
          src={selectedChoice.video}
          subtitlePath={getSubtitlePath(selectedChoice.video)}
          onEnded={handleChoiceVideoEnd}
          autoPlay
        />
      )}
      
      {/* Step 6: Feedback Form */}
      {currentStep === 6 && (
        <FeedbackForm onSubmit={(data) => console.log('Form submitted:', data)} onNextEpisode={onNextEpisode} episodeNumber={1} />
      )}
    </div>
  );
};

export default Episode1;
