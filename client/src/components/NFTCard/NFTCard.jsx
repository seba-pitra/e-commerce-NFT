import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import * as actions from "../../redux/actions";
import ethereumLogo from "../../images/ethereum-logo.png";
import favsLogo from "../../images/favs-logo.png";
// import StarIcon from "../../images/stars-logo.png";
import StarIcon from "@mui/icons-material/Star";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./NFTCard.css";
import styles from "./stylesheets/NFTCard.module.css";

export default function NFTCard(props) {
  const dispatch = useDispatch();

  const viewCards = useSelector((state) => state.viewCards);
  const ethPrice = useSelector((state) => state.ethPrice);

  const handleClickOnShoppingCart = () => {
    dispatch(actions.addNftOnShoppingCart(props));
  };

  const handleClickOnFavorites = () => {
    dispatch(actions.addToFav(props));
  };

  let starsValue = 0;

  if (viewCards === "clear") {
    return (
      <div className={styles["cardContainer"]}>
        <div className="nftCard-image-info">
          <Link className="link" to={`/details/${props.id}`}>
            <div className="nftCard-img-container">
              <img
                className={"nftImage"}
                src={`${
                  props.image === "No image"
                    ? "https://preview.redd.it/j82jl2vpg4n71.jpg?auto=webp&s=e8431005571759e9fd9b5cd2e82dd27696d0b6c4"
                    : props.image
                }`}
                alt="nft-preview"
              />
            </div>
          </Link>
          <div className="CardButtons">
            <div
              className="nftCard-icon-container"
              onClick={handleClickOnFavorites}
            >
              <FavoriteIcon />
            </div>
            <div
              className="nftCard-icon-container"
              onClick={handleClickOnShoppingCart}
            >
              <ShoppingCartIcon />
            </div>
          </div>
        </div>
        <div className="CardButtons">
          <img src="" alt="add-to-favs" />
          <img src="" alt="shopping-cart" />
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles["cardContainer"]}>
        <div className={styles["nftCard-image-info"]}>
          <Link className={styles.link} to={`/details/${props.id}`}>
            <h3 className={styles["raritymove"]}>{props.rarity}</h3>
            <div className={styles["nftCard-img-container"]}>
              <img
                className={styles["nftImage"]}
                src={`${
                  props.image === "No image"
                    ? "https://preview.redd.it/j82jl2vpg4n71.jpg?auto=webp&s=e8431005571759e9fd9b5cd2e82dd27696d0b6c4"
                    : props.image
                }`}
                alt="nft-preview"
              />
            </div>
            <div className={styles["bottom-img-info"]}>
              <div className={styles["nftCard-nameToken"]}>
                <h3>{props.name}</h3>
              </div>
              <div className={styles["eth-rarity"]}>
                <div className={styles["flex-row"]}>
                  <img
                    src={ethereumLogo}
                    alt="ethereum-logo"
                    className={styles["eth-logo"]}
                  />
                  <h3>{props.price.toFixed(3)}</h3>
                </div>
                <div className="flex-row">
                  <VisibilityIcon />
                  <h3>{props.favs}</h3>
                </div>
                <div className="flex-row">
                  <StarIcon />
                  <h3>{starsValue || 0}</h3>
                </div>
              </div>
              <h4>
                Last Buy: ETH {props.lastBuy} - $
                {(props.lastBuy * ethPrice.USD).toFixed(2)} USD
              </h4>
            </div>
          </Link>
          <div className={styles["CardButtons"]}>
            <div
              className={styles["nftCard-icon-container"]}
              onClick={handleClickOnFavorites}
            >
              <FavoriteIcon />
            </div>
            <div
              className={styles["nftCard-icon-container"]}
              onClick={handleClickOnShoppingCart}
            >
              <ShoppingCartIcon />
            </div>
          </div>
        </div>
        <div className={styles["CardButtons"]}>
          <img src="" alt="add-to-favs" />
          <img src="" alt="shopping-cart" />
        </div>
      </div>
    );
  }
}
