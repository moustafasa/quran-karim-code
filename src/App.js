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
const Telawa = lazy(() => import("./pages/telawa/Telawa"));
const Tafsir = lazy(() => import("./pages/tafsir/Tafsir"));

function App() {
  const dispatch = useDispatch();
  const swarStatus = useSelector(getSwarStatus);
  const swarError = useSelector(getSwarError);

  useEffect(() => {
    if (swarStatus === "idle") dispatch(fetchSwar());
  }, [dispatch, swarStatus]);

  const content = () => {
    switch (swarStatus) {
      case "loading":
        return <Spinner />;
      case "success":
        return (
          <div className="content">
            <Routes>
              <Route path="/*" element={<Layout />}>
                <Route
                  path="*"
                  element={
                    <Suspense fallback=<Spinner />>
                      <Telawa />
                    </Suspense>
                  }
                />
                <Route
                  path="tafsir"
                  element={
                    <Suspense fallback=<Spinner />>
                      <Tafsir />
                    </Suspense>
                  }
                />
              </Route>
              <Route path="/search/:q" element={<Search />} />
            </Routes>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={sass.App}>
      <Header />
      {content()}
      <AudioController />
      <ToastContainer />
    </div>
  );
}

export default App;
