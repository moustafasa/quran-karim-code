import React, { useCallback, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import {
  getCurrentReciter,
  getCurrentReciterId,
  getRecitingType,
} from "../../rtk/slices/recitingSlice";
import Audio from "../../basic-components/Audio/Audio";
import { getCurrentSorah } from "../../rtk/slices/swarSlice";
import "./AudioController.scss";

const AudioController = () => {
  // selectors
  const currentSorah = useSelector(getCurrentSorah, shallowEqual);
  const rId = useSelector(getCurrentReciterId, shallowEqual);
  const currentReciter = useSelector((state) => getCurrentReciter(state, rId));

  const getSrc = useCallback(
    () =>
      currentReciter && +currentSorah !== 0
        ? currentReciter.server +
          currentSorah.toString().padStart(3, "0") +
          ".mp3"
        : "",
    [currentSorah, currentReciter]
  );

  // variables
  const src = getSrc();

  return (
    <div className="audio-controller">
      <div className="container">
        <Audio src={src} />
      </div>
    </div>
  );
};

export default AudioController;
