import * as actions from "../../redux/actions";
import { useSelector } from "react-redux";
import NFTCard from "../NFTCard/NFTCard";
import NotFoundResults from "../NotFoundResults/NotFoundResults";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ethereumLogo from "../../images/ethereum-logo.png";
import { useParams } from "react-router-dom";
import "./CollectionDetail.css";
import VerifiedIcon from "@mui/icons-material/Verified";

const CollectionDetail = () => {
  // Esto hay que modificar como trae los datos....
  // porque ya existe el get collection by id.
  const { id } = useParams();

  const collections = useSelector((state) => state.collections);
  const foundCollection = collections.find((coll) => coll.id === id);

  console.log(foundCollection);

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
    console.log(nft);
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

  let date = new Date(foundCollection.createdAt); 
  date = date.toString();
  date = date.slice(4, 16);

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
            <div className="collection-titles">
              <h1>
                {foundCollection?.name} <VerifiedIcon />{" "}
              </h1>
              <span>
                Created by{" "}
                <span className="negrita">{foundCollection?.user.name}</span>
              </span>
            </div>
            <span className="collection-description">{description}</span>
            <div className="collection-data">
              <span>
                Items <span className="negrita">{amountNfts}</span>
              </span>
              <span>
                <span className="negrita">-</span>
              </span>
              <span>
                Created At <span className="negrita">{date}</span>
              </span>
              <span>
                <span className="negrita">-</span>
              </span>
              <span>
                <span className="negrita">Ethereum</span>
              </span>
              <span>
                <span className="negrita">-</span>
              </span>
              <span>
                Creator commission <span className="negrita">5%</span>
              </span>
            </div>
            <div className="d-flex justify-content-around w-100">
              <span className="ethereum-price-collection-detail">
                Collection Price <span>{collectionPrice?.toFixed(3)}</span>
                <img
                  src={ethereumLogo}
                  alt="icon-ethereum"
                  className="ethereum-logo-price"
                />
              </span>
              <div className="ethereum-price-collection-detail">
                FloorPrice{" "}
                <span>
                  {floorPrice?.toFixed(3)}{" "}
                  <img
                    src={ethereumLogo}
                    alt="icon-ethereum"
                    className="ethereum-logo-price"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="pageSelector-Container">{cards}</div>
        </div>
      )}
    </div>
  );
};

export default CollectionDetail;
