import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { quranApi, alquranCloudApi } from "../urls";

const initialState = {
  results: [],
  total_pages: 0,
  current_page: 0,
  total_results: 0,
  query: "",
};

export const fetchResults = createAsyncThunk(
  "search/fetchResults",
  async (query) => {
    const res = await axios(`${quranApi}/search?q=${query}`);
    return res.data.search;
  }
);

export const changeSearchPage = createAsyncThunk(
  "search/changeSearchPage",
  async (page, { getState }) => {
    const query = getQuery(getState());
    const res = await axios(`${quranApi}/search?q=${query}&page=${page}`);
    return res.data.search;
  }
);

export const fetchSearchedAyah = createAsyncThunk(
  "search/fetchSearchedAyah",
  async (key) => {
    const res = await axios(`${alquranCloudApi}/ayah/${key}`);
    return {
      page: res.data.data.page,
      numberInSurah: res.data.data.numberInSurah,
    };
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchResults.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
    builder.addCase(changeSearchPage.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
  },
});

export default searchSlice.reducer;

export const getAllResults = (state) => state.search.results;
export const getResultsWithFilters = (state, sorah) =>
  state.search.results.filter(
    (verse) => +verse.verse_key.split(":")[0] === +sorah
  );
export const getTotalSearchPages = (state) => state.search.total_pages;
export const getCurrentSearchPage = (state) => state.search.current_page;
export const getQuery = (state) => state.search.query;
