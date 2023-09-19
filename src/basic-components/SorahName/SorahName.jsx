import React from "react";
import sorahNameImg from "../../imgs/sorahName.png";
import sorahNameMobileImg from "../../imgs/heading.png";
import "./SorahName.scss";

const SorahName = ({ ayah }) => {
  return (
    +ayah.numberInSurah === 1 && (
      <div className="sorah-name">
        <picture>
          <source srcSet={sorahNameMobileImg} media="(max-width:767px)" />
          <img src={sorahNameImg} alt="sorah Name" />
        </picture>
        <h2>{ayah.surah.name}</h2>
      </div>
    )
  );
};

export default SorahName;
