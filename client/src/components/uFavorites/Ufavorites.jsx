import { React, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import styles from "./Ufavorites.module.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import * as actions from "../../redux/actions";

export default function Ufavorites() {
  const userFavs = useSelector((state) => state.userFavs);

  const dispatch = useDispatch();

	const handleClickDelFavorites = (nftId) => {
	dispatch(actions.delToFav(nftId));
	console.log("FAVS HERE !!");
	console.log(nftId);

}


  return (
    <div className={styles["main-op"]}>
      <div className="d-flex flex-row">
        {userFavs &&
          userFavs.map((idx, index) => {
            return (
              <div key={index} className={styles["img-container"]}>
                <img
                  src={idx.image}
                  alt="nft"
                  className={styles["fav-nft-img"]}
                />
                <button className={styles["favs-remove-button"]} onClick={() => handleClickDelFavorites(idx.id)}>×</button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
