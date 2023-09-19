import React from "react";
import sass from "./SearchResult.module.scss";
import AyahText from "../../basic-components/AyahText/AyahText";
import { useDispatch, useSelector } from "react-redux";
import { changePageByAyah, getAllSwar } from "../../rtk/slices/swarSlice";

import { Link } from "react-router-dom";

export default function SearchResult({ verse }) {
  const swar = useSelector(getAllSwar);

  const dispatch = useDispatch();

  const verseSorah = (verse) =>
    swar.find((surah) => {
      return +surah.id === +verse.verse_key.split(":")[0];
    });
  const verseNumber = (verse) => verse.verse_key.split(":")[1];

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
            to={"/"}
            onClick={(e) => {
              dispatch(changePageByAyah(verse.verse_key));
            }}
          >
            تلاوة
          </Link>
          <Link
            to={"/tafsir"}
            onClick={(e) => {
              dispatch(changePageByAyah(verse.verse_key));
            }}
          >
            تفسير
          </Link>
        </div>
      </div>
    </li>
  );
}
