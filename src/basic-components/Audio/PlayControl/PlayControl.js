import React, { memo, useEffect } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  changePlayState,
  getCurrentPlayState,
  getRecitingStatus,
} from "../../../rtk/slices/recitingSlice";
import "./PlayControl.scss";
import Spinner from "../../Spinner/Spinner";
import useSpinnerWithMinTime from "../../../customHooks/useSpinnerWithMinTime";

const PlayControl = ({ duration }) => {
  const recitingStatus = useSelector(getRecitingStatus);
  const playState = useSelector(getCurrentPlayState);
  const isLoading = useSpinnerWithMinTime(recitingStatus, 200);

  const dispatch = useDispatch();

  const playHandler = () => {
    dispatch(changePlayState(!playState));
  };
  useEffect(() => {
    if (duration === 0) {
      dispatch(changePlayState(false));
    }
  }, [duration, dispatch]);

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
