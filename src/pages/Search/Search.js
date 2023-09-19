import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MainHeading from "../../basic-components/MainHeading/MainHeading";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSearchPage,
  fetchResults,
  getAllResults,
  getCurrentSearchPage,
  getTotalResults,
  getTotalSearchPages,
} from "../../rtk/slices/searchSlice";
import Pagination from "../../basic-components/Pagination/Pagination";
import SearchResult from "../../components/SearchResult/SearchResult";

const Search = () => {
  const { q } = useParams();

  const dispatch = useDispatch();
  const results = useSelector(getAllResults);
  const totalPages = useSelector(getTotalSearchPages);
  const currentPage = useSelector(getCurrentSearchPage);

  const setCurrentPage = (page) => {
    dispatch(changeSearchPage(page));
  };

  useEffect(() => {
    if (q) dispatch(fetchResults(q));
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
      <ul>
        {results.map((verse) => (
          <SearchResult verse={verse} key={verse.verse_key} />
        ))}
      </ul>
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
