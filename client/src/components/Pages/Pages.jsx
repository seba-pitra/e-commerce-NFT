import { useSelector } from 'react-redux';
import { useState } from 'react'
import NFTCard from "../NFTCard/NFTCard";
import NotFoundResults from '../NotFoundResults/NotFoundResults';
import PageSelector from '../PageSelector/PageSelector';


function Pages(){
    // const nfts = useSelector(state => state.filteredNfts);
    const nfts = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const [activePage, setActivePage] = useState(1)
    const [nftsPerPage, setNftsPerPage] = useState(6)
    const lastNftInPage = activePage * nftsPerPage;
    const firstNftInPage = lastNftInPage - nftsPerPage;
    const nftsInPage = nfts.slice(firstNftInPage, lastNftInPage);
    const cards = nftsInPage.map((nft)=>{
        return nft     
    })

    return(
        <div>
            { 
            cards.length === 0 ? 
                <NotFoundResults/> :
                <>
                <PageSelector
                    setActivePage={setActivePage}
                    activePage={activePage}
                    nftsPerPage={nftsPerPage}/>
                    <div className='carousel' >
                        {cards}
                    </div>
                <PageSelector
                    setActivePage={setActivePage}
                    activePage={activePage}
                    nftsPerPage={nftsPerPage}/>
                </>
        }
        </div>
    )
}

export default Pages;