// imports
import React, { useState, useRef, memo, useEffect } from "react";

import "./Audio.scss";
import PlayControl from "./PlayControl/PlayControl";
import DisplayTrack from "./DisplayTrack/DisplayTrack";
import Volume from "./Volume/Volume";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrentTime,
  changePlayState,
  getCurrentPlayState,
} from "../../rtk/slices/recitingSlice";

const Audio = ({ src }) => {
  const [duration, setDuration] = useState(0);
  const [canPlay, setCanPlay] = useState(false);
  const playState = useSelector(getCurrentPlayState);
  const dispatch = useDispatch();
  const setPlayState = (state) => {
    dispatch(changePlayState(state));
  };
  const audioRef = useRef();

  const playHandler = () => {
    setPlayState(!playState);
  };

  useEffect(
    (_) => {
      audioRef.current.load();
    },
    [src]
  );

  return (
    <div className="audio-cont" style={{ direction: "ltr" }}>
      <audio
        ref={audioRef}
        preload="auto"
        onLoadStart={(_) => setPlayState(false)}
        onEnded={(_) => setPlayState(false)}
        onLoadedData={(e) => {
          setDuration(isNaN(e.target.duration) ? 0 : e.target.duration);
          dispatch(changeCurrentTime(0));
        }}
        crossOrigin="anonymous"
        onCanPlayThrough={(e) => setCanPlay(true)}
        onTimeUpdate={(e) => {
          setDuration(isNaN(e.target.duration) ? 0 : e.target.duration);
          dispatch(changeCurrentTime(e.target.currentTime));
        }}
        onProgress={(e) => {
          console.log(e.target.buffered);
          e.target.buffered.length > 0 &&
            console.log(
              e.target.buffered.start(e.target.buffered.length - 1),
              e.target.buffered.end(e.target.buffered.length - 1)
            );
        }}
      >
        <source src={src} type="audio/mpeg" />
        the audio not supported
      </audio>
      <PlayControl playHandler={playHandler} canPlay={canPlay} />
      <DisplayTrack audioRef={audioRef} duration={duration} />
      <Volume audioRef={audioRef} />
    </div>
  );
};

export default Audio;
