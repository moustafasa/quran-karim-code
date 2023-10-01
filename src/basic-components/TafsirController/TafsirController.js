import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectBox from "../../basic-components/SelectBox/SelectBox";
import {
  changeTafsir,
  fetchTafsirTypes,
  getCurrentTafsir,
  getTafsirTypes,
} from "../../rtk/slices/tafsirSlice";

const TafsirController = () => {
  // selectors and dispatch
  const dispatch = useDispatch();
  const tafasir = useSelector(getTafsirTypes);
  const currentTafsir = useSelector(getCurrentTafsir);

  // options
  const options = [
    { text: "اختر", value: "" },
    ...tafasir.map((tafsir) => {
      return { text: tafsir.name, value: tafsir.identifier };
    }),
  ];

  // handlers
  const changeTafsirValue = (taf) => {
    dispatch(changeTafsir(taf));
  };

  // effects
  useEffect(() => {
    dispatch(fetchTafsirTypes());
  }, []);

  return (
    <div className="swar-controller controller">
      <span>نوع التفسير</span>
      <SelectBox
        valueState={[currentTafsir, changeTafsirValue]}
        options={options}
        ariaLabel="اختار احد التفاسير"
      />
    </div>
  );
};

export default TafsirController;
