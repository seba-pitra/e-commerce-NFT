import React from "react";
import * as actions from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import "./PageSelector.css";

export default function PageSelector() {
  const activePage = useSelector((state) => state.activePage);
  const nftsPerPage = useSelector((state) => state.nftsPerPage);
  const nftQuantity = useSelector((state) => state.filteredNfts.length);
  const dispatch = useDispatch();

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(nftQuantity / nftsPerPage); i++) {
    pageNumbers.push(i);
  }

  const lastPageNumber = pageNumbers[pageNumbers.length - 1];

  const previousPage = () => {
    dispatch(actions.previousPage());
  };

  const nextPage = () => {
    dispatch(actions.nextPage());
  };

  const selectPage = (e) => {
    dispatch(actions.selectPage(parseInt(e.target.value)));
  };

  return (
    <div className="page-numbers">
      <button
        onClick={() => {
          previousPage();
        }}
        className={activePage === 1 ? "hidden" : "page-button"}
      >
        &#x21e6;
      </button>
      {pageNumbers.map((pageNumber) => {
        return (
          <button
            key={pageNumber}
            value={pageNumber}
            onClick={(e) => {
              selectPage(e);
            }}
            className={
              activePage === pageNumber ? "active-page" : "page-button"
            }
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        onClick={() => {
          nextPage();
        }}
        className={activePage === lastPageNumber ? "hidden" : "page-button"}
      >
        &#x21e8;
      </button>
    </div>
  );
}
