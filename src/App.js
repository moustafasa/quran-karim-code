import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import AudioController from "./components/AudioController/AudioController";
import Layout from "./pages/layout/Layout";
import Search from "./pages/Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { fetchSwar, getSwarError, getSwarStatus } from "./rtk/slices/swarSlice";
import { Suspense, lazy, useEffect } from "react";
import Spinner from "./basic-components/Spinner/Spinner";
import sass from "./App.module.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSpinnerWithMinTime from "./customHooks/useSpinnerWithMinTime";
import Telawa from "./pages/telawa/Telawa";
import Tafsir from "././pages/tafsir/Tafsir";

function App() {
  const dispatch = useDispatch();
  const swarStatus = useSelector(getSwarStatus);
  const spinnerShowed = useSpinnerWithMinTime(swarStatus);

  useEffect(() => {
    if (swarStatus === "idle") dispatch(fetchSwar());
  }, [dispatch, swarStatus]);

  const content = () => {
    if (spinnerShowed) return <Spinner />;
    else if (swarStatus === "success") {
      return (
        <div className={sass.content}>
          <Routes>
            <Route path="/*" element={<Layout />}>
              <Route path="*" element={<Telawa />} />
              <Route path="tafsir" element={<Tafsir />} />
            </Route>
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      );
    }
  };

  return (
    <div className={sass.App}>
      <Header />
      {content()}
      {/* <Spinner /> */}
      {/* <div className="content">
        <Spinner />
      </div> */}
      <AudioController />
      <ToastContainer />
    </div>
  );
}

export default App;
