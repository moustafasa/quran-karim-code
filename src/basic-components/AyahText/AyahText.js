import React from "react";
import scss from "./AyahText.module.scss";

const AyahText = ({ text, numberInSurah }) => {
  return (
    <>
      {text}
      <span className={scss.verseIcon} data-value={numberInSurah}>
        ۝
      </span>
    </>
  );
};

export default AyahText;
