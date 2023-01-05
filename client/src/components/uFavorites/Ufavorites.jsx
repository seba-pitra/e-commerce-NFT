import { React, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import FavoriteIcon from '@material-ui/icons/Favorite';
import styles from "./Ufavorites.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

// TO-DO
// Items Styles
// horizontal visuals
// polish
//
//
//
export default function Ufavorites(){
 const userFavs = useSelector((state) => state.userFavs);
console.log(userFavs);

	return (
	
<div className={styles["shopping-cart"]}>
      <div className={styles["shopping-cart-nft-cards"]}>
        {userFavs &&
          userFavs.map((nft) => {
            return (
              <div className={styles["cart-nfts-container"]}>
                <img
                  src={nft.image}
                  alt="nft-cart"
                  className={styles["cart-nft-img"]}
                />
                <div>
                  <p>Price</p>
                  <p className={styles["cart-nft-price"]}>
                    ${(nft.price * 1271).toFixed(2)} USD
                  </p>
                </div>
                <button
                  className={styles["cart-nft-remove-button"]}
                >
                  X
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
