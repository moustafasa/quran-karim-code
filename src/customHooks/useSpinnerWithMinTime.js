// #region constants

import { useEffect, useRef, useState } from "react";

// #endregion

// #region functions

// #endregion

/**
 *
 */
const useSpinnerWithMinTime = (status, minTime = 500) => {
  const [isTimeDue, setIsTimeDue] = useState(true);
  const timeRef = useRef();

  useEffect(() => {
    if (status === "loading") {
      setIsTimeDue(false);
      clearTimeout(timeRef.current);
      timeRef.current = setTimeout(() => {
        setIsTimeDue(true);
      }, minTime);
    }
  }, [status]);

  return status === "loading" || !isTimeDue;
};

export default useSpinnerWithMinTime;
