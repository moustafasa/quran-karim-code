import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { mp3quranApi, alquranCloudApi } from "../urls";
import axios from "axios";

// async thunks
export const fetchSwar = createAsyncThunk("swar/fetchSwar", async () => {
  const res = await axios(`${mp3quranApi}/suwar`);
  return res.data.suwar;
});

export const changePageByAyah = createAsyncThunk(
  "swar/changePageByAyah",
  async (ayah, { dispatch, getState }) => {
    if (/[:]/g.test(ayah)) {
      const res = await axios(`${alquranCloudApi}/ayah/${ayah}`);
      dispatch(choosePage(res.data.data.page));
      dispatch(chooseSorah(res.data.data.surah.number));
    } else {
      const surah = getCurrentSorah(getState());
      const res = await axios(`${alquranCloudApi}/ayah/${surah}:${ayah}`);
      dispatch(changePage(res.data.data.page));
    }
  }
);

// thunks
export const changePage = (page) => (dispatch, getState) => {
  dispatch(choosePage(page));

  if (+page !== 0) {
    const swar = getAllSwar(getState());
    const currentSurah = getCurrentSorah(getState());
    const pageSwar = swar.filter(
      (sorah) => sorah.start_page <= page && sorah.end_page >= page
    );

    if (pageSwar.findIndex((surah) => +surah.id === +currentSurah) < 0)
      dispatch(chooseSorah(pageSwar[0]?.id));
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

const initialState = {
  swar: [],
  currentPage: 0,
  currentSorah: 0,
  focus: null,
  status: "idle",
  error: null,
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
    changeFocus(state, action) {
      state.focus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSwar.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSwar.fulfilled, (state, action) => {
        state.swar = action.payload;
        state.status = "success";
      })
      .addCase(fetchSwar.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

// selectors
export const getAllSwar = (state) => state.swar.swar;
export const getSurahById = createSelector(
  [getAllSwar, (state, id) => id],
  (swar, id) => swar.find((sorah) => +sorah.id === +id)
);

export const getCurrentPage = (state) => state.swar.currentPage;
export const getCurrentSorah = (state) => state.swar.currentSorah;
export const checkFocusedAyah = (state, ayah) => state.swar.focus === ayah;
export const getSwarStatus = (state) => state.swar.status;
export const getSwarError = (state) => state.swar.error;

// actions
export const { changeFocus } = swarSlice.actions;
const { choosePage, chooseSorah } = swarSlice.actions;

// reducer
export default swarSlice.reducer;
