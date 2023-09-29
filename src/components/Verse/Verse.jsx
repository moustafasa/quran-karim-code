import React, { memo, useEffect, useRef, useState } from "react";
import "./Verse.scss";
import ContextMenu from "../../basic-components/ContextMenu/ContextMenu";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  changeCurrentRecitingAyah,
  changeCurrentTime,
  changePlayState,
  getAyahTimingById,
  getCurrentPlayState,
  getCurrentReciterId,
  getCurrentRecitingAyah,
  getCurrentTime,
  getIsActiveRecitingAyah,
  getIsFirstPlay,
  getRecitingStatus,
} from "../../rtk/slices/recitingSlice";
import AyahText from "../../basic-components/AyahText/AyahText";
import {
  changeTelawaSavedAyah,
  getAyahById,
  getIsTelawaActiveReading,
  isActiveReading,
} from "../../rtk/slices/telawaSlice";
import {
  changeTafsirSavedAyah,
  getIsTafsirActiveReading,
} from "../../rtk/slices/tafsirSlice";
import {
  changeFocus,
  checkFocusedAyah,
  getCurrentSorah,
} from "../../rtk/slices/swarSlice";
import useContextPosition from "../../customHooks/useContextPosition";
import { useLongPress } from "use-long-press";

const Verse = ({ ayahId, page }) => {
  // states
  const [contextShow, setContextShow] = useState(false);
  const [contextPosition, setContextPosition] = useState({ left: 0, top: 0 });

  const longPressBind = useLongPress(
    (e) => {
      setContextShow(true);
      const touch = e.touches[0];
      setContextPosition(contextPositionSet(touch?.pageX, touch?.pageY));
    },
    { detect: "touch" }
  );

  // selectors
  const ayah = useSelector((state) => getAyahById(state, ayahId));
  const activeReciting = useSelector(
    (state) => getIsActiveRecitingAyah(state, ayahId) && page === "telawa",
    shallowEqual
  );
  const activeReading = useSelector(
    (state) =>
      page === "telawa"
        ? getIsTelawaActiveReading(state, ayahId)
        : getIsTafsirActiveReading(state, ayahId),
    shallowEqual
  );

  const ayahTiming = useSelector((state) =>
    getAyahTimingById(state, ayah.numberInSurah)
  );
  const playState = useSelector(getCurrentPlayState);
  const isFocused = useSelector((state) => checkFocusedAyah(state, ayahId));
  const currentReciter = useSelector(getCurrentReciterId);
  const currentSorah = useSelector(getCurrentSorah);
  const recitingStatus = useSelector(getRecitingStatus);
  const isFirstPlay = useSelector(getIsFirstPlay, shallowEqual);

  // others
  const ayahRef = useRef();
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const basmalahRgX = /بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ/g;
  const contextPositionSet = useContextPosition();

  // handlers
  const showContextMenu = (e) => {
    e.preventDefault();
    setContextShow(true);
    setContextPosition(contextPositionSet(e.pageX, e.pageY));
  };

  const basmalahCheck = (ayah) => {
    return ayah.numberInSurah === 1 && Boolean(ayah.text.match(basmalahRgX));
  };
  const basmalah = (
    <span className="basmalah">بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ</span>
  );

  const options = [
    {
      text: page === "telawa" ? "تفسير" : "تلاوة",
      handler() {
        page === "telawa" ? navigator("/tafsir") : navigator("/");
        dispatch(changeFocus(ayahId));
        setContextShow(false);
      },
    },
    {
      text: "استماع",
      async handler() {
        if (ayahTiming) {
          if (playState) {
            await dispatch(changePlayState(false));
          }
          await dispatch(changeCurrentTime(ayahTiming.start_time + 0.00001));
          await dispatch(changePlayState(true));
        }
        setContextShow(false);
      },
      disabled:
        +currentReciter < 0 ||
        +ayah.surah.number !== +currentSorah ||
        (recitingStatus === "loading" && isFirstPlay),
    },
    {
      text: "حفظ التقدم",
      handler() {
        const changeSavedAyah =
          page === "telawa" ? changeTelawaSavedAyah : changeTafsirSavedAyah;
        dispatch(
          changeSavedAyah({
            ayahId,
            page: ayah.page,
          })
        );
        setContextShow(false);
      },
    },
  ];

  // effects
  // show and hide context menu
  useEffect(() => {
    const hideContextMenuOnBlur = (e) => {
      if (contextShow) {
        if (
          !e.target.closest(`.verse-text[data-id='${ayah.number}']`) &&
          !e.target.closest(".context-menu")
        ) {
          setContextShow(false);
        }
      }
    };
    ["click", "contextmenu", "touchstart"].forEach((event) => {
      document.addEventListener(event, hideContextMenuOnBlur);
    });
    return () => {
      ["click", "contextmenu", "touchstart"].forEach((event) => {
        document.removeEventListener(event, hideContextMenuOnBlur);
      });
    };
  }, [ayah.number, contextShow]);

  // scroll into active reciting ayah
  useEffect(() => {
    if ((activeReciting && playState) || isFocused) {
      ayahRef.current.scrollIntoView();
    }
  }, [activeReciting, playState, isFocused]);

  // clearFocus
  useEffect(() => {
    if (isFocused) {
      window.setTimeout(() => {
        dispatch(changeFocus(null));
      }, 2000);
    }
  }, [isFocused, dispatch]);
  return (
    <>
      {basmalahCheck(ayah) && basmalah}
      <div
        className={`verse-text ${(activeReciting || contextShow) && "active"} ${
          activeReading && "active-reading"
        } ${isFocused && "focused"}`}
        onContextMenu={showContextMenu}
        data-id={ayah.number}
        ref={ayahRef}
        {...longPressBind()}
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
