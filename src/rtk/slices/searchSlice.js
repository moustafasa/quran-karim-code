import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { quranApi } from "../urls";

// async thunks
export const fetchResults = createAsyncThunk(
  "search/fetchResults",
  async ({ q, page }) => {
    const res = await axios(`${quranApi}/search?q=${q}&page=${page}`);
    return res.data.search;
  }
);

const initialState = {
  results: [],
  total_pages: 0,
  current_page: 0,
  total_results: 0,
  query: "",
  status: "idle",
  error: null,
};
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.status = "idle";
        return {
          ...state,
          ...action.payload,
        };
      })
      .addCase(fetchResults.pending, (state, action) => {
        state.status = "idle";
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      });
  },
});

// selector
export const getAllResults = (state) => state.search.results;
export const getTotalSearchPages = (state) => state.search.total_pages;
export const getCurrentSearchPage = (state) => state.search.current_page;
export const getQuery = (state) => state.search.query;
export const getSearchStatus = (state) => state.search.status;
export const getSearchError = (state) => state.search.error;

// reducer
export default searchSlice.reducer;
