import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { alquranCloudApi } from "../urls";
import axios from "axios";

const initialState = {
  tafsirText: [],
  tafsirTypes: [],
  currentTafsir: "",
};

export const fetchTafsirTypes = createAsyncThunk(
  "tafsir/fetchTafsirTypes",
  async () => {
    const res = await axios(`${alquranCloudApi}/edition/type/tafsir`);
    return res.data.data;
  }
);

export const fetchTafsirText = createAsyncThunk(
  "tafsir/fetchTafsirText",
  async ({ currentPage, tafsirType }) => {
    const res = await axios(
      `${alquranCloudApi}/page/${currentPage}/${tafsirType}`
    );
    return res.data.data.ayahs;
  }
);

const tafsirSlice = createSlice({
  name: "tafsir",
  initialState,
  reducers: {
    changeTafsir(state, action) {
      state.currentTafsir = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchTafsirTypes.fulfilled, (state, action) => {
        state.tafsirTypes = action.payload;
      })
      .addCase(fetchTafsirText.fulfilled, (state, action) => {
        state.tafsirText = action.payload;
      }),
});

export const getTafsirTypes = (state) => state.tafsir.tafsirTypes;
export const getCurrentTafsir = (state) => state.tafsir.currentTafsir;
export const getTafsirText = (state) => state.tafsir.tafsirText;

export default tafsirSlice.reducer;
export const { changeTafsir } = tafsirSlice.actions;
