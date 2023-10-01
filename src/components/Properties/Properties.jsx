import React from "react";
import "./Properties.scss";
import SwarController from "../../basic-components/SwarController.jsx/SwarController";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFocus,
  changePageByAyah,
  getCurrentPage,
  getCurrentSorah,
  getSurahById,
} from "../../rtk/slices/swarSlice";
import TafsirController from "../../basic-components/TafsirController/TafsirController";
import { Route, Routes, useLocation } from "react-router-dom";
import ShaikhController from "../../basic-components/ShaikhController/ShaikhController";
import RecitingType from "../../basic-components/RecitingType/RecitingType";
import { getTafsirSavedAyah } from "../../rtk/slices/tafsirSlice";
import { getTelawaSavedAyah } from "../../rtk/slices/telawaSlice";
import { changePlayState } from "../../rtk/slices/recitingSlice";

const Properties = () => {
  // others
  const location = useLocation();
  const dispatch = useDispatch();

  // selectors
  const page = useSelector(getCurrentPage);
  const currentSorah = useSelector(getCurrentSorah);
  const sorahObj = useSelector((state) => getSurahById(state, currentSorah));
  const savedAyah = useSelector((state) =>
    location.pathname === "/tafsir"
      ? getTafsirSavedAyah(state)
      : getTelawaSavedAyah(state)
  );

  // handlers
  const goToSavedAyahHandler = () => {
    dispatch(changePlayState(false));
    dispatch(changePageByAyah(savedAyah.ayahId));
    dispatch(changeFocus(savedAyah.ayahId));
  };

  return (
    <div className="propierties">
      <div className="controllers">
        <SwarController />
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <RecitingType />
                <ShaikhController />
              </>
            }
          />
          <Route path="/tafsir" element=<TafsirController /> />
        </Routes>
      </div>
      <div className="info">
        <button
          className="saved-verse-btn"
          onClick={goToSavedAyahHandler}
          disabled={!Boolean(savedAyah)}
        >
          متابعة القراءة من حيث انتهيت
        </button>
        <ul className="data">
          <li>
            <span className="page-label">الصفحة : </span>
            <span className="page-num">{page}</span>
          </li>
          <li>
            <span className="page-label">بداية السورة : </span>
            <span className="page-num">{sorahObj?.start_page || 0}</span>
          </li>
          <li>
            <span className="page-label">نهاية السورة : </span>
            <span className="page-num">{sorahObj?.end_page || 0}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Properties;
