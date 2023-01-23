import { React, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
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
  };

  return (
    <div className={styles["main-op"]}>
      <div className="d-flex flex-row">
        {userFavs && userFavs.length > 0 ?
          userFavs.map((idx, index) => {
            return (
                  <div key={index} className={styles["img-container"]}>
                    <Link className={styles.link} to={`/details/${idx.id}`}>
                      <img src={idx.image} alt="nft" className={styles["fav-nft-img"]}/>
                    </Link>
                    <button className={styles["favs-remove-button"]} onClick={() => handleClickDelFavorites(idx.id)}>×</button>
                  </div>

            );
          }) : (
            <div className={styles["favs-no-nfts"]}>
              <span>You have not added any items to your wish-list yet</span>
            </div>
          )}
      </div>
    </div>
  );
}
