/**
 * filename: VideoPlayer.jsx
 * 
 * description: HTML5 video player with controls and WebVTT subtitle support. Used throughout all episodes.
 * 
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
