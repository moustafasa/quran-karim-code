import React, { useRef } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
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
  const [, setSearchParams] = useSearchParams();

  // handlers
  const searchHanlder = (e) => {
    if (e.target.value !== "" && e.target.value !== " ") {
      if (!/search/g.test(location.pathname)) {
        lastPath.current = location.pathname;
        navigator(`/search?q=${e.target.value}`);
      } else {
        setSearchParams({ q: e.target.value }, { replace: true });
      }
    } else {
      if (
        /search/g.test(location.pathname) &&
        !/search/g.test(lastPath.current)
      )
        navigator(lastPath.current);
    }
  };

  return (
    <header>
      <div className="container">
        <Link to={"/"} className="logo">
          <img src={logo} alt="القرءان الكريم" />
          <h1>موقع القرءان الكريم</h1>
        </Link>
        <div className="search">
          <input
            type="text"
            placeholder="بحث..."
            lang="ar"
            onKeyUp={searchHanlder}
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
