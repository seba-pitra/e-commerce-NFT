import * as actions from '../../redux/actions'
import { useSelector } from "react-redux";
import NFTCard from "../NFTCard/NFTCard";
import NotFoundResults from "../NotFoundResults/NotFoundResults";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./CollectionDetail.css";

const CollectionDetail = () => {
  const { id } = useParams()
  
  const nfts = useSelector((state) => state.nfts);
  const collections = useSelector((state) => state.collections);
  const foundNfts = nfts.filter(nft => nft.collectionId === id)
  const foundCollection = collections.find(coll => coll.id === id)

  const dispatch = useDispatch();

  useEffect(() => { dispatch(actions.getEthPrice()) }, [dispatch]);

  let collectionPrice = 0, amountNfts = 0, description = "No description", floorPrice = 100, createdAt = 0;
  
  const cards = foundNfts.map((nft) => {
    collectionPrice = nft.price + collectionPrice;
    amountNfts++;
    if(description === "No description") description = nft.description;
    if(floorPrice > nft.price) floorPrice = nft.price;
    if(createdAt < nft.lastSellTs) createdAt = nft.lastSellTs;
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
      />
    );
  });

  return (
    <div>
      {cards.length === 0 ? (
        <NotFoundResults />
      ) : (
        <div className="collection-details">
          <div className="collection-details-container">
          <img src={foundCollection.image} alt="collection-detail" />
            <h1>{foundCollection.name}</h1>
            <h3>Price collection: {collectionPrice}</h3>
            <h3>Amount Nfts: {amountNfts}</h3>
            <h3>Description: {description}</h3>
            <h3>FloorPrice: {floorPrice}</h3>
            <h3>Cadena Ethereum</h3>
            <h3>Comisión del creador 5%</h3>
            <h3>{createdAt}</h3>
          </div>
          <div className="pageSelector-Container">{cards}</div>
        </div>
      )}
    </div>
  );
}

export default CollectionDetail;