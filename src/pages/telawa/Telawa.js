import React, { Fragment, useEffect } from "react";

import Fehres from "../../components/Fehres/Fehres";
import SorahName from "../../basic-components/SorahName/SorahName";
import Verse from "../../components/Verse/Verse";

import "./Telawa.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  changePageByAyah,
  getCurrentPage,
  getCurrentSorah,
} from "../../rtk/slices/swarSlice";
import {
  getAyahs,
  getTelawaSavedAyah,
  getTelawaStatus,
} from "../../rtk/slices/telawaSlice";
import {
  changeCurrentRecitingAyah,
  getAllAyahTiming,
  getCurrentPlayState,
  getCurrentRecitingAyah,
  getCurrentTime,
} from "../../rtk/slices/recitingSlice";

const Telawa = () => {
  // selectors
  const sorahText = useSelector(getAyahs);
  const currentPage = useSelector(getCurrentPage);
  const currentTime = useSelector(getCurrentTime);
  const ayahTiming = useSelector(getAllAyahTiming);
  const currentRecitingAyah = useSelector(getCurrentRecitingAyah);
  const playState = useSelector(getCurrentPlayState);
  const savedAyah = useSelector(getTelawaSavedAyah);
  const currentSorah = useSelector(getCurrentSorah);

  // others
  const dispatch = useDispatch();

  // effects

  // change ayah depending on current time
  useEffect(() => {
    if (ayahTiming.length > 0) {
      const ayah = ayahTiming.find(
        (ayah) => currentTime >= ayah.start_time && currentTime <= ayah.end_time
      );
      ayah && dispatch(changeCurrentRecitingAyah(ayah.ayah));
    }
  }, [currentTime, ayahTiming, dispatch]);

  // change page depending on current ayah
  useEffect(() => {
    if (sorahText.length > 0) {
      const samePage = sorahText.findIndex(
        (ayah) => ayah.page === "currentPage"
      );
      if (samePage < 0 && +currentRecitingAyah !== 0) {
        dispatch(changePageByAyah(currentRecitingAyah));
      }
    }
  }, [currentRecitingAyah]);

  // subComponent
  const ayahText = () => {
    return sorahText.map((ayah) => {
      const active =
        +currentRecitingAyah === +ayah.numberInSurah &&
        +currentSorah === +ayah.surah.number &&
        playState;

      const activeReading =
        savedAyah &&
        savedAyah?.surah === ayah.surah.number &&
        savedAyah?.ayah === ayah.numberInSurah;
      return (
        <Fragment key={ayah.number}>
          {ayah.numberInSurah === 1 && <SorahName ayah={ayah} />}
          <Verse
            ayah={ayah}
            activeReciting={active}
            activeReading={activeReading}
            page={"telawa"}
          />
        </Fragment>
      );
    });
  };

  return (
    <div className="telawa">{+currentPage !== 0 ? ayahText() : <Fehres />}</div>
  );
};

export default Telawa;
