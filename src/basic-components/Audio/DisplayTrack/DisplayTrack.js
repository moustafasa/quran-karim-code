import React, { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrentTime,
  getCurrentPlayState,
  getCurrentTime,
} from "../../../rtk/slices/recitingSlice";

import "./DisplayTrack.scss";
import useConvertTimeForm from "../../../customHooks/useConvertTimeForm";

const DisplayTrack = ({ audioRef, duration, progressEnd, recitingStatus }) => {
  // selectors
  const playState = useSelector(getCurrentPlayState);
  const nowTime = useSelector(getCurrentTime);
  const timeConverter = useConvertTimeForm();
  const dispatch = useDispatch();

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
        max={duration}
        value={Math.min(duration, nowTime)}
        onChange={sliderHandler}
        style={{
          "--progress": `${Math.min((nowTime / duration) * 100, 100)}%`,
          "--downloaded": `${Math.min((progressEnd / duration) * 100, 100)}%`,
        }}
      />
      <span>{timeConverter(duration)}</span>
    </div>
  );
};

export default memo(DisplayTrack);
