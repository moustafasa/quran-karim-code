import React, { memo, useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import "./SelectBox.scss";

/**
 * @param {options} param0 the options you need to be in select it should be like
 * [
 *     { value: "test", text: "test" },
 *     { value: "test 2", text: "test 2" },
 * ]
 * @param {valueState} param1 the state which will contain choosed value of select and the function * to set the value it should be like [selectValue,setSelect]
 * @returns customize select box
 */
const SelectBox = (
  { options, valueState: [selectValue, setSelectValue] },
  ariaLabel
) => {
  // states
  const [optOpenClass, setOptOpenClass] = useState(false);

  // handlers
  const chooseHandler = (e) => {
    setSelectValue(e.target.dataset.value);
    setOptOpenClass(false);
  };
  const openOptions = (e) => {
    e.stopPropagation();

    setOptOpenClass(!optOpenClass);
  };

  // effects
  useEffect(() => {
    const blurHandler = (e) => {
      if (!e.target.closest(".select-box")) {
        setOptOpenClass(false);
      }
    };
    document.addEventListener("click", blurHandler);
    return () => document.removeEventListener("click", blurHandler);
  }, []);

  return (
    <div className="select-box">
      <div className="overlay" onClick={openOptions}>
        {optOpenClass ? (
          <FaCaretUp className="drop-down-icon" />
        ) : (
          <FaCaretDown className="drop-down-icon" />
        )}

        <select
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value)}
          aria-label={ariaLabel}
        >
          {options.map((opt, key) => (
            <option key={opt.value + key} value={opt.value}>
              {opt.text}
            </option>
          ))}
        </select>
      </div>
      <ul className={`options ${!optOpenClass && "hidden"}`} role="listbox">
        {options.map((opt, key) => (
          <li
            key={opt.value}
            onClick={chooseHandler}
            data-value={opt.value}
            className={`${selectValue === opt.value && "active"}`}
            role="option"
            aria-selected={opt.value === selectValue}
          >
            {opt.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(SelectBox);
