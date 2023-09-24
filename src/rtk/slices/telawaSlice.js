import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { alquranCloudApi } from "../urls";
import axios from "axios";

// thunks
export const fetchAyahs = createAsyncThunk(
  "telawa/fetchAyahs",
  async (page, { rejectWithValue }) => {
    const res = await axios(`${alquranCloudApi}/pageft/${page}`);
    return res.data.data.ayahs;
  }
);

const initialState = {
  ayahs: [],
  savedAyah: JSON.parse(localStorage.getItem("telawaSaved")) || {},
  status: "idle",
  error: null,
};
const telawaSlice = createSlice({
  name: "telawa",
  initialState,
  reducers: {
    changeTelawaSavedAyah(state, action) {
      localStorage.setItem("telawaSaved", JSON.stringify(action.payload));
      state.savedAyah = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAyahs.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAyahs.fulfilled, (state, action) => {
        state.ayahs = action.payload;
        state.status = "idle";
      })
      .addCase(fetchAyahs.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

// selectors
export const getAyahs = (state) => state.telawa.ayahs;
export const getTelawaSavedAyah = (state) => state.telawa.savedAyah;
export const getTelawaStatus = (state) => state.telawa.status;
export const getTelawaError = (state) => state.telawa.error;

// action creators
export const { changeTelawaSavedAyah } = telawaSlice.actions;

// reducer
export default telawaSlice.reducer;
