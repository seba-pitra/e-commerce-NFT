import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import NFTCard from "../NFTCard/NFTCard";
import NotFoundResults from "../NotFoundResults/NotFoundResults";
import PageSelector from "../PageSelector/PageSelector";
import "./Pages.css";


function Pages(){
    const filteredNfts = useSelector(state => state.filteredNfts)
    const activePage = useSelector(state => state.activePage);
    const nftsPerPage = useSelector(state => state.nftsPerPage);
    const lastNftInPage = activePage * nftsPerPage;
    const firstNftInPage = lastNftInPage - nftsPerPage;
    const nftsInPage = filteredNfts.slice(firstNftInPage, lastNftInPage);
    const cards = nftsInPage.map((nft)=>{
        return <NFTCard
            image={nft.image}
            name={nft.name}
            id={nft.id}
            price={nft.price}
        />
    });
    
    // console.log(nftsInPage);
    return(
        <div>
            { 
            cards.length === 0 ? 
                <NotFoundResults/> :
                <>
                <PageSelector/>
                    <div className='pageSelector-Container'>{cards}</div>
                <PageSelector/>
                </>
        }
        </div>
    )
}

export default Pages;
