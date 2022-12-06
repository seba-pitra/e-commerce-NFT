import React from 'react';
import * as actions from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import './PageSelector.css'

export default function PageSelector(){
    const nftQuantity = useSelector(state => state.filteredNfts.length)
    const nftsPerPage = useSelector(state => state.nftsPerPage);
    const activePage = useSelector(state => state.activePage);
    const dispatch = useDispatch();

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(nftQuantity/nftsPerPage); i++) {
        pageNumbers.push(i);
    }
    const lastPageNumber = pageNumbers[pageNumbers.length -1];

    return (
            <div className='page-numbers'>
                <button 
                    onClick={()=> dispatch(actions.previousPage())} 
                    className={activePage === 1 ? "hidden" : "page-button"}
                >
                        &#x21e6;
                </button>
                {pageNumbers.map(pageNumber => {
                    return <button 
                            key={pageNumber} 
                            onClick={()=> dispatch(actions.selectPage(pageNumber))}
                            className={activePage === pageNumber ? "active-page" : "page-button"}
                            >
                        {pageNumber}
                    </button>
                })}
                <button 
                    onClick={()=> dispatch(actions.nextPage())}
                    className={activePage === lastPageNumber ? "hidden" : "page-button"} 
                >&#x21e8;</button>
            </div>
    )

}