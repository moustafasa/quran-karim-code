import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { mp3quranApi, alquranCloudApi } from "../../rtk/urls";

// async thunks
export const fetchReciters = createAsyncThunk(
  "reciting/fetchReciters",
  async ({ rType, sorah }) => {
    let reciters = [];
    if (+sorah !== 0) {
      if (rType === "VerseByVerse") {
        const res = await axios(`${mp3quranApi}/ayat_timing/reads`);
        reciters = res.data.filter((reciter) => +reciter.soar_count === 114);
      } else if (rType === "translation") {
        const res = await axios(
          `${mp3quranApi}/reciters?surah=${sorah}&rewaya=1`
        );
        reciters = res.data.reciters;
      }
    }
    const exclusion = {
      21: 21,
      35: 35,
      42: 42,
      45: 45,
      49: 49,
      52: 52,
      105: 105,
      115: 115,
      218: 218,
      222: 222,
    };
    let filteredReciters = [];

    for (let i = 0; i < reciters.length; i++) {
      let reciter = reciters[i];
      if (!exclusion[reciter.id]) {
        filteredReciters.push({
          id: reciter.id,
          name: reciter.name,
          server: reciter.moshaf
            ? reciter.moshaf[0].server
            : reciter.folder_url,
        });
      } else {
        continue;
      }
    }

    return filteredReciters;
  }
);

export const fetchAyatTiming = createAsyncThunk(
  "reciting/fetchAyatTiming",
  async ({ sorah, rId }) => {
    const res = await axios(
      `${mp3quranApi}/ayat_timing?surah=${sorah}&read=${rId}`
    );
    return { data: res.data, sorah };
  }
);

const initialState = {
  recitingType: "",
  reciters: { entities: [], status: "idle", error: null },
  ayatTiming: { entities: [], status: "idle", error: null, sorah: 0 },
  currentReciter: -1,
  currentTime: 0,
  currentAyah: 0,
  playState: false,
  recitingStatus: "idle",
};
const recitingSlice = createSlice({
  name: "reciting",
  initialState,
  reducers: {
    changeRecitingType(state, action) {
      state.recitingType = action.payload;
      state.currentReciter = -1;
      state.ayatTiming.entities = [];
      state.currentAyah = 0;
    },
    changeCurrentReciter(state, action) {
      state.currentReciter = action.payload;
    },
    changeCurrentTime(state, action) {
      state.currentTime = action.payload;
    },
    changePlayState(state, action) {
      state.playState = action.payload;
    },
    changeCurrentRecitingAyah(state, action) {
      state.currentAyah = action.payload;
    },
    changeRecitingStatus(state, action) {
      state.recitingStatus = action.payload;
    },
    changeAyatTimingStatus(state, action) {
      state.ayatTiming.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReciters.fulfilled, (state, action) => {
        state.reciters.entities = action.payload;
        state.reciters.status = "idle";
      })
      .addCase(fetchReciters.pending, (state, action) => {
        state.reciters.status = "loading";
      })
      .addCase(fetchReciters.rejected, (state, action) => {
        state.reciters.status = "idle";
      });
    builder
      .addCase(fetchAyatTiming.fulfilled, (state, action) => {
        state.ayatTiming.entities = action.payload.data.map((ayah) => {
          ayah.start_time /= 1000;
          ayah.end_time /= 1000;
          return ayah;
        });
        state.ayatTiming.sorah = action.payload.sorah;
        state.ayatTiming.status = "success";
      })
      .addCase(fetchAyatTiming.pending, (state, action) => {
        state.ayatTiming.status = "loading";
        state.ayatTiming.entities = [];
      })
      .addCase(fetchAyatTiming.rejected, (state, action) => {
        state.ayatTiming.status = "idle";
      });
  },
});

// selectors
export const getRecitersList = (state) => state.reciting.reciters.entities;
export const getRecitingType = (state) => state.reciting.recitingType;
export const getCurrentReciterId = (state) => state.reciting.currentReciter;
export const getAllAyahTiming = (state) => state.reciting.ayatTiming.entities;
export const getCurrentReciter = createSelector(
  [getRecitersList, (state, rId) => rId],
  (reciters, rId) => reciters.filter((reciter) => reciter.id === +rId)[0]
);
export const getAyahTimingById = createSelector(
  [getAllAyahTiming, (state, id) => id],
  (ayatTiming, id) => ayatTiming.filter((ayah) => +ayah.ayah === +id)[0]
);
export const getCurrentTime = (state) => state.reciting.currentTime;
export const getCurrentPlayState = (state) => state.reciting.playState;
export const getCurrentRecitingAyah = (state) => state.reciting.currentAyah;
export const getIsActiveRecitingAyah = createSelector(
  [getCurrentRecitingAyah, (state, id) => id],
  (currentRecitng, nowAyah) => currentRecitng === nowAyah
);
export const getAyatTimingStatus = (state) => state.reciting.ayatTiming.status;
export const getAyatTimingError = (state) => state.reciting.ayatTiming.error;
export const getRecitersStatus = (state) => state.reciting.reciters.status;
export const getRecitingStatus = (state) => state.reciting.recitingStatus;
export const getRecitersError = (state) => state.reciting.reciters.error;
export const getAyatTimingSorah = (state) => state.reciting.ayatTiming.sorah;
export const getIsFirstPlay = createSelector(
  [(state) => getCurrentTime(state) === 0],
  (value) => value
);

// action creators
export const {
  changeRecitingType,
  changeCurrentReciter,
  changeCurrentTime,
  changePlayState,
  changeRecitingStatus,
  changeAyatTimingStatus,
} = recitingSlice.actions;
export const { changeCurrentRecitingAyah } = recitingSlice.actions;

// reducer
export default recitingSlice.reducer;
