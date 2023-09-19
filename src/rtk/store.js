import { configureStore } from "@reduxjs/toolkit";
import swarSlice from "./slices/swarSlice";
import telawaSlice from "./slices/telawaSlice";
import tafsirSlice from "./slices/tafsirSlice";
import recitingSlice from "./slices/recitingSlice";
import searchSlice from "./slices/searchSlice";

export default configureStore({
  reducer: {
    swar: swarSlice,
    telawa: telawaSlice,
    tafsir: tafsirSlice,
    reciting: recitingSlice,
    search: searchSlice,
  },
});
