import * as actions from "../../redux/actions";
import { useSelector } from "react-redux";
import NFTCard from "../NFTCard/NFTCard";
import NotFoundResults from "../NotFoundResults/NotFoundResults";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import stylesDark from "./stylesheets/DarkCollectionDetail.module.css";
import stylesLight from "./stylesheets/LightCollectionDetail.module.css";

const CollectionDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const foundCollection = useSelector((state) => state.collectionDetail); 

  const  isDark  = useSelector((state) => state.activeThemeIsDark);
  console.log(isDark)

  useEffect(() => {
    dispatch(actions.getCollectionById(id));
    dispatch(actions.getEthPrice());
  }, [dispatch, id]);
  
  let collectionPrice = 0,
    amountNfts = 0,
    description = "No description",
    floorPrice = 100,
    createdAt = 0;

  let cards = [];

  if (foundCollection.id) {
    cards = foundCollection?.nfts.map((nft) => {
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
  }

  let date = new Date(foundCollection.createdAt); 
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
              <h1> {foundCollection?.name} <VerifiedIcon />{" "} </h1>
              <span>
                Created by{" "}
                <span className={ isDark ? stylesDark["negrita"] : stylesLight["negrita"] }>
                  {foundCollection?.user.username}
                </span>
              </span>
            </div>
            <div className={ isDark ? stylesDark["collection-data"] : stylesLight["collection-data"] }>
              <span>
                Items{" "} <span className={ isDark ? stylesDark["negrita"] : stylesLight["negrita"] }> {amountNfts} </span>
              </span>
              <span>
                Created At{" "} <span className={ isDark ? stylesDark["negrita"] : stylesLight["negrita"] }> {date} </span>
              </span>
              <span>
                <span className={ isDark ? stylesDark["negrita"] : stylesLight["negrita"] }> Ethereum </span>
              </span>
              <span> Creator commission{" "} <span className={ isDark ? stylesDark["negrita"] : stylesLight["negrita"] }>5%</span>
              </span>
            </div>

            <span className={ isDark ? stylesDark["collection-description"] : stylesLight["collection-description"] }>
              {description}
            </span>
            
            <div className={ isDark ? stylesDark["price-collection"] : stylesLight["price-collection"] }>
              <div className={ isDark ? stylesDark["price-collection-detail"] : stylesLight["price-collection-detail"] }>
                <span className={ isDark ? stylesDark["negrita"] : stylesLight["negrita"] }>{collectionPrice?.toFixed(3)} ETH</span> 
                <span>Volumen</span>
              </div>
              <div className={ isDark ? stylesDark["price-collection-detail"] : stylesLight["price-collection-detail"] }>
                <span className={ isDark ? stylesDark["negrita"] : stylesLight["negrita"] }>{floorPrice?.toFixed(3)} ETH</span> 
                <span>Floor</span>
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
