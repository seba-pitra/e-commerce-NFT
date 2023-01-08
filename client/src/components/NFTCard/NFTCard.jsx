import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import * as actions from "../../redux/actions";
import ethereumLogo from "../../images/ethereum-logo.png";
import favsLogo from "../../images/favs-logo.png";
import starsLogo from "../../images/stars-logo.png";
import { saveLocalStorage } from "../../utils";
import "./NFTCard.css";

export default function NFTCard(props) {
  const loggedUserEmail = useSelector((state) => state.loggedUser.email);
  const shoppingCartContents = useSelector((state) => state.shoppingCartContents);
  const viewCards = useSelector((state) => state.viewCards);

  const ethPrice = useSelector((state) => state.ethPrice);
  const dispatch = useDispatch();


  const handleClickOnShoppingCart = (e) => {
    dispatch(actions.addNftOnShoppingCart(props));
    saveLocalStorage();
  };

  const handleClickOnFavorites = (e) => {
    dispatch(actions.addToFav());
    saveFavsLocalStorage();
  };


  function saveLocalStorage() {
    localStorage.setItem(loggedUserEmail, JSON.stringify(shoppingCartContents));
  }

  function saveFavsLocalStorage() {
    localStorage.setItem(loggedUserEmail + "Fav", JSON.stringify(shoppingCartContents));
  }

  /* let starsValue = props.stars?.reduce((a, b) => a + b, 0);
  starsValue = starsValue / props.stars?.length; */
  let starsValue = 0;

  if (viewCards === "clear") {
    return (
      <div className="cardContainer">
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
      <div className="cardContainer">
        <div className="nftCard-image-info">
          <Link className="link" to={`/details/${props.id}`}>
            <h3 className="raritymove">{props.rarity}</h3>
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
            <div className={"bottom-img-info"}>
              <div className="nftCard-nameToken">
                <h3>{props.name}</h3>
              </div>
              <div>
                <div className="eth-rarity">
                  <div className="flex-row">
                    <img
                      src={ethereumLogo}
                      alt="ethereum-logo"
                      className="eth-logo"
                    />
                    <h3>{props.price.toFixed(3)}</h3>
                  </div>
                  <div className="flex-row">
                    <img
                      src={favsLogo}
                      alt="ethereum-logo"
                      className="eth-logo"
                    />
                    <h3>{props.favs}</h3>
                  </div>
                  <div className="flex-row">
                    <img
                      src={starsLogo}
                      alt="ethereum-logo"
                      className="eth-logo"
                    />
                    <h3>{starsValue || 0}</h3>
                  </div>
                </div>
                <h4>
                  Last Buy: ETH {props.lastBuy} - $
                  {(props.lastBuy * ethPrice.USD).toFixed(2)} USD
                </h4>
              </div>
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
  }
}
