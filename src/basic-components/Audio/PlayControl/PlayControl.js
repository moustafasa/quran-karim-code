import React from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getCurrentPlayState } from "../../../rtk/slices/recitingSlice";

const PlayControl = ({ playHandler, canPlay }) => {
  const playState = useSelector(getCurrentPlayState);
  console.log(canPlay);
  return (
    <button
      type="button"
      className="play-pause-btn audio-btn"
      onClick={playHandler}
      disabled={!canPlay}
    >
      {playState ? <FaPause /> : <FaPlay />}
    </button>
  );
};

export default PlayControl;
