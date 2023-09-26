import React, { useEffect, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import MainHeading from "../../basic-components/MainHeading/MainHeading";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchResults,
  getAllResults,
  getCurrentSearchPage,
  getSearchStatus,
  getTotalSearchPages,
} from "../../rtk/slices/searchSlice";
import Pagination from "../../basic-components/Pagination/Pagination";
import SearchResult from "../../components/SearchResult/SearchResult";
import useSpinnerWithMinTime from "../../customHooks/useSpinnerWithMinTime";
import Spinner from "../../basic-components/Spinner/Spinner";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams?.get("q");

  const dispatch = useDispatch();
  const results = useSelector(getAllResults);
  const totalPages = useSelector(getTotalSearchPages);
  const currentPage = useSelector(getCurrentSearchPage);
  const searchStatus = useSelector(getSearchStatus);
  const spinnerShowed = useSpinnerWithMinTime(searchStatus);
  const setCurrentPage = (page) => {
    dispatch(fetchResults({ q, page: page }));
  };

  useEffect(() => {
    if (q && searchStatus === "idle") {
      dispatch(fetchResults({ q, page: 1 }));
    }
  }, [q, dispatch]);

  return (
    <div className="container">
      <MainHeading headText={"النتائج"} />
      {/* filters */}
      {/* <ul className={sass.filters}>
        <li className={sass.active}>
          <button>الكل</button>
        </li>
        {results.map((verse) => {
          const sorah = verseSorah(verse);
          return (
            <li key={verse.verse_key}>
              <button>{sorah.name}</button>
            </li>
          );
        })}
      </ul> */}
      {spinnerShowed ? (
        <Spinner />
      ) : (
        <ul>
          {results.map((verse) => (
            <SearchResult verse={verse} key={verse.verse_key} />
          ))}
        </ul>
      )}
      <Pagination
        pagesNumber={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        startPage={1}
      />
    </div>
  );
};

export default Search;
