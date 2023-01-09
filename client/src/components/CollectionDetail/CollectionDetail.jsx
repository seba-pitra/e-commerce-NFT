import * as actions from "../../redux/actions";
import { useSelector } from "react-redux";
import NFTCard from "../NFTCard/NFTCard";
import NotFoundResults from "../NotFoundResults/NotFoundResults";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ethereumLogo from "../../images/ethereum-logo.png";
import { useParams } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import stylesDark from "./stylesheets/DarkCollectionDetail.module.css";
import stylesLight from "./stylesheets/LightCollectionDetail.module.css";

const CollectionDetail = () => {
  const { id } = useParams();

  const collections = useSelector((state) => state.collections);
  const foundCollection = collections.find((coll) => coll.id === id);

  const  isDark  = useSelector((state) => state.activeThemeIsDark);
  console.log(isDark)

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

  let date = new Date(createdAt);
  date = date.toString();
  date = date.slice(4, 16);

  return (
    <div>
      {cards?.length === 0 ? (
        <NotFoundResults /> 
      ) : (
        <div className={ isDark ? stylesDark["collection-details"] : stylesLight["collection-details"] }>
          <div className={ isDark ? stylesDark["collection-details-container"] : stylesLight["collection-details-container"] }>
            <div className={ isDark ? stylesDark["img-collection"] : stylesLight["img-collection"] }>
              <img src={foundCollection?.image} alt="collection-detail" />
            </div>
            <div className={ isDark ? stylesDark["collection-titles"] : stylesLight["collection-titles"] }>
              <h1>
                {foundCollection?.name} <VerifiedIcon />{" "}
              </h1>
              <span>
                Created by{" "}
                <span className={ isDark ? stylesDark["negrita"] : stylesLight["negrita"] }>
                  {foundCollection?.user.name}
                </span>
              </span>
            </div>
            <span className={ isDark ? stylesDark["collection-description"] : stylesLight["collection-description"] }>
              {description}
            </span>
            <div className={ isDark ? stylesDark["collection-data"] : stylesLight["collection-data"] }>
              <span>
                Items{" "}
                <span className={ isDark ? stylesDark["collection-data-important"] : stylesLight["collection-data-important"] }>
                  {amountNfts}
                </span>
              </span>
              <span>
                <span className={ isDark ? stylesDark["collection-data-important"] : stylesLight["collection-data-important"] }>-</span>
              </span>
              <span>
                Created At{" "}
                <span className={ isDark ? stylesDark["collection-data-important"] : stylesLight["collection-data-important"] }>
                  {date}
                </span>
              </span>
              <span>
                <span className={ isDark ? stylesDark["collection-data-important"] : stylesLight["collection-data-important"] }>-</span>
              </span>
              <span>
                <span className={ isDark ? stylesDark["collection-data-important"] : stylesLight["collection-data-important"] }>
                  Ethereum
                </span>
              </span>
              <span>
                <span className={ isDark ? stylesDark["collection-data-important"] : stylesLight["collection-data-important"] }>-</span>
              </span>
              <span>
                Creator commission{" "}
                <span className={ isDark ? stylesDark["collection-data-important"] : stylesLight["collection-data-important"] }>5%</span>
              </span>
            </div>
            <div className="d-flex justify-content-around w-100">
              <span className={ isDark ? stylesDark["ethereum-price-collection-detail"] : stylesLight["ethereum-price-collection-detail"] }>
                Collection Price <span>{collectionPrice?.toFixed(3)}</span>
                <img
                  src={ethereumLogo}
                  alt="icon-ethereum"
                  className={ isDark ? stylesDark["ethereum-logo-price"] : stylesLight["ethereum-logo-price"] }
                />
              </span>
              <div className={ isDark ? stylesDark["ethereum-price-collection-detail"] : stylesLight["ethereum-price-collection-detail"] }>
                Floor Price{" "}
                <span>
                  {floorPrice?.toFixed(3)}{" "}
                  <img
                    src={ethereumLogo}
                    alt="icon-ethereum"
                    className={ isDark ? stylesDark["ethereum-logo-price"] : stylesLight["ethereum-logo-price"] }
                  />
                </span>
              </div>
            </div>
          </div>
          <div className={ isDark ? stylesDark["collection-details-cards-container"] : stylesLight["collection-details-cards-container"] }>
            {cards}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionDetail;
