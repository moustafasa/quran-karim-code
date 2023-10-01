// imports
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  changeCurrentTime,
  changePlayState,
  changeRecitingStatus,
} from "../../rtk/slices/recitingSlice";
import "./Audio.scss";
import DisplayTrack from "./DisplayTrack/DisplayTrack";
import HtmlAudio from "./HtmlAudio";
import PlayControl from "./PlayControl/PlayControl";
import Volume from "./Volume/Volume";

const Audio = ({ src }) => {
  // states
  const [duration, setDuration] = useState(0);
  const [downloaded, setDownloaded] = useState(0);

  // selectors
  const dispatch = useDispatch();

  // refs
  const audioRef = useRef();

  // handlers
  const setPlayState = (state) => {
    dispatch(changePlayState(state));
  };

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      const onLoadStart = (_) => {
        setPlayState(false);
        dispatch(changeCurrentTime(0));
        dispatch(changeRecitingStatus("loading"));
      };
      const onEnded = (_) => setPlayState(false);
      const onLoadedData = (e) => {
        setDuration(isNaN(e.target.duration) ? 0 : e.target.duration);
      };
      const onCanPlayThrough = (e) => {
        dispatch(changeRecitingStatus("idle"));
      };
      const onTimeUpdate = (e) => {
        setDuration(isNaN(e.target.duration) ? 0 : e.target.duration);
        dispatch(changeCurrentTime(e.target.currentTime));
      };
      const onProgress = (e) => {
        e.target.buffered.length > 0 &&
          setDownloaded(e.target.buffered.end(e.target.buffered.length - 1));
      };

      const onWaiting = (e) => {
        if (!audioRef.current.paused) dispatch(changeRecitingStatus("loading"));
      };

      const events = {
        loadstart: onLoadStart,
        ended: onEnded,
        canplaythrough: onCanPlayThrough,
        timeupdate: onTimeUpdate,
        loadeddata: onLoadedData,
        progress: onProgress,
        waiting: onWaiting,
      };
      Object.entries(events).forEach((event) =>
        audio.addEventListener(event[0], event[1])
      );
      return () => {
        Object.entries(events).forEach((event) =>
          audio.removeEventListener(event[0], event[1])
        );
      };
    }
  }, [audioRef.current]);

  useEffect(() => {
    if (src !== "") {
      audioRef.current.src = src;
      audioRef.current.type = "audio/mpeg";
      audioRef.current.load();
    } else {
      audioRef.current.removeAttribute("src");
      audioRef.current.load();
    }
  }, [src]);

  return (
    <div className="audio-cont" style={{ direction: "ltr" }}>
      <HtmlAudio audioRef={audioRef} src={src} />
      <PlayControl duration={duration} />
      <DisplayTrack
        audioRef={audioRef}
        duration={duration}
        progressEnd={downloaded}
      />
      <Volume audioRef={audioRef} />
    </div>
  );
};

export default Audio;
