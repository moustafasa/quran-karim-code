import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SorahName from "../../basic-components/SorahName/SorahName";
import "./Tafsir.scss";
import TafsirVerse from "../../components/TafsirVerse/TafsirVerse";
import Fehres from "../../components/Fehres/Fehres";
import { getCurrentPage } from "../../rtk/slices/swarSlice";
import {
  fetchTafsirText,
  getCurrentTafsir,
  getTafsirText,
  getTafsirTextStatus,
} from "../../rtk/slices/tafsirSlice";
import { getAyahs } from "../../rtk/slices/telawaSlice";
import useSpinnerWithMinTime from "../../customHooks/useSpinnerWithMinTime";
import Spinner from "../../basic-components/Spinner/Spinner";

const Tafsir = () => {
  // selectors
  const currentPage = useSelector(getCurrentPage);
  const tafsirType = useSelector(getCurrentTafsir);
  const tafsir = useSelector(getTafsirText);
  const sorahText = useSelector(getAyahs);
  const dispatch = useDispatch();
  const tafsirStatus = useSelector(getTafsirTextStatus);
  const spinnerShowed = useSpinnerWithMinTime(tafsirStatus);

  // effects
  useEffect(() => {
    if (currentPage > 0 && tafsirStatus === "idle")
      dispatch(fetchTafsirText({ currentPage, tafsirType }));
  }, [currentPage, tafsirType, dispatch]);

  // supcomponents
  console.log(spinnerShowed);
  const tafsirText = () =>
    spinnerShowed ? (
      <Spinner />
    ) : tafsir.length > 0 ? (
      sorahText.map((ayah) => (
        <Fragment key={ayah.number}>
          {+ayah.numberInSurah === 1 && <SorahName ayah={ayah} />}
          <TafsirVerse ayah={ayah} tafsir={tafsir} />
        </Fragment>
      ))
    ) : (
      <p className="tafsir-msg">من فضلك اختار احد التفاسير من اعلي</p>
    );

  return (
    <div className="tafsir">
      {currentPage === 0 ? <Fehres /> : tafsirText()}
    </div>
  );
};

export default Tafsir;
