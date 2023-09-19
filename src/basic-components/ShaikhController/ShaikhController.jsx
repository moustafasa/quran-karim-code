import React, { useState, memo, useEffect } from "react";
import SelectBox from "../../basic-components/SelectBox/SelectBox";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrentReciter,
  fetchAyatTiming,
  fetchReciters,
  getCurrentReciterId,
  getRecitersList,
  getRecitingType,
} from "../../rtk/slices/recitingSlice";
import { getCurrentSorah } from "../../rtk/slices/swarSlice";

const ShaikhController = () => {
  const dispatch = useDispatch();

  const rType = useSelector(getRecitingType);
  const sorah = useSelector(getCurrentSorah);
  const reciters = useSelector(getRecitersList);

  const currentReciter = useSelector(getCurrentReciterId);

  const chooseCurrentReciter = (rId) => {
    dispatch(changeCurrentReciter(rId));
    if (rType === "VerseByVerse") dispatch(fetchAyatTiming({ sorah, rId }));
  };
  useEffect(() => {
    dispatch(fetchReciters({ rType, sorah }));
  }, [rType, sorah, dispatch]);

  const options = [
    { value: "", text: "اختر" },
    ...reciters.map((reciter) => {
      return { value: reciter.id, text: reciter.name };
    }),
  ];

  return (
    <div className="shaikh-controller controller">
      <span>القارئ</span>
      <SelectBox
        options={options}
        valueState={[currentReciter, chooseCurrentReciter]}
      />
    </div>
  );
};

export default memo(ShaikhController);
