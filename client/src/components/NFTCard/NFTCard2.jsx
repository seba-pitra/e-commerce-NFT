import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import * as actions from "../../redux/actions";
import ethereumLogo from "../../images/ethereum-logo.png";
import { saveLocalStorage } from "../../utils";
import "./NFTCard.css";

export default function NFTCard(props) {
  const activeUserIs = useSelector((state) => state.activeUser);
  const userNfts = useSelector((state) => state.userNfts);
  const dispatch = useDispatch();


	function saveLocalStorage(){
		localStorage.setItem(activeUserIs,JSON.stringify(userNfts));
	}

	function saveFavsLocalStorage(){
    localStorage.setItem((activeUserIs + 'Fav'),JSON.stringify(userNfts));
	}

	const handleClickOnShoppingCart = (e) => {
		dispatch(actions.addNftOnShoppingCart(props));
		saveLocalStorage();
	};

  const handleClickOnFavorites = (e) => {
    dispatch(actions.addToFav(props));
    saveFavsLocalStorage();
  };

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

          <div className={"bottom-img-info"}>
            <div className="nftCard-nameToken separeted">
              <h3>{props.name}</h3>
              <div className="display-flexrow">
                <img src={ethereumLogo} alt="ethereum-logo" className="eth-logo" />
                <h3>{props.price.toFixed(3)}</h3>
              </div>
            </div>
          </div>

        </Link>

        <div className="CardButtons">
          <div className="nftCard-icon-container" onClick={handleClickOnFavorites} >
            <FavoriteIcon />
          </div>
          <div className="nftCard-icon-container" onClick={handleClickOnShoppingCart} >
            <ShoppingCartIcon />
          </div>
        </div>
      </div>
      
    </div>
  );
}
