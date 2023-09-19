import React from "react";
import { useLocation } from "react-router-dom";
import headingImg from "../../imgs/heading.png";

import "./MainHeading.scss";

const MainHeading = ({ headText }) => {
  return (
    <h2 className="main-heading">
      <span>{headText}</span>
      <img src={headingImg} alt="heading" />
    </h2>
  );
};

export default MainHeading;
