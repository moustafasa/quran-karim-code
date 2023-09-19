import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrentTime,
  getCurrentPlayState,
  getCurrentTime,
} from "../../../rtk/slices/recitingSlice";

const DisplayTrack = ({ audioRef, duration }) => {
  const dispatch = useDispatch();
  const playState = useSelector(getCurrentPlayState);
  const nowTime = useSelector(getCurrentTime);
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

  useEffect(() => {
    if (!playState && audioRef.current) {
      audioRef.current.currentTime = nowTime;
    }
  }, [nowTime, audioRef, playState]);

  useEffect(() => {
    if (playState) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [playState, audioRef]);

  const convertTime = (time) => {
    const hours = Math.floor(time / (60 * 60))
      .toString()
      .padStart(2, "0");

    const minutes = Math.floor((time % (60 * 60)) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((time % (60 * 60)) % 60)
      .toString()
      .padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="display-track">
      <span>{convertTime(nowTime)}</span>
      <input
        type="range"
        max={duration}
        value={Math.min(duration, nowTime)}
        onChange={sliderHandler}
        style={{
          "--progress": `${Math.min((nowTime / duration) * 100, 100)}%`,
        }}
      />
      <span>{convertTime(duration)}</span>
    </div>
  );
};

export default memo(DisplayTrack);
