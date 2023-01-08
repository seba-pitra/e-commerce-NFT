import { React, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import FavoriteIcon from '@material-ui/icons/Favorite';
import styles from "./Ufavorites.module.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

// colocar el boton en otro lado
// redondear el boton 
//
//
export default function Ufavorites(){
 const userFavs = useSelector((state) => state.userFavs);
console.log(userFavs);

	return (
	
<div className={styles["main-op"]}>
      <div class="d-flex flex-row">
        {userFavs &&
          userFavs.map((idx) => {
            return (
              <div className={styles["img-container"]}>
                <img
                  src={idx.image}
                  alt="nft"
                  className={styles["fav-nft-img"]}
                />
   		            <button className={styles["favs-remove-button"]}>
                  ×
                </button>

              </div>
            );
          })}
      </div>
    </div>
  );
}
