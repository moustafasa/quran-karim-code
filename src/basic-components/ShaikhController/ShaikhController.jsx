import React, { memo, useEffect } from "react";
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
  // selectors and dispatch
  const rType = useSelector(getRecitingType);
  const sorah = useSelector(getCurrentSorah);
  const reciters = useSelector(getRecitersList);
  const currentReciter = useSelector(getCurrentReciterId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (rType === "VerseByVerse") {
      if (+currentReciter > -1 && +sorah > 0) {
        dispatch(fetchAyatTiming({ sorah, rId: currentReciter }));
      }
    }
  }, [rType, currentReciter, sorah, dispatch]);

  // handlers
  const chooseCurrentReciter = (rId) => {
    dispatch(changeCurrentReciter(rId));
  };

  const options = [
    { value: -1, text: "اختر" },
    ...reciters.map((reciter) => {
      return { value: reciter.id, text: reciter.name };
    }),
  ];

  // effects
  useEffect(() => {
    dispatch(fetchReciters({ rType, sorah }));
  }, [rType, sorah, dispatch]);

  return (
    <div className="shaikh-controller controller">
      <span>القارئ</span>
      <SelectBox
        options={options}
        valueState={[+currentReciter, chooseCurrentReciter]}
      />
    </div>
  );
};

export default memo(ShaikhController);
