import React, { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrentTime,
  getCurrentPlayState,
  getCurrentTime,
  getRecitingStatus,
} from "../../../rtk/slices/recitingSlice";

import "./DisplayTrack.scss";
import useConvertTimeForm from "../../../customHooks/useConvertTimeForm";

const DisplayTrack = ({ audioRef, duration, progressEnd }) => {
  // selectors
  const playState = useSelector(getCurrentPlayState);
  const nowTime = useSelector(getCurrentTime);
  const recitingStatus = useSelector(getRecitingStatus);

  // others
  const timeConverter = useConvertTimeForm();
  const dispatch = useDispatch();
  const roundedNowTime = Math.floor(nowTime);
  const roundedDuration = Math.floor(duration);
  const roundedProgress = Math.floor(progressEnd);

  // handlers
  const setNowTime = useCallback(
    (time) => dispatch(changeCurrentTime(time)),
    [dispatch]
  );

  const sliderHandler = (e) => {
    const time = +e.target.value;
    audioRef.current.currentTime = time;
    if (!playState) {
      setNowTime(time);
    }
  };

  // effects
  // seeking audio (change audio current time)
  useEffect(() => {
    if (!playState && audioRef.current && recitingStatus === "idle") {
      audioRef.current.currentTime = nowTime;
    }
  }, [nowTime, audioRef, playState, recitingStatus]);

  // change playState
  useEffect(() => {
    const play = async () => await audioRef.current?.play();
    const pause = async () => await audioRef.current?.pause();

    if (playState && recitingStatus === "idle") {
      play();
    } else {
      pause();
    }
  }, [playState, audioRef]);

  return (
    <div className="display-track">
      <span>{timeConverter(nowTime)}</span>
      <input
        type="range"
        max={roundedDuration}
        value={Math.min(roundedDuration, roundedNowTime)}
        onChange={sliderHandler}
        style={{
          "--progress": `${Math.min(
            (roundedNowTime / roundedDuration) * 100,
            100
          )}%`,
          "--downloaded": `${Math.min(
            (roundedProgress / roundedDuration) * 100,
            100
          )}%`,
        }}
      />
      <span>{timeConverter(duration)}</span>
    </div>
  );
};

export default memo(DisplayTrack);
