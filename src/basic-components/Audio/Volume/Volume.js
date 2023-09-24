import React, { memo, useEffect, useState } from "react";
import {
  FaVolumeDown,
  FaVolumeMute,
  FaVolumeOff,
  FaVolumeUp,
} from "react-icons/fa";
import "./Volume.scss";

const Volume = ({ audioRef }) => {
  // states
  const [volume, setVolume] = useState(100);
  const [mute, setMute] = useState(false);

  // effects
  // seeking volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume, audioRef]);

  // mute handler
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = mute;
  }, [mute, audioRef]);

  return (
    <div className="volume">
      <button className="volume-btn audio-btn" onClick={() => setMute(!mute)}>
        {mute ? (
          <FaVolumeMute />
        ) : volume < 5 ? (
          <FaVolumeOff />
        ) : volume < 40 ? (
          <FaVolumeDown />
        ) : (
          <FaVolumeUp />
        )}
      </button>
      <div className="range-cont">
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          style={{ "--progress": `${volume}%` }}
          disabled={mute}
          onChange={(e) => {
            setVolume(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default memo(Volume);
