import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { mp3quranApi, alquranCloudApi } from "../urls";
import axios from "axios";

export const fetchSwar = createAsyncThunk("swar/fetchSwar", async () => {
  console.log("doen");
  const res = await axios(`${mp3quranApi}/suwar`);
  return res.data.suwar;
});

export const changePageByAyah = createAsyncThunk(
  "swar/changePageByAyah",
  async (ayah, { dispatch, getState }) => {
    if (/[:]/g.test(ayah)) {
      const res = await axios(`${alquranCloudApi}/ayah/${ayah}`);
      dispatch(changePage(res.data.data.page));
    } else {
      const surah = getCurrentSorah(getState());
      const res = await axios(`${alquranCloudApi}/ayah/${surah}:${ayah}`);
      dispatch(choosePage(res.data.data.page));
    }
  }
);

const initialState = {
  swar: [],
  currentPage: 0,
  currentSorah: 0,
};
const swarSlice = createSlice({
  name: "swar",
  initialState,
  reducers: {
    choosePage(state, action) {
      state.currentPage = action.payload;
    },
    chooseSorah(state, action) {
      state.currentSorah = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSwar.fulfilled, (state, action) => {
      state.swar = action.payload;
    });
  },
});

export const changePage = (page) => (dispatch, getState) => {
  dispatch(choosePage(page));

  if (+page !== 0) {
    const swar = getAllSwar(getState());
    const currentSorah = swar.filter(
      (sorah) => sorah.start_page <= page && sorah.end_page >= page
    )[0];
    dispatch(chooseSorah(currentSorah?.id));
  } else {
    dispatch(chooseSorah(0));
  }
};

export const changeSorah = (sid) => (dispatch, getState) => {
  dispatch(chooseSorah(sid));
  if (+sid !== 0) {
    const swar = getAllSwar(getState());
    const currentSorah = swar.filter((sorah) => +sorah.id === +sid)[0];
    dispatch(choosePage(currentSorah?.start_page));
  } else {
    dispatch(choosePage(0));
  }
};
export const getAllSwar = (state) => state.swar.swar;
export const getSurahById = (state, id) =>
  state.swar.swar.find((sorah) => sorah.id === id);
export const getCurrentPage = (state) => state.swar.currentPage;
export const getCurrentSorah = (state) => state.swar.currentSorah;

export default swarSlice.reducer;
const { choosePage, chooseSorah } = swarSlice.actions;
