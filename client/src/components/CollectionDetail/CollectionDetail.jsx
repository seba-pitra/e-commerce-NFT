import * as actions from "../../redux/actions";
import { useSelector } from "react-redux";
import NFTCard from "../NFTCard/NFTCard";
import NotFoundResults from "../NotFoundResults/NotFoundResults";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ethereumLogo from "../../images/ethereum-logo.png";
import { useParams } from "react-router-dom";
import "./CollectionDetail.css";

const CollectionDetail = () => {
  const { id } = useParams();

  const collections = useSelector((state) => state.collections);
  const foundCollection = collections.find((coll) => coll.id === id);

  console.log(foundCollection)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getAllCollections());
    dispatch(actions.getEthPrice());
  }, [dispatch]);

  let collectionPrice = 0,
    amountNfts = 0,
    description = "No description",
    floorPrice = 100,
    createdAt = 0;

  const cards = foundCollection?.nfts.map((nft) => {
    console.log(nft)
    collectionPrice = nft.price + collectionPrice;
    amountNfts++;
    if (description === "No description") description = nft.description;
    if (createdAt < nft.lastBuyTs) createdAt = nft.createdTs;
    if (floorPrice > nft.price) floorPrice = nft.price;
    if (createdAt < nft.lastSellTs) createdAt = nft.lastSellTs;
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

  let date = new Date(createdAt)
  date = date.toString()
  date = date.slice(4, 16)

  return (
    <div>
      {cards?.length === 0 ? (
        <NotFoundResults />
      ) : (
        <div className="collection-details">
          <div className="collection-details-container">
            <div className="img-collection">
              <img src={foundCollection?.image} alt="collection-detail" />
            </div>
            <div className="flex-row4">
              <h2>{foundCollection?.name}</h2>
              <span>Created by <span className="negrita">{foundCollection?.user.name}</span></span>
            </div>
            <div className="flex-row4">
              <span>Items <span className="negrita">{amountNfts}</span></span>
              <span><span className="negrita">-</span></span>
              <span>Created At <span className="negrita">{date}</span></span>
              <span><span className="negrita">-</span></span>
              <span>Cadena <span className="negrita">Ethereum</span></span>
              <span><span className="negrita">-</span></span>
              <span>Comisión del creador <span className="negrita">5%</span></span>
            </div>
              <div className="flex-row4">
                <h6>{description}</h6>
              </div>
            <div className="flex-row4">
              <span>Collection Price <span className="negrita">{collectionPrice?.toFixed(3)}</span></span>
              <span>FloorPrice <span className="negrita">{floorPrice?.toFixed(3)}</span></span>
            </div>
          </div>
          <div className="pageSelector-Container">{cards}</div>
        </div>
      )}
    </div>
  );
};

export default CollectionDetail;
