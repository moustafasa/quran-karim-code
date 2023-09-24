import React, { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.scss";
import logo from "../../imgs/logo.jpeg";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getQuery } from "../../rtk/slices/searchSlice";

const Header = () => {
  // variables
  const query = useSelector(getQuery);
  const navigator = useNavigate();
  const location = useLocation();
  const lastPath = useRef();

  // handlers
  const searchHanlder = (e) => {
    if (e.target.value !== "" && e.target.value !== " ") {
      if (!/search/g.test(location.pathname)) {
        lastPath.current = location.pathname;
      }
      navigator(`/search/${e.target.value}`);
    } else {
      navigator(lastPath.current);
    }
  };

  return (
    <header>
      <div className="container">
        <div className="logo">
          <img src={logo} alt="القرءان الكريم" />
          <h1>موقع القرءان الكريم</h1>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="بحث..."
            lang="ar"
            onChange={searchHanlder}
            defaultValue={query}
          />
          <button>
            <FaSearch />
          </button>
        </div>
        <nav>
          <Link to={"/"}>تلاوة</Link>
          <Link to={"/tafsir"}>تفسير</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
