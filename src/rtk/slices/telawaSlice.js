import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { alquranCloudApi } from "../urls";
import axios from "axios";

export const fetchAyahs = createAsyncThunk(
  "telawa/fetchAyahs",
  async (page) => {
    const res = await axios(`${alquranCloudApi}/page/${page}`);
    return res.data.data.ayahs;
  }
);

const initialState = { ayahs: [], currentAyah: 0 };
const telawaSlice = createSlice({
  name: "telawa",
  initialState,
  reducers: {
    changeCurrentTelawaAyah(state, action) {
      state.currentAyah = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAyahs.fulfilled, (state, action) => {
      state.ayahs = action.payload;
    });
  },
});

export const getAyahs = (state) => state.telawa.ayahs;
export const getCurrentTelawaAyah = (state) => state.telawa.currentAyah;

export default telawaSlice.reducer;
