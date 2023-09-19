import React from "react";
import "./Properties.scss";
import SwarController from "../../basic-components/SwarController.jsx/SwarController";
import { useSelector } from "react-redux";
import {
  getCurrentPage,
  getCurrentSorah,
  getSurahById,
} from "../../rtk/slices/swarSlice";
import TafsirController from "../../basic-components/TafsirController/TafsirController";
import { Route, Routes } from "react-router-dom";
import ShaikhController from "../../basic-components/ShaikhController/ShaikhController";
import RecitingType from "../../basic-components/RecitingType/RecitingType";

const Properties = () => {
  const page = useSelector(getCurrentPage);
  const currentSorah = useSelector(getCurrentSorah);
  const sorahObj = useSelector((state) => getSurahById(state, currentSorah));

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
      <ul className="info">
        <li className="saved-verse-btn">
          <button>متابعة القراءة من حيث انتهيت</button>
        </li>
        <li className="page">
          <span className="page-label">الصفحة : </span>
          <span className="page-num">{page}</span>
        </li>
        <li className="page">
          <span className="page-label">بداية السورة : </span>
          <span className="page-num">{sorahObj?.start_page || 0}</span>
        </li>
        <li className="page">
          <span className="page-label">نهاية السورة : </span>
          <span className="page-num">{sorahObj?.end_page || 0}</span>
        </li>
      </ul>
    </div>
  );
};

export default Properties;
