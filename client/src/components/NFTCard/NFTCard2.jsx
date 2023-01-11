import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import * as actions from "../../redux/actions";
import ethereumLogo from "../../images/ethereum-logo.png";
import "./NFTCard.css";
import styles from "./stylesheets/NFTCard.module.css";

export default function NFTCard(props) {
  const dispatch = useDispatch();

  const handleClickOnShoppingCart = (e) => {
    dispatch(actions.addNftOnShoppingCart(props));
  };

  const handleClickOnFavorites = (e) => {
    dispatch(actions.addToFav(props));
  };

  // className={styles[]}

  return (
    <div className={styles["cardContainer"]}>
      <div className={styles["nftCard-image-info"]}>
        <Link className={styles["link"]} to={`/details/${props.id}`}>
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
            <div className={styles["nftCard-nameToken separeted"]}>
              <h3>{props.name}</h3>
              <div className={styles["display-flexrow"]}>
                <img
                  src={ethereumLogo}
                  alt="ethereum-logo"
                  className={styles["eth-logo"]}
                />
                <h3>{props.price.toFixed(3)}</h3>
              </div>
            </div>
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
    </div>
  );
}
