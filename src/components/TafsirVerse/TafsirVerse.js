import React from "react";
import Verse from "../Verse/Verse";
import "./TafsirVerse.scss";
import { useSelector } from "react-redux";
import { getTafsirSavedAyah } from "../../rtk/slices/tafsirSlice";

const TafsirVerse = ({ ayah, tafsir }) => {
  const savedAyah = useSelector(getTafsirSavedAyah);
  const activeReading =
    savedAyah &&
    savedAyah?.surah === ayah.surah.number &&
    savedAyah?.ayah === ayah.numberInSurah;

  return (
    <div className="tafsir-verse">
      <Verse ayah={ayah} page={"tafsir"} activeReading={activeReading} />
      <div className="tafsir-text">
        {
          tafsir.filter((taf) => taf.numberInSurah === ayah.numberInSurah)[0]
            ?.text
        }
      </div>
    </div>
  );
};

export default TafsirVerse;
