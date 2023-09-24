import React, { memo } from "react";

const HtmlAudio = ({ audioRef }) => {
  console.log("done");
  return (
    <audio
      ref={audioRef}
      preload="auto"
      // events

      crossOrigin="anonymous"
    >
      {/* <source src={src} type="audio/mpeg" /> */}
      the audio not supported
    </audio>
  );
};

export default memo(HtmlAudio);
