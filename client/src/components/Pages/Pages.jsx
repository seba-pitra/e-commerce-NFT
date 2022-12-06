import { useSelector } from 'react-redux';
import NFTCard from "../NFTCard/NFTCard";
import NotFoundResults from '../NotFoundResults/NotFoundResults';
import PageSelector from '../PageSelector/PageSelector';


function Pages(){
    const nfts = useSelector(state => state.filteredNfts);
    const activePage = useSelector(state => state.activePage)
    const nftsPerPage = useSelector(state => state.nftsPerPage);
    const lastNftInPage = activePage * nftsPerPage;
    const firstNftInPage = lastNftInPage - nftsPerPage;
    const nftsInPage = nfts.slice(firstNftInPage, lastNftInPage);
    const cards = nftsInPage.map((nft)=>{
        return <NFTCard 
        /*datos que van a la CARD*/
        />      
    })

    return(
        <div>
            { 
            cards.length === 0 ? 
                <NotFoundResults/> :
                <>
                <PageSelector/>
                    <div className='carousel' >
                        {cards}
                    </div>
                <PageSelector/>
                </>
        }
        </div>
    )
}

export default Pages;