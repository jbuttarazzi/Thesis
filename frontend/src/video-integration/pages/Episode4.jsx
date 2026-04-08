import { useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import DefinitionSlidesEp4 from '../components/DefinitionSlidesEp4';
import DefinitionSlidesEp4CampusArrival from '../components/DefinitionSlidesEp4CampusArrival';
import DefinitionSlidesEp4InterOrient from '../components/DefinitionSlidesEp4InterOrient';
import QuizEp4InterOrient from '../components/QuizEp4InterOrient';
import DefinitionSlidesEp4ApprovedLocations from '../components/DefinitionSlidesEp4ApprovedLocations';
import DefinitionSlidesEp4ArrivalLodging from '../components/DefinitionSlidesEp4ArrivalLodging';
import DefinitionSlidesEp4PickUpCommunication from '../components/DefinitionSlidesEp4PickUpCommunication';
import DefinitionSlidesEp4FamilyGuests from '../components/DefinitionSlidesEp4FamilyGuests';
import DefinitionSlidesEp4TravelInformation from '../components/DefinitionSlidesEp4TravelInformation';
import ReflectionEp4 from '../components/ReflectionEp4';

/**
 * Episode4 Component
 *
 * Entry timing guidance flow:
 * 1. Scene 1 video
 * 2. Entry timing flashcards (30-Day Rule + ISS Tip)
 * 3. Campus arrival timing flashcards
 */
const Episode4 = ({ onNextEpisode }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleScene1VideoEnd = () => {
    setCurrentStep(2);
  };

  const handleFlashcardsComplete = () => {
    setCurrentStep(3);
  };

  const handleCampusArrivalComplete = () => {
    setCurrentStep(4);
  };

  const handleInterOrientComplete = () => {
    setCurrentStep(5);
  };

  const handleQuizInterOrientComplete = () => {
    setCurrentStep(6);
  };

  const handleApprovedLocationsComplete = () => {
    setCurrentStep(7);
  };

  const handleArrivalLodgingComplete = () => {
    setCurrentStep(8);
  };

  const handlePickUpCommunicationComplete = () => {
    setCurrentStep(9);
  };

  const handleFamilyGuestsComplete = () => {
    setCurrentStep(10);
  };

  const handleTravelInformationComplete = () => {
    setCurrentStep(11);
  };

  const handleReflectionComplete = () => {
    setCurrentStep(12);
  };

  return (
    <div className="episode-container" style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      {currentStep === 1 && (
        <VideoPlayer
          src="/src/assets/videos/Episode4/scene1.mp4"
          subtitlePath="/src/assets/videos/Episode4/scene1.vtt"
          onEnded={handleScene1VideoEnd}
          autoPlay
        />
      )}

      {currentStep === 2 && (
        <DefinitionSlidesEp4 onComplete={handleFlashcardsComplete} />
      )}

      {currentStep === 3 && (
        <DefinitionSlidesEp4CampusArrival onComplete={handleCampusArrivalComplete} />
      )}

      {currentStep === 4 && (
        <DefinitionSlidesEp4InterOrient onComplete={handleInterOrientComplete} />
      )}

      {currentStep === 5 && (
        <QuizEp4InterOrient onComplete={handleQuizInterOrientComplete} />
      )}

      {currentStep === 6 && (
        <DefinitionSlidesEp4ApprovedLocations onComplete={handleApprovedLocationsComplete} />
      )}

      {currentStep === 7 && (
        <DefinitionSlidesEp4ArrivalLodging onComplete={handleArrivalLodgingComplete} />
      )}

      {currentStep === 8 && (
        <DefinitionSlidesEp4PickUpCommunication onComplete={handlePickUpCommunicationComplete} />
      )}

      {currentStep === 9 && (
        <DefinitionSlidesEp4FamilyGuests onComplete={handleFamilyGuestsComplete} />
      )}

      {currentStep === 10 && (
        <DefinitionSlidesEp4TravelInformation onComplete={handleTravelInformationComplete} />
      )}

      {currentStep === 11 && (
        <ReflectionEp4 onComplete={handleReflectionComplete} onNextEpisode={onNextEpisode} episodeNumber={4} />
      )}

      {currentStep === 12 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#4caf50',
            marginBottom: '20px',
            fontFamily: 'inherit'
          }}>
            Episode 4 Complete!
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#333',
            lineHeight: '1.7',
            fontFamily: 'inherit',
            marginBottom: '30px'
          }}>
            Great job learning about entry requirements and arrival logistics. You're now well-prepared to understand the process of arriving on campus as an F-1 student.
          </p>
          <div style={{
            backgroundColor: '#e8f5e9',
            border: '2px solid #4caf50',
            borderRadius: '8px',
            padding: '20px',
            marginTop: '30px'
          }}>
            <p style={{
              fontSize: '16px',
              color: '#2e7d32',
              fontFamily: 'inherit',
              margin: 0
            }}>
              💡 Pro Tip: Keep all ISS communications and travel documents organized in one place for easy reference.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Episode4;
