// imports
import React, { useState, useRef, useEffect } from "react";
import PlayControl from "./PlayControl/PlayControl";
import DisplayTrack from "./DisplayTrack/DisplayTrack";
import Volume from "./Volume/Volume";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrentTime,
  changePlayState,
  getCurrentPlayState,
} from "../../rtk/slices/recitingSlice";
import "./Audio.scss";
import HtmlAudio from "./HtmlAudio";

const Audio = ({ src }) => {
  // states
  const [duration, setDuration] = useState(0);
  const [canPlay, setCanPlay] = useState(false);
  const [downloaded, setDownloaded] = useState(0);

  // selectors
  const playState = useSelector(getCurrentPlayState);
  const dispatch = useDispatch();

  // refs
  const audioRef = useRef();

  // handlers
  const setPlayState = (state) => {
    dispatch(changePlayState(state));
  };
  const playHandler = () => {
    setPlayState(!playState);
  };

  // effects
  // useEffect(
  //   (_) => {
  //     audioRef.current.load();
  //   },
  //   [src]
  // );
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      const onLoadStart = (_) => {
        setPlayState(false);
        dispatch(changeCurrentTime(0));
      };
      const onEnded = (_) => setPlayState(false);
      const onLoadedData = (e) => {
        setDuration(isNaN(e.target.duration) ? 0 : e.target.duration);
      };
      const onCanPlayThrough = (e) => setCanPlay(true);
      const onTimeUpdate = (e) => {
        setDuration(isNaN(e.target.duration) ? 0 : e.target.duration);
        dispatch(changeCurrentTime(e.target.currentTime));
      };
      const onProgress = (e) => {
        e.target.buffered.length > 0 &&
          setDownloaded(e.target.buffered.end(e.target.buffered.length - 1));
      };

      const events = {
        loadstart: onLoadStart,
        ended: onEnded,
        canplaythrough: onCanPlayThrough,
        timeupdate: onTimeUpdate,
        loadeddata: onLoadedData,
        progress: onProgress,
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
    if (src) {
      audioRef.current.src = src;
      audioRef.current.type = "audio/mpeg";
      // audioRef.current.load();
    }
  }, [src]);

  return (
    <div className="audio-cont" style={{ direction: "ltr" }}>
      {/* <audio
        ref={audioRef}
        preload="auto"
        // events
        onLoadStart={(_) => {
          setPlayState(false);
          dispatch(changeCurrentTime(0));
        }}
        onEnded={(_) => setPlayState(false)}
        onLoadedData={(e) => {
          setDuration(isNaN(e.target.duration) ? 0 : e.target.duration);
        }}
        onCanPlayThrough={(e) => setCanPlay(true)}
        onTimeUpdate={(e) => {
          setDuration(isNaN(e.target.duration) ? 0 : e.target.duration);
          dispatch(changeCurrentTime(e.target.currentTime));
        }}
        onProgress={(e) => {
          e.target.buffered.length > 0 &&
            setDownloaded(e.target.buffered.end(e.target.buffered.length - 1));
        }}
        crossOrigin="anonymous"
      >
        <source src={src} type="audio/mpeg" />
        the audio not supported
      </audio> */}
      <HtmlAudio audioRef={audioRef} src={src} />
      <PlayControl playHandler={playHandler} canPlay={canPlay} />
      <DisplayTrack
        audioRef={audioRef}
        duration={duration}
        progressEnd={downloaded}
        canPlay={canPlay}
      />
      <Volume audioRef={audioRef} />
    </div>
  );
};

export default Audio;
