import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { mp3quranApi } from "../../rtk/urls";

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
    return [
      ...reciters.map((reciter) => {
        return {
          id: reciter.id,
          name: reciter.name,
          server: reciter.moshaf
            ? reciter.moshaf[0].server
            : reciter.folder_url,
        };
      }),
    ];
  }
);

export const fetchAyatTiming = createAsyncThunk(
  "reciting/fetchAyatTiming",
  async ({ sorah, rId }) => {
    const res = await axios(
      `${mp3quranApi}/ayat_timing?surah=${sorah}&read=${rId}`
    );
    return res.data;
  }
);

const initialState = {
  recitingType: "",
  reciters: [],
  ayatTiming: [],
  currentReciter: "",
  currentTime: 0,
  currentAyah: 0,
  playState: false,
};
const recitingSlice = createSlice({
  name: "reciting",
  initialState,
  reducers: {
    changeRecitingType(state, action) {
      state.recitingType = action.payload;
      state.currentReciter = "";
      state.ayatTiming = [];
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReciters.fulfilled, (state, action) => {
      state.reciters = action.payload;
    });
    builder.addCase(fetchAyatTiming.fulfilled, (state, action) => {
      state.ayatTiming = action.payload.map((ayah) => {
        ayah.start_time /= 1000;
        ayah.end_time /= 1000;
        return ayah;
      });
    });
  },
});

export const getRecitingType = (state) => state.reciting.recitingType;
export const getRecitersList = (state) => state.reciting.reciters;
export const getCurrentReciterId = (state) => state.reciting.currentReciter;
export const getCurrentReciter = (state, rId) =>
  state.reciting.reciters.filter((reciter) => reciter.id === +rId)[0];
export const getCurrentTime = (state) => state.reciting.currentTime;
export const getAyahTimingById = (state, id) =>
  state.reciting.ayatTiming.filter((ayah) => +ayah.ayah === +id)[0];
export const getAllAyahTiming = (state) => state.reciting.ayatTiming;
export const getCurrentPlayState = (state, id) => state.reciting.playState;
export const getCurrentRecitingAyah = (state) => state.reciting.currentAyah;

export default recitingSlice.reducer;
export const {
  changeRecitingType,
  changeCurrentReciter,
  changeCurrentTime,
  changePlayState,
} = recitingSlice.actions;

export const { changeCurrentRecitingAyah } = recitingSlice.actions;
