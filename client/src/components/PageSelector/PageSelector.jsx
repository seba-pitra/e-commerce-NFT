import React from 'react';
import * as actions from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

export default function PageSelector({setActivePage, activePage, nftsPerPage}){
    // const nftQuantity = useSelector(state => state.filteredNfts.length)
    const nftQuantity = 20; //reemplazar esta parte con el estado global cuando el redux este listo

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(nftQuantity/nftsPerPage); i++) {
        pageNumbers.push(i);
    }

    const lastPageNumber = pageNumbers[pageNumbers.length -1];

    const previousPage = () => {
        activePage--
        setActivePage(activePage);
    };

    const nextPage = () => {
        activePage++
        setActivePage(activePage);
    };

    const selectPage = (e) => {
        setActivePage(e.target.value)
    }


    return (
            <div className='page-numbers'>
                <button 
                    onClick={()=> {previousPage()}} 
                    className={activePage === 1 ? "hidden" : "page-button"}
                >
                        &#x21e6;
                </button>
                {pageNumbers.map(pageNumber => {
                    return <button 
                            key={pageNumber}
                            value={pageNumber}
                            onClick={(e)=> {selectPage(e)}}
                            className={activePage === pageNumber ? "active-page" : "page-button"}
                            >
                        {pageNumber}
                    </button>
                })}
                <button 
                    onClick={()=> {nextPage()}}
                    className={activePage === lastPageNumber ? "hidden" : "page-button"} 
                >&#x21e8;</button>
            </div>
    )

}