import React from "react";
import "./videoBackground.scss";
import vidBack from "./vidBack.mp4";

export const VideoBackground = () => {
  return (
    <>
      <video
        src={vidBack}
        autoPlay
        loop
        muted
        controls="false"
        playsinline="true"
        disablePictureInPicture="true"
        className="videoBackground"
      ></video>
    </>
  );
};
