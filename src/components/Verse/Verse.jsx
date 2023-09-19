import React, { memo, useEffect, useRef, useState } from "react";
import "./Verse.scss";
import ContextMenu from "../../basic-components/ContextMenu/ContextMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrentRecitingAyah,
  changeCurrentTime,
  changePlayState,
  getAyahTimingById,
  getCurrentPlayState,
  getCurrentRecitingAyah,
  getCurrentTime,
} from "../../rtk/slices/recitingSlice";
import AyahText from "../../basic-components/AyahText/AyahText";

const Verse = ({ ayah, active, page }) => {
  const [contextShow, setContextShow] = useState(false);
  const [contextPosition, setContextPosition] = useState({ left: 0, top: 0 });

  const ayahTiming = useSelector((state) =>
    getAyahTimingById(state, ayah.numberInSurah)
  );
  const playState = useSelector(getCurrentPlayState);
  const ayahRef = useRef();

  const dispatch = useDispatch();
  const navigator = useNavigate();

  const showContextMenu = (e) => {
    e.preventDefault();
    setContextShow(true);
    const right = window.innerWidth - e.pageX + "px";
    const left = window.innerWidth - Number.parseFloat(right) + "px";
    const top = e.pageY + "px";
    if (Number.parseFloat(right) < Number.parseFloat(left))
      setContextPosition({ right, top });
    else setContextPosition({ left, top });
  };

  const options = [
    {
      text: page === "telawa" ? "تفسير" : "تلاوة",
      handler() {
        page === "telawa" ? navigator("/tafsir") : navigator("/");
      },
    },
    {
      text: "استماع",
      async handler() {
        if (ayahTiming) {
          if (playState) {
            dispatch(changePlayState(false));
          }
          await dispatch(changeCurrentTime(ayahTiming.start_time));
          dispatch(changePlayState(true));
        }
      },
    },
    {
      text: "حفظ التقدم",
      handler() {
        localStorage.setItem(
          `${page}Saved`,
          JSON.stringify({ surah: ayah.surah.number, ayah: ayah.numberInSurah })
        );
      },
    },
  ];

  useEffect(() => {
    const hideContextMenuOnBlur = (e) => {
      if (contextShow) {
        if (!e.target.closest(`.verse-text[data-id='${ayah.numberInSurah}']`)) {
          setContextShow(false);
        }
      }
    };
    ["click", "contextmenu"].forEach((event) => {
      document.addEventListener(event, hideContextMenuOnBlur);
    });
    return () => {
      ["click", "contextmenu"].forEach((event) => {
        document.removeEventListener(event, hideContextMenuOnBlur);
      });
    };
  }, [ayah.numberInSurah, contextShow]);

  useEffect(() => {
    if (active) {
      ayahRef.current.scrollIntoView();
    }
  }, [active]);

  const basmalahRgX = /بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ/g;
  const basmalahCheck = (ayah) => {
    return ayah.numberInSurah === 1 && Boolean(ayah.text.match(basmalahRgX));
  };
  const basmalah = (
    <span className="basmalah">بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ</span>
  );

  return (
    <>
      {basmalahCheck(ayah) && basmalah}
      <div
        className={`verse-text ${(active || contextShow) && "active"}`}
        onContextMenu={showContextMenu}
        data-id={ayah.numberInSurah}
        ref={ayahRef}
      >
        {basmalahCheck(ayah) ? (
          <AyahText
            text={ayah.text.replace(basmalahRgX, "")}
            numberInSurah={ayah.numberInSurah}
          />
        ) : (
          <AyahText text={ayah.text} numberInSurah={ayah.numberInSurah} />
        )}
      </div>
      {contextShow && (
        <ContextMenu position={contextPosition} options={options} />
      )}
    </>
  );
};

export default memo(Verse);
