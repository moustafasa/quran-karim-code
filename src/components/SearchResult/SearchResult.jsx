import React, { useState } from "react";
import sass from "./SearchResult.module.scss";
import AyahText from "../../basic-components/AyahText/AyahText";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFocus,
  changePageByAyah,
  getAllSwar,
} from "../../rtk/slices/swarSlice";

import { Link, useNavigate } from "react-router-dom";
import {
  changePlayState,
  getCurrentPlayState,
} from "../../rtk/slices/recitingSlice";

export default function SearchResult({ verse }) {
  const [active, setActive] = useState();

  // selectors
  const swar = useSelector(getAllSwar);
  const dispatch = useDispatch();
  // functions
  const verseSorah = (verse) =>
    swar.find((surah) => {
      return +surah.id === +verse.verse_key.split(":")[0];
    });
  const verseNumber = (verse) => verse.verse_key.split(":")[1];
  const playState = useSelector(getCurrentPlayState);

  const navigator = useNavigate();

  // handler
  const goHandler = async (e, path) => {
    e.preventDefault();
    setActive(path);
    if (playState) await dispatch(changePlayState(false));
    await dispatch(changePageByAyah(verse.verse_key));
    dispatch(changeFocus(verse.verse_key));
    navigator(path);
  };

  return (
    <li className={sass.searchResult}>
      <div className={sass.ayahText}>
        <AyahText text={verse.text} numberInSurah={verseNumber(verse)} />
      </div>
      <div className={sass.controller}>
        <div className={sass.info}>
          <span>سورة : </span>
          <span className={sass.value}>{verseSorah(verse).name}</span>
        </div>
        <div className={sass.btns}>
          <Link
            className={active && (active === "/" ? sass.active : sass.disabled)}
            onClick={(e) => goHandler(e, "/")}
          >
            تلاوة
          </Link>
          <Link
            className={
              active && (active === "/tafsir" ? sass.active : sass.disabled)
            }
            onClick={(e) => goHandler(e, "/tafsir")}
          >
            تفسير
          </Link>
        </div>
      </div>
    </li>
  );
}
