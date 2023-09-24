import React from "react";
import SelectBox from "../SelectBox/SelectBox";
import { useDispatch, useSelector } from "react-redux";
import {
  changeRecitingType,
  getRecitingType,
} from "../../rtk/slices/recitingSlice";

const RecitingType = () => {
  // variables
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

  // dispatch function
  const dispatch = useDispatch();

  // selectors
  const recitingValue = useSelector(getRecitingType);

  // handlers
  const chooseRecitingType = (type) => {
    dispatch(changeRecitingType(type));
  };

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
