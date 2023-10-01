import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { alquranCloudApi } from "../urls";

// thunks
export const fetchAyahs = createAsyncThunk(
  "telawa/fetchAyahs",
  async (page) => {
    const res = await axios(`${alquranCloudApi}/page/${page}`);
    return res.data.data.ayahs;
  }
);

const ayasEntity = createEntityAdapter({
  selectId: (ayah) => {
    return `${ayah.surah.number}:${ayah.numberInSurah}`;
  },
});

const initialState = ayasEntity.getInitialState({
  savedAyah: JSON.parse(localStorage.getItem("telawaSaved")) || {},
  status: "idle",
});

const telawaSlice = createSlice({
  name: "telawa",
  initialState,
  reducers: {
    changeTelawaSavedAyah(state, action) {
      localStorage.setItem("telawaSaved", JSON.stringify(action.payload));
      state.savedAyah = action.payload;
    },
    changeTelawaStatus(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAyahs.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAyahs.fulfilled, (state, action) => {
        ayasEntity.setAll(state, action.payload);
        state.status = "success";
      })
      .addCase(fetchAyahs.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

// selectors
// export const getAyahs = (state) => state.telawa.ayahs;
export const getTelawaSavedAyah = (state) => state.telawa.savedAyah;
export const getTelawaStatus = (state) => state.telawa.status;
// export const getTelawaError = (state) => state.telawa.error;
export const getIsTelawaActiveReading = createSelector(
  [getTelawaSavedAyah, (state, ayah) => ayah],
  (savedAyah, ayahId) => savedAyah.ayahId === ayahId
);

export const { selectIds: getAyahs, selectById: getAyahById } =
  ayasEntity.getSelectors((state) => state.telawa);

// action creators
export const { changeTelawaSavedAyah, changeTelawaStatus } =
  telawaSlice.actions;

// reducer
export default telawaSlice.reducer;
