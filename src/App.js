import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import AudioController from "./components/AudioController/AudioController";
import Telawa from "./pages/telawa/Telawa";
import Tafsir from "./pages/tafsir/Tafsir";
import Layout from "./pages/layout/Layout";
import Search from "./pages/Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { fetchSwar, getAllSwar } from "./rtk/slices/swarSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const swar = useSelector(getAllSwar);

  useEffect(() => {
    dispatch(fetchSwar());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      {swar.length > 0 ? (
        <div className="content">
          <Routes>
            <Route path="/*" element={<Layout />}>
              <Route path="*" element={<Telawa />} />
              <Route path="tafsir" element={<Tafsir />} />
            </Route>
            <Route path="/search/:q" element={<Search />} />
          </Routes>
        </div>
      ) : null}
      <AudioController />
    </div>
  );
}

export default App;
