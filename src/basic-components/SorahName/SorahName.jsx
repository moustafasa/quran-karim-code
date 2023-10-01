import React, { memo } from "react";
import { useSelector } from "react-redux";
import sorahNameMobileImg from "../../imgs/heading.png";
import sorahNameImg from "../../imgs/sorahName.png";
import { getAyahById } from "../../rtk/slices/telawaSlice";
import "./SorahName.scss";

const SorahName = ({ ayahId }) => {
  const ayah = useSelector((state) => getAyahById(state, ayahId));
  return (
    <div className="sorah-name">
      <picture>
        <source srcSet={sorahNameMobileImg} media="(max-width:767px)" />
        <img src={sorahNameImg} alt="اطار اسلامي يوضع بداخله اسم الصورة" />
      </picture>
      <h2>{ayah.surah.name}</h2>
    </div>
  );
};

export default memo(SorahName);
