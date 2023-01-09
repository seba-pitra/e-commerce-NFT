import * as actions from "../../redux/actions";
import { useSelector } from "react-redux";
import NFTCard from "../NFTCard/NFTCard";
import NotFoundResults from "../NotFoundResults/NotFoundResults";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import styles from "./stylesheets/CollectionDetail.module.css";

const CollectionDetail = () => {
  const { id } = useParams();
  //modificado para que traiga mediante el fetch de id y no que traiga todas las colecciones y filtre.
  const collectionDetail = useSelector((state) => state.collectionDetail); 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getCollectionById(id));
    dispatch(actions.getEthPrice());
  }, [dispatch, id]);

  let collectionPrice = 0,
    amountNfts = 0,
    description = "No description",
    floorPrice = 100,
    createdAt = 0;

  const cards = collectionDetail?.nfts.map((nft) => {
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

  let date = new Date(collectionDetail.createdAt); 
  date = date.toString();
  date = date.slice(4, 16);

  return (
    <div>
      {cards?.length === 0 ? (
        <NotFoundResults />
      ) : (
        <div className={styles["collection-details"]}>
          <div className={styles["collection-details-container"]}>
            <div className={styles["img-collection"]}>
              <img src={collectionDetail?.image} alt="collection-detail" />
            </div>
            <div className={styles["collection-titles"]}>
              <h1>
                {collectionDetail?.name} <VerifiedIcon />{" "}
              </h1>
              <span>
                Created by{" "}
                <span className={styles.negrita}>
                  {collectionDetail?.user.name}
                </span>
              </span>
            </div>
            <span className={styles["collection-description"]}>
              {description}
            </span>
            <div className={styles["collection-data"]}>
              <span>
                Items{" "}
                <span className={styles["collection-data-important"]}>
                  {amountNfts}
                </span>
              </span>
              <span>
                <span className={styles["collection-data-important"]}>-</span>
              </span>
              <span>
                Created At{" "}
                <span className={styles["collection-data-important"]}>
                  {date}
                </span>
              </span>
              <span>
                <span className={styles["collection-data-important"]}>-</span>
              </span>
              <span>
                <span className={styles["collection-data-important"]}>
                  Ethereum
                </span>
              </span>
              <span>
                <span className={styles["collection-data-important"]}>-</span>
              </span>
              <span>
                Creator commission{" "}
                <span className={styles["collection-data-important"]}>5%</span>
              </span>
            </div>
            <div className="d-flex justify-content-around w-100">
              <span className={styles["ethereum-price-collection-detail"]}>
                Collection Price <span>{collectionPrice?.toFixed(3)}</span>
                <img
                  src={ethereumLogo}
                  alt="icon-ethereum"
                  className={styles["ethereum-logo-price"]}
                />
              </span>
              <div className={styles["ethereum-price-collection-detail"]}>
                Floor Price{" "}
                <span>
                  {floorPrice?.toFixed(3)}{" "}
                  <img
                    src={ethereumLogo}
                    alt="icon-ethereum"
                    className={styles["ethereum-logo-price"]}
                  />
                </span>
              </div>
            </div>
          </div>
          <div className={styles["collection-details-cards-container"]}>
            {cards}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionDetail;
