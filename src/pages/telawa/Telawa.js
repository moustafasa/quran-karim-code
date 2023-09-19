import React, { Fragment, useEffect, useRef, useState } from "react";

import Fehres from "../../components/Fehres/Fehres";
import SorahName from "../../basic-components/SorahName/SorahName";
import Verse from "../../components/Verse/Verse";

import "./Telawa.scss";
import { useDispatch, useSelector } from "react-redux";
import { changePageByAyah, getCurrentPage } from "../../rtk/slices/swarSlice";
import { getAyahs } from "../../rtk/slices/telawaSlice";
import {
  changeCurrentRecitingAyah,
  getAllAyahTiming,
  getCurrentPlayState,
  getCurrentRecitingAyah,
  getCurrentTime,
} from "../../rtk/slices/recitingSlice";

const Telawa = () => {
  const sorahText = useSelector(getAyahs);
  const currentPage = useSelector(getCurrentPage);
  const currentTime = useSelector(getCurrentTime);
  const ayahTiming = useSelector(getAllAyahTiming);
  const currentRecitingAyah = useSelector(getCurrentRecitingAyah);
  const playState = useSelector(getCurrentPlayState);
  const samePageRef = useRef(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (ayahTiming.length > 0) {
      const ayah = ayahTiming.find(
        (ayah) => currentTime >= ayah.start_time && currentTime <= ayah.end_time
      );
      ayah && dispatch(changeCurrentRecitingAyah(ayah.ayah));
    }
  }, [currentTime, ayahTiming, dispatch]);

  useEffect(() => {
    if (sorahText.length > 0) {
      if (!samePageRef.current && +currentRecitingAyah !== 0) {
        dispatch(changePageByAyah(currentRecitingAyah));
      }
    }
  }, [currentRecitingAyah]);

  const ayahText = () => {
    samePageRef.current = false;
    return sorahText.map((ayah) => {
      const active = currentRecitingAyah === ayah.numberInSurah && playState;
      if (active) {
        samePageRef.current = true;
      }
      return (
        <Fragment key={ayah.number}>
          <SorahName ayah={ayah} />
          <Verse ayah={ayah} active={active} page={"telawa"} />
        </Fragment>
      );
    });
  };

  return (
    <div className="telawa">{+currentPage !== 0 ? ayahText() : <Fehres />}</div>
  );
};

export default Telawa;
