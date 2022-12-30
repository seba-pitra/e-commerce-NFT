import * as actions from "../../redux/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import NFTCard from "../NFTCard/NFTCard";
import NotFoundResults from "../NotFoundResults/NotFoundResults";
import Ordering from "../FilterOptrions/Ordering/Ordering";
import PageSelector from "../PageSelector/PageSelector";
import "./Pages.css";

function Pages() {
  const filteredNfts = useSelector((state) => state.filteredNfts);
  const activePage = useSelector((state) => state.activePage);
  const nftsPerPage = useSelector((state) => state.nftsPerPage);
  const lastNftInPage = activePage * nftsPerPage;
  const firstNftInPage = lastNftInPage - nftsPerPage;
  const nftsInPage = filteredNfts.slice(firstNftInPage, lastNftInPage);

  const dispatch = useDispatch();

  const setNftPage = (e) => {
    dispatch(actions.nftsxpage(e.target.value))
  };

  const cards = nftsInPage.map((nft) => {
    return (
      <NFTCard
        key={nft.id}
        collectionId={nft.collectionId}
        contract={nft.contract}
        id={nft.id}
        image={nft.image}
        name={nft.name}
        price={nft.price}
        tokenId={nft.tokenId}
        userId={nft.userId}
        rarity={nft.rarity}
        favs={nft.favs}
        stars={nft.stars}
        lastBuy={nft.lastBuyValue || 0.01}
      />
    );
  });

  return (
    <div>
      {cards.length === 0 ? (
        <NotFoundResults />
      ) : (
        <>
          <div className="ordering-buttons-nav">
            <select onChange={(e) => setNftPage(e)}>
              <option disabled selected value="null">Nfts x Page</option>
              <option value="40">40</option>
              <option value="80">80</option>
              <option value="120">120</option>
              <option value="160">160</option>
              <option value="200">200</option>
            </select>
            <Ordering />
            <button>A</button>
            <button>B</button>
            <p className="amount-nfts">{filteredNfts.length} items</p>
          </div>
          <PageSelector />
          <div className="pageSelector-Container">{cards}</div>
          <PageSelector />
        </>
      )}
    </div>
  );
}

export default Pages;
