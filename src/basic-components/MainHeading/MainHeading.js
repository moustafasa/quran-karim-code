import React from "react";
import headingImg from "../../imgs/heading.png";

import "./MainHeading.scss";

const MainHeading = ({ headText }) => {
  return (
    <h2 className="main-heading">
      <span>{headText}</span>
      <img src={headingImg} alt="اطار اسلامي يوضع بداخله عنوان الصفحة" />
    </h2>
  );
};

export default MainHeading;
