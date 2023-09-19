import React, { useEffect, useState } from "react";
import {
  FaVolumeDown,
  FaVolumeMute,
  FaVolumeOff,
  FaVolumeUp,
} from "react-icons/fa";

const Volume = ({ audioRef }) => {
  const [volume, setVolume] = useState(100);
  const [mute, setMute] = useState(false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume, audioRef]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = mute;
  }, [mute, audioRef]);

  return (
    <div className="volume">
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
    </div>
  );
};

export default Volume;
