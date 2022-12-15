import { useSelector } from "react-redux";
import NFTCard from "../NFTCard/NFTCard";
import NotFoundResults from "../NotFoundResults/NotFoundResults";
import PageSelector from "../PageSelector/PageSelector";
import "./Pages.css";

function Pages() {
  const filteredNfts = useSelector((state) => state.filteredNfts);
  const activePage = useSelector((state) => state.activePage);
  const nftsPerPage = useSelector((state) => state.nftsPerPage);
  const lastNftInPage = activePage * nftsPerPage;
  const firstNftInPage = lastNftInPage - nftsPerPage;
  const nftsInPage = filteredNfts.slice(firstNftInPage, lastNftInPage);
  const cards = nftsInPage.map((nft) => {
    return (
      <NFTCard
        category={nft.category}
        collection={nft.collection}
        collectionId={nft.collectionId}
        contract={nft.contract}
        id={nft.id}
        image={nft.image}
        name={nft.name}
        price={nft.price}
        source={nft.source}
        tokenId={nft.tokenId}
        type={nft.type}
        userId={nft.userId}
      />
    );
  });

  return (
    <div>
      {cards.length === 0 ? (
        <NotFoundResults />
      ) : (
        <>
          <PageSelector />
          <div className="pageSelector-Container">{cards}</div>
          <PageSelector />
        </>
      )}
    </div>
  );
}

export default Pages;
