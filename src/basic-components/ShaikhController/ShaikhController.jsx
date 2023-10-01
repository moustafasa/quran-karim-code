import React, { memo, useEffect } from "react";
import SelectBox from "../../basic-components/SelectBox/SelectBox";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAyatTimingStatus,
  changeCurrentReciter,
  fetchAyatTiming,
  fetchReciters,
  getAyatTimingReciter,
  getAyatTimingSorah,
  getAyatTimingStatus,
  getCurrentReciterId,
  getRecitersList,
  getRecitingType,
  resetAyatTiming,
} from "../../rtk/slices/recitingSlice";
import { getCurrentSorah } from "../../rtk/slices/swarSlice";

const ShaikhController = () => {
  // selectors and dispatch
  const rType = useSelector(getRecitingType);
  const sorah = useSelector(getCurrentSorah);
  const reciters = useSelector(getRecitersList);
  const currentReciter = useSelector(getCurrentReciterId);
  const ayatTimngStatus = useSelector(getAyatTimingStatus);
  const ayatTimngSorah = useSelector(getAyatTimingSorah);
  const ayatTimingReciter = useSelector(getAyatTimingReciter);
  const dispatch = useDispatch();

  useEffect(() => {
    if (rType === "" || +currentReciter === -1 || sorah === 0) {
      dispatch(resetAyatTiming());
    } else {
      dispatch(changeAyatTimingStatus("idle"));
    }
  }, [rType, currentReciter, sorah, dispatch]);

  useEffect(() => {
    if (rType === "VerseByVerse") {
      if (
        +currentReciter > -1 &&
        +sorah > 0 &&
        ayatTimngStatus === "idle" &&
        (+sorah !== +ayatTimngSorah || +currentReciter !== +ayatTimingReciter)
      ) {
        dispatch(fetchAyatTiming({ sorah, rId: currentReciter }));
      }
    }
  }, [rType, currentReciter, sorah, ayatTimngStatus, dispatch]);

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
