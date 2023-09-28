import React, { memo } from "react";
import { toast } from "react-toastify";

const HtmlAudio = ({ audioRef }) => {
  const handleAudioError = (event) => {
    switch (event.target.error.code) {
      case event.target.error.MEDIA_ERR_ABORTED:
        toast("You aborted the audio playback.", { type: "error" });
        break;
      case event.target.error.MEDIA_ERR_NETWORK:
        toast("A network error caused the audio download to fail.", {
          type: "error",
        });
        break;
      case event.target.error.MEDIA_ERR_DECODE:
        toast(
          "The audio playback was aborted due to a corruption problem or because the media used features your browser did not support.",
          { type: "error" }
        );
        break;
      case event.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
        toast(
          "The audio could not be loaded, either because the server or network failed or because the format is not supported.",
          { type: "error" }
        );
        break;
      default:
        toast("An unknown error occurred.", { type: "error" });
        break;
    }
  };
  return (
    <audio
      ref={audioRef}
      preload="auto"
      crossOrigin="anonymous"
      onError={handleAudioError}
    >
      {/* <source src={src} type="audio/mpeg" /> */}
      the audio not supported
    </audio>
  );
};

export default memo(HtmlAudio);
