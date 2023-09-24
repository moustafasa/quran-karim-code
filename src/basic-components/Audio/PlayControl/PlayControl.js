import React, { memo } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getCurrentPlayState } from "../../../rtk/slices/recitingSlice";
import "./PlayControl.scss";

const PlayControl = ({ playHandler, canPlay }) => {
  const playState = useSelector(getCurrentPlayState);

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

export default memo(PlayControl);
