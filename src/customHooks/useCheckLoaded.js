// #region constants

// #endregion

// #region functions

// #endregion

/**
 *
 */
const useCheckLoaded = () => {
  return (audio, time) => {
    // Get the buffered ranges
    let buffered = audio.buffered;

    // Check if any range contains the given time
    for (let i = 0; i < buffered.length; i++) {
      if (time >= buffered.start(i) && time <= buffered.end(i)) {
        // The audio is loaded at this time
        return true;
      }
    }

    // The audio is not loaded at this time
    return false;
  };
};

export default useCheckLoaded;
