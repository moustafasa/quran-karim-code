import React, { useState } from "react";
import SelectBox from "../SelectBox/SelectBox";
import { useDispatch, useSelector } from "react-redux";
import {
  changeRecitingType,
  getRecitingType,
} from "../../rtk/slices/recitingSlice";

const RecitingType = () => {
  const dispatch = useDispatch();

  const recitingValue = useSelector(getRecitingType);
  const chooseRecitingType = (type) => {
    dispatch(changeRecitingType(type));
  };

  const options = [
    {
      value: "",
      text: "اختار",
    },
    {
      value: "VerseByVerse",
      text: "متابعة اية باية",
    },
    { value: "translation", text: "قراءة بدون متابعة" },
  ];

  return (
    <div className="controller reciting-type-controller">
      <span>نوع التلاوة</span>
      <SelectBox
        options={options}
        valueState={[recitingValue, chooseRecitingType]}
      />
    </div>
  );
};

export default RecitingType;
