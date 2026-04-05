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
 * - subtitlePath: String (optional) - The path to the .vtt subtitle file
 */
const VideoPlayer = ({ src, onEnded, autoPlay = false, subtitlePath }) => {
  return (
    <div className="video-player">
      {/* HTML5 video element with responsive sizing */}
      <video 
        src={src}
        controls
        autoPlay={autoPlay}
        onEnded={onEnded}
        style={{ width: '100%', maxWidth: '800px' }}
        crossOrigin="anonymous"
      >
        {/* Subtitle track - must be .vtt format, not .srt */}
        {subtitlePath && (
          <track 
            kind="subtitles" 
            srcLang="en" 
            label="English"
            src={subtitlePath}
            default
          />
        )}
      </video>
    </div>
  );
};

export default VideoPlayer;
