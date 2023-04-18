import React from 'react';
import vidBack from './vidBack.mp4';

function VideoBackground() {
  return (
    <video
      src={vidBack}
      autoPlay
      loop
      muted
      controls={false}
      playsInline
      disablePictureInPicture
      className="videoBackground"
    />
  );
}

export default VideoBackground;
