import React from "react";
import Verse from "../Verse/Verse";
import "./TafsirVerse.scss";
import { useSelector } from "react-redux";
import {
  getTafsirById,
  getTafsirSavedAyah,
} from "../../rtk/slices/tafsirSlice";

const TafsirVerse = ({ ayahId }) => {
  const tafsirText = useSelector((state) => getTafsirById(state, ayahId));
  return (
    <div className="tafsir-verse">
      <Verse ayahId={ayahId} page={"tafsir"} />
      <div className="tafsir-text">{tafsirText?.text}</div>
    </div>
  );
};

export default TafsirVerse;
