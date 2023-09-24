import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { alquranCloudApi } from "../urls";
import axios from "axios";

// async thunks
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
    if (tafsirType) {
      const res = await axios(
        `${alquranCloudApi}/page/${currentPage}/${tafsirType}`
      );
      return res.data.data.ayahs;
    } else return [];
  }
);

const initialState = {
  tafsirText: { entities: [], status: "idle", error: null },
  tafsirTypes: { entities: [], status: "idle", error: null },
  currentTafsir: "",
  savedAyah: JSON.parse(localStorage.getItem("tafsirSaved")) || {},
};

const tafsirSlice = createSlice({
  name: "tafsir",
  initialState,
  reducers: {
    changeTafsir(state, action) {
      state.currentTafsir = action.payload;
    },
    changeTafsirSavedAyah(state, action) {
      localStorage.setItem("tafsirSaved", JSON.stringify(action.payload));
      state.savedAyah = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTafsirTypes.pending, (state, action) => {
        state.tafsirTypes.status = "loading";
      })
      .addCase(fetchTafsirTypes.fulfilled, (state, action) => {
        state.tafsirTypes.entities = action.payload;
        state.tafsirTypes.status = "idle";
      })
      .addCase(fetchTafsirTypes.rejected, (state, action) => {
        state.tafsirTypes.status = "idle";
        state.tafsirTypes.error = action.error.message;
      });

    builder
      .addCase(fetchTafsirText.pending, (state, action) => {
        state.tafsirText.status = "loading";
      })
      .addCase(fetchTafsirText.fulfilled, (state, action) => {
        state.tafsirText.entities = action.payload;
      })
      .addCase(fetchTafsirText.rejected, (state, action) => {
        state.tafsirText.status = "idle";
        state.tafsirText.error = action.error.message;
      });
  },
});

// selectors
export const getTafsirTypes = (state) => state.tafsir.tafsirTypes.entities;
export const getCurrentTafsir = (state) => state.tafsir.currentTafsir;
export const getTafsirText = (state) => state.tafsir.tafsirText.entities;
export const getTafsirSavedAyah = (state) => state.tafsir.savedAyah;
export const getTafsirTypesStatus = (state) => state.swar.status;
export const getTafsirTextError = (state) => state.swar.error;

// action creators
export const { changeTafsir, changeTafsirSavedAyah } = tafsirSlice.actions;

// reducer
export default tafsirSlice.reducer;
