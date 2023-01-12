import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import * as actions from "../../redux/actions";

import darkStyles from "./stylesheets/DarkNFTCard.module.css";
import lightStyles from "./stylesheets/LightNFTCard.module.css";
import useStyles from "../../customHooks/useStyles";

export default function NFTCard(props) {
  const dispatch = useDispatch();
  const styles = useStyles(darkStyles, lightStyles);

  const handleClickOnShoppingCart = (e) => {
    dispatch(actions.addNftOnShoppingCart(props));
  };

  const handleClickOnFavorites = (e) => {
    dispatch(actions.addToFav(props));
  };

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
            <div className={styles["nftCard-nameToken-separated"]}>
              <h3>{props.name}</h3>
              <span>
                {" "}
                <b>{props.price.toFixed(3)}</b> ETH{" "}
              </span>
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
