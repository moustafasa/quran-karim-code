import React from "react";
import Verse from "../Verse/Verse";
import "./TafsirVerse.scss";

const TafsirVerse = ({ ayah, tafsir }) => {
  return (
    <div className="tafsir-verse">
      <Verse ayah={ayah} page={"tafsir"} />
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
