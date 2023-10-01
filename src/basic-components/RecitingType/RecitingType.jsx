import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeRecitingType,
  getRecitingType,
} from "../../rtk/slices/recitingSlice";
import SelectBox from "../SelectBox/SelectBox";

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
        ariaLabel="اختار طريقة متابعتك التلاوة مع القارئ"
      />
    </div>
  );
};

export default RecitingType;
