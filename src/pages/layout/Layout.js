import React, { useEffect } from "react";
import MainHeading from "../../basic-components/MainHeading/MainHeading";
import Properties from "../../components/Properties/Properties";
import { Outlet, useLocation } from "react-router-dom";
import Pagination from "../../basic-components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { changePage, getCurrentPage } from "../../rtk/slices/swarSlice";
import { fetchAyahs, getTelawaStatus } from "../../rtk/slices/telawaSlice";
import sass from "./Layout.module.scss";

const Layout = () => {
  const currentPage = useSelector(getCurrentPage);
  const telawaStatus = useSelector(getTelawaStatus);
  const location = useLocation();

  const dispatch = useDispatch();
  const setCurrentPage = (page) => {
    dispatch(changePage(page));
  };

  useEffect(() => {
    if (currentPage > 0 && telawaStatus === "idle")
      dispatch(fetchAyahs(currentPage));
  }, [currentPage, dispatch]);

  return (
    <div className={sass.container + " container"}>
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
