import React, { memo, useState } from "react";
import SelectBox from "../../basic-components/SelectBox/SelectBox";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSorah,
  getAllSwar,
  getCurrentSorah,
} from "../../rtk/slices/swarSlice";

const SwarController = () => {
  // selectors and dispatch
  const currentSorah = useSelector(getCurrentSorah);
  const swar = useSelector(getAllSwar);
  const dispatch = useDispatch();

  const options = [
    { value: 0, text: "الفهرس" },
    ...swar.map((sorah) => {
      return { value: sorah.id, text: sorah.name };
    }),
  ];

  // handlers
  const chooseSorah = (sorah) => {
    dispatch(changeSorah(sorah));
  };

  return (
    <div className="swar-controller controller">
      <span>السورة</span>
      <SelectBox valueState={[+currentSorah, chooseSorah]} options={options} />
    </div>
  );
};

export default memo(SwarController);
