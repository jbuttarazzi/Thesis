/**
 * VideoPlayer Component
 * 
 * A reusable video player component that displays videos with standard controls.
 * Used throughout the episode flow to show introduction videos and choice-based videos.
 * 
 * Props:
 * - src: String - The URL or path to the video file
 * - onEnded: Function - Callback function triggered when video finishes playing
 * - autoPlay: Boolean (default: false) - Whether the video should start playing automatically
 */
const VideoPlayer = ({ src, onEnded, autoPlay = false }) => {
  return (
    <div className="video-player">
      {/* HTML5 video element with responsive sizing */}
      <video 
        src={src}
        controls // Show video controls (play, pause, volume, etc.)
        autoPlay={autoPlay}
        onEnded={onEnded} // Trigger callback when video ends
        style={{ width: '100%', maxWidth: '800px' }}
      />
    </div>
  );
};

export default VideoPlayer;
