import React, { memo, useState } from "react";
import SelectBox from "../../basic-components/SelectBox/SelectBox";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSorah,
  getAllSwar,
  getCurrentSorah,
} from "../../rtk/slices/swarSlice";

const SwarController = () => {
  const [selectValue, setSelectValue] = useState(0);
  const currentSorah = useSelector(getCurrentSorah);
  const dispatch = useDispatch();

  const chooseSorah = (sorah) => {
    dispatch(changeSorah(sorah));
  };

  const swar = useSelector(getAllSwar);
  const options = [
    { value: 0, text: "الفهرس" },
    ...swar.map((sorah) => {
      return { value: sorah.id, text: sorah.name };
    }),
  ];
  return (
    <div className="swar-controller controller">
      <span>السورة</span>
      <SelectBox valueState={[currentSorah, chooseSorah]} options={options} />
    </div>
  );
};

export default memo(SwarController);
