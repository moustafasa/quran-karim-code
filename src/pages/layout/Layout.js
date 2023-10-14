import React, { useEffect } from "react";
import MainHeading from "../../basic-components/MainHeading/MainHeading";
import Properties from "../../components/Properties/Properties";
import { Outlet, useLocation } from "react-router-dom";
import Pagination from "../../basic-components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { changePage, getCurrentPage } from "../../rtk/slices/swarSlice";
import {
  changeTelawaStatus,
  fetchAyahs,
  getTelawaStatus,
} from "../../rtk/slices/telawaSlice";
import sass from "./Layout.module.scss";
import FreePalestine from "../../components/freePalestine/FreePalestine";

const Layout = () => {
  const currentPage = useSelector(getCurrentPage);
  const telawaStatus = useSelector(getTelawaStatus);
  const location = useLocation();

  const dispatch = useDispatch();
  const setCurrentPage = (page) => {
    dispatch(changePage(page));
  };

  useEffect(() => {
    if (telawaStatus === "success" || telawaStatus === "error")
      dispatch(changeTelawaStatus("idle"));
  }, [currentPage, dispatch]);

  useEffect(() => {
    if (currentPage > 0 && telawaStatus === "idle") {
      dispatch(fetchAyahs(currentPage));
    }
  }, [currentPage, dispatch, telawaStatus]);

  return (
    <div className={sass.container + " container"}>
      <FreePalestine />
      <MainHeading
        headText={location.pathname === "/tafsir" ? "تفسير" : "تلاوة"}
      />
      <div className={sass.body}>
        <Properties />
        <div className={sass.text}>
          <Outlet />
        </div>
      </div>
      <Pagination
        pagesNumber={604}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Layout;
