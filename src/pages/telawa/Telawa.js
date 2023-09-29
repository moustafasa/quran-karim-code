import React, { Fragment, useEffect, useRef, useState } from "react";

import Fehres from "../../components/Fehres/Fehres";
import SorahName from "../../basic-components/SorahName/SorahName";
import Verse from "../../components/Verse/Verse";

import "./Telawa.scss";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  changePageByAyah,
  getChangePageStatus,
  getCurrentPage,
  getCurrentSorah,
} from "../../rtk/slices/swarSlice";
import {
  getAyahById,
  getAyahs,
  getTelawaStatus,
} from "../../rtk/slices/telawaSlice";
import {
  changeCurrentRecitingAyah,
  getAllAyahTiming,
  getAyatTimingSorah,
  getAyatTimingStatus,
  getCurrentPlayState,
  getCurrentRecitingAyah,
  getCurrentTime,
} from "../../rtk/slices/recitingSlice";
import useSpinnerWithMinTime from "../../customHooks/useSpinnerWithMinTime";
import Spinner from "../../basic-components/Spinner/Spinner";

const Telawa = () => {
  // selectors
  const sorahText = useSelector(getAyahs);
  const currentPage = useSelector(getCurrentPage);
  const currentTime = useSelector(getCurrentTime);
  const ayahTiming = useSelector(getAllAyahTiming);
  const ayahTimingSorah = useSelector(getAyatTimingSorah);
  const currentRecitingAyah = useSelector(getCurrentRecitingAyah);
  const isCurrentRecitingAyah = useSelector((state) =>
    getAyahById(state, currentRecitingAyah)
  );
  const playState = useSelector(getCurrentPlayState);
  const currentSorah = useSelector(getCurrentSorah);
  const telawaStatus = useSelector(getTelawaStatus);
  const spinnerShowed = useSpinnerWithMinTime(
    telawaStatus,
    playState ? 100 : undefined
  );

  // others
  const dispatch = useDispatch();

  // effects

  const ayatTimngStatus = useSelector(getAyatTimingStatus);
  // change ayah depending on current time
  useEffect(() => {
    if (ayahTiming.length > 0) {
      const ayah = ayahTiming.find(
        (ayah) => currentTime >= ayah.start_time && currentTime <= ayah.end_time
      );
      if (ayah) {
        dispatch(changeCurrentRecitingAyah(`${ayahTimingSorah}:${ayah.ayah}`));
      }
    }
  }, [currentTime, ayahTiming, ayahTimingSorah, dispatch]);

  // change page depending on current ayah
  useEffect(() => {
    if (sorahText.length > 0) {
      if (!isCurrentRecitingAyah && !/:0/g.test(currentRecitingAyah)) {
        dispatch(changePageByAyah(currentRecitingAyah));
      }
    }
  }, [currentRecitingAyah, dispatch]);

  // subComponent
  const ayahText = () => {
    if (spinnerShowed) {
      return <Spinner />;
    } else {
      return sorahText.map((ayah) => {
        return (
          <Fragment key={ayah}>
            {ayah === `${currentSorah}:1` && <SorahName ayahId={ayah} />}
            <Verse ayahId={ayah} page={"telawa"} />
          </Fragment>
        );
      });
    }
  };

  return (
    <div className="telawa">{+currentPage !== 0 ? ayahText() : <Fehres />}</div>
  );
};

export default Telawa;
