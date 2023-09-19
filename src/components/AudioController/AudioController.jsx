import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getCurrentReciter,
  getCurrentReciterId,
} from "../../rtk/slices/recitingSlice";
import Audio from "../../basic-components/Audio/Audio";
import { getCurrentSorah } from "../../rtk/slices/swarSlice";
import "./AudioController.scss";
import axios from "axios";

const AudioController = () => {
  const currentSorah = useSelector(getCurrentSorah);
  const rId = useSelector(getCurrentReciterId);
  const currentReciter = useSelector((state) => getCurrentReciter(state, rId));
  const src = currentReciter
    ? currentReciter.server + currentSorah.toString().padStart(3, "0") + ".mp3"
    : "";

  return (
    <div className="audio-controller">
      <div className="container">
        <Audio src={src} />
      </div>
    </div>
  );
};

export default AudioController;
