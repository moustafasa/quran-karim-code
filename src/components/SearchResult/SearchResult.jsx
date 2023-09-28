import React from "react";
import sass from "./SearchResult.module.scss";
import AyahText from "../../basic-components/AyahText/AyahText";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFocus,
  changePageByAyah,
  changeSorah,
  getAllSwar,
} from "../../rtk/slices/swarSlice";

import { Link, useNavigate } from "react-router-dom";
import { changePlayState } from "../../rtk/slices/recitingSlice";

export default function SearchResult({ verse }) {
  // selectors
  const swar = useSelector(getAllSwar);
  const dispatch = useDispatch();
  // functions
  const verseSorah = (verse) =>
    swar.find((surah) => {
      return +surah.id === +verse.verse_key.split(":")[0];
    });
  const verseNumber = (verse) => verse.verse_key.split(":")[1];

  // handler
  const goHandler = async (e) => {
    await dispatch(changePlayState(false));
    dispatch(changePageByAyah(verse.verse_key));
    dispatch(changeFocus(verse.verse_key));
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
          <Link to={"/"} onClick={goHandler}>
            تلاوة
          </Link>
          <Link to={"/tafsir"} onClick={goHandler}>
            تفسير
          </Link>
        </div>
      </div>
    </li>
  );
}
