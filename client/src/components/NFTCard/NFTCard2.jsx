import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import * as actions from "../../redux/actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import darkStyles from "./stylesheets/DarkNFTCard.module.css";
import lightStyles from "./stylesheets/LightNFTCard.module.css";
import useStyles from "../../customHooks/useStyles";

import Offcanvas from "react-bootstrap/Offcanvas";
import Shoppingkart from "../Shoppingkart/Shoppingkart";
import Ufavorites from "../uFavorites/Ufavorites";

export default function NFTCard(props) {
  const styles = useStyles(darkStyles, lightStyles);
  const userFavs = useSelector((state) => state.userFavs);
  const shopingCartContents = useSelector(
    (state) => state.shoppingCartContents
  );

  const [show, setShow] = useState(false);
  const [showFav, setShowFav] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseFav = () => setShowFav(false);

  const dispatch = useDispatch();

  const displayMsgShoppingCart = ({ error }) => {
    if (!error) {
      toast.success(
        ({ closeToast }) => (
          <div onClick={() => setShow(true)}>
            NFT added to shopping cart successfully
            <ShoppingCartIcon />
          </div>
        ),
        {
          position: "bottom-left",
        }
      );
    } else {
      toast.error(
        ({ closeToast }) => (
          <div onClick={() => setShow(true)}>
            This NFT is already in your shopping cart
            <ShoppingCartIcon />
          </div>
        ),
        {
          position: "bottom-left",
        }
      );
    }
  };

  const displayMsgFavorites = ({ error }) => {
    if (!error) {
      toast.success(
        ({ closeToast }) => (
          <div onClick={() => setShowFav(true)}>
            NFT added to wish-list successfully. You can see!
            <FavoriteIcon />
          </div>
        ),
        {
          position: "bottom-left",
        }
      );
    } else {
      toast.error(
        ({ closeToast }) => (
          <div onClick={() => setShowFav(true)}>
            This NFT is already in your wish-list. You can see!
            <FavoriteIcon />
          </div>
        ),
        {
          position: "bottom-left",
        }
      );
    }
  };

  const handleClickOnShoppingCart = (e) => {
    dispatch(actions.addNftOnShoppingCart(props, displayMsgShoppingCart));
  };

  const handleClickOnFavorites = (e) => {
    dispatch(actions.addToFav(props, displayMsgFavorites));
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
            className={
              userFavs.map((nft) => nft.id).includes(props.id)
                ? styles["isFav"]
                : styles["nftCard-icon-container"]
            }
            onClick={handleClickOnFavorites}
          >
            <FavoriteIcon />
          </div>
          <div
            className={
              shopingCartContents.map((nft) => nft.id).includes(props.id)
                ? styles["isFav"]
                : styles["nftCard-icon-container"]
            }
            onClick={handleClickOnShoppingCart}
          >
            <ShoppingCartIcon />
          </div>
        </div>
      </div>

      {/* wish-list */}
      <Offcanvas
        show={showFav}
        onHide={handleCloseFav}
        placement={"bottom"}
        className={styles["offcanvas-scrollbar"]}
        style={{ height: "fit-content" }}
      >
        <Offcanvas.Body>
          <Ufavorites />
        </Offcanvas.Body>
      </Offcanvas>

      {/* shopping cart */}
      <Offcanvas show={show} onHide={handleClose} placement={"end"}>
        <div className={styles["conteiner-shopping-cart"]}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Your Shopping Cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Shoppingkart />
          </Offcanvas.Body>
        </div>
      </Offcanvas>
    </div>
  );
}
