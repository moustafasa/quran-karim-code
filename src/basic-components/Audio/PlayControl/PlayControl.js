import React, { memo } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getCurrentPlayState } from "../../../rtk/slices/recitingSlice";
import "./PlayControl.scss";
import Spinner from "../../Spinner/Spinner";
import useSpinnerWithMinTime from "../../../customHooks/useSpinnerWithMinTime";

const PlayControl = ({ playHandler, recitingStatus, duration }) => {
  const playState = useSelector(getCurrentPlayState);
  const isLoading = useSpinnerWithMinTime(recitingStatus, 200);

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <Spinner showP={false} />
      </div>
    );
  }

  return (
    <button
      type="button"
      className="play-pause-btn audio-btn"
      onClick={playHandler}
      disabled={duration === 0}
    >
      {playState ? <FaPause /> : <FaPlay />}
    </button>
  );
};

export default memo(PlayControl);
