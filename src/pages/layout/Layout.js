import React, { useEffect } from "react";
import MainHeading from "../../basic-components/MainHeading/MainHeading";
import Properties from "../../components/Properties/Properties";
import { Outlet, useLocation } from "react-router-dom";
import Pagination from "../../basic-components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { changePage, getCurrentPage } from "../../rtk/slices/swarSlice";
import { fetchAyahs } from "../../rtk/slices/telawaSlice";
import "./Layout.scss";

const Layout = () => {
  const currentPage = useSelector(getCurrentPage);
  const location = useLocation();

  const dispatch = useDispatch();
  const setCurrentPage = (page) => {
    dispatch(changePage(page));
  };

  useEffect(() => {
    if (currentPage > 0) dispatch(fetchAyahs(currentPage));
  }, [currentPage, dispatch]);

  return (
    <div className="container">
      <MainHeading
        headText={location.pathname === "/tafsir" ? "تفسير" : "تلاوة"}
      />
      <div className="body">
        <Properties />
        <div className="text">
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
