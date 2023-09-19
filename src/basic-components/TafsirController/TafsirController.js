import React, { useEffect, useState } from "react";
import SelectBox from "../../basic-components/SelectBox/SelectBox";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTafsir,
  fetchTafsirTypes,
  getCurrentTafsir,
  getTafsirTypes,
} from "../../rtk/slices/tafsirSlice";

const TafsirController = () => {
  const dispatch = useDispatch();
  const tafasir = useSelector(getTafsirTypes);

  // select value
  const currentTafsir = useSelector(getCurrentTafsir);
  const changeTafsirValue = (taf) => {
    dispatch(changeTafsir(taf));
  };

  // options
  const options = [
    { text: "اختر", value: "" },
    ...tafasir.map((tafsir) => {
      return { text: tafsir.name, value: tafsir.identifier };
    }),
  ];

  useEffect(() => {
    dispatch(fetchTafsirTypes());
  }, []);

  return (
    <div className="swar-controller controller">
      <span>نوع التفسير</span>
      <SelectBox
        valueState={[currentTafsir, changeTafsirValue]}
        options={options}
      />
    </div>
  );
};

export default TafsirController;
