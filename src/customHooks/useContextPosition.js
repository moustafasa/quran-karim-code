// #region constants

// #endregion

// #region functions

// #endregion

/**
 *
 */
const useContextPosition = () => {
  return (x, y) => {
    const right = window.innerWidth - x + "px";
    const left = window.innerWidth - Number.parseFloat(right) + "px";
    const top = y + "px";
    if (Number.parseFloat(right) < 242 && Number.parseFloat(left) < 242) {
      return { left: "10px", top };
    } else {
      if (Number.parseFloat(right) < Number.parseFloat(left))
        return { right, top };
      else return { left, top };
    }
  };
};

export default useContextPosition;
