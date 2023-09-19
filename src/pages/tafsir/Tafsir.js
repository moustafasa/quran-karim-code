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
} from "../../rtk/slices/tafsirSlice";
import { getAyahs } from "../../rtk/slices/telawaSlice";

const Tafsir = () => {
  const currentPage = useSelector(getCurrentPage);
  const tafsirType = useSelector(getCurrentTafsir);
  const tafsir = useSelector(getTafsirText);
  const sorahText = useSelector(getAyahs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentPage > 0 && tafsirType)
      dispatch(fetchTafsirText({ currentPage, tafsirType }));
  }, [currentPage, tafsirType, dispatch]);

  const tafsirText = () =>
    tafsir.length > 0
      ? sorahText.map((ayah) => (
          <Fragment key={ayah.number}>
            <SorahName ayah={ayah} />
            <TafsirVerse ayah={ayah} tafsir={tafsir} />
          </Fragment>
        ))
      : null;
  return (
    <div className="tafsir">
      {currentPage === 0 ? <Fehres /> : tafsirText()}
    </div>
  );
};

export default Tafsir;
