import React from "react";
import sorahNameImg from "../../imgs/sorahName.png";
import sorahNameMobileImg from "../../imgs/heading.png";
import "./SorahName.scss";
import { useSelector } from "react-redux";
import { getAyahById } from "../../rtk/slices/telawaSlice";

const SorahName = ({ ayahId }) => {
  const ayah = useSelector((state) => getAyahById(state, ayahId));
  return (
    <div className="sorah-name">
      <picture>
        <source srcSet={sorahNameMobileImg} media="(max-width:767px)" />
        <img src={sorahNameImg} alt="sorah Name" />
      </picture>
      <h2>{ayah.surah.name}</h2>
    </div>
  );
};

export default SorahName;
