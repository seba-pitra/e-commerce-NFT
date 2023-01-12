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
import darkStyles from "./stylesheets/DarkNFTCard.module.css";
import lightStyles from "./stylesheets/LightNFTCard.module.css";
import useStyles from "../../customHooks/useStyles";

import { startPayment } from "../../utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// import "./NFTCard.css";

export default function NFTCard(props) {
  const loggedUser = useSelector((state) => state.loggedUser);
  const viewCards = useSelector((state) => state.viewCards);
  const ethPrice = useSelector((state) => state.ethPrice);
  const styles = useStyles(darkStyles, lightStyles);

  const dispatch = useDispatch();

  const handleClickOnShoppingCart = () => {
    dispatch(actions.addNftOnShoppingCart(props));
  };

  const handleClickOnFavorites = (e) => {
    dispatch(actions.addToFav(props));
  };

  let starsValue = 0;

  const handlePay = async (e) => {
    const transactionMetamask = await startPayment({
      ether: props.price.toString(),
      addr: props.contract,
    });

    let buyData = {
      price: props.price + " ETH",
      contract: props.contract,
      payMethod: "Metamask",
      statusPay: "Created",
      nftIds: [props.id],
      buyerId: loggedUser.id,
      sellerId: props.useriId,
    };

    if (transactionMetamask.hash) {
      toast.success("Payment successfully", {
        position: "bottom-left",
      });
      buyData = {
        ...buyData,
        statusPay: "Successful",
      };
    } else if (transactionMetamask.includes("rejected")) {
      buyData = {
        ...buyData,
        statusPay: "Rejected",
      };
    } else if (transactionMetamask.includes("insufficient funds")) {
      toast.warning("You have insufficient funds in Metamask", {
        position: "bottom-left",
      });
      buyData = {
        ...buyData,
        statusPay: "Pending",
      };
    }
    await axios.post(`/purchase/create/`, buyData);
  };

  // className={styles[]}

  if (viewCards === "clear") {
    return (
      <div className={styles["cardContainer"]}>
        <div className={styles["nftCard-image-info"]}>
          <Link className="link" to={`/details/${props.id}`}>
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
  } else {
    return (
      <div className={styles["cardContainer"]}>
        <div className={styles["nftCard-image-info"]}>
          <Link className={styles.link} to={`/details/${props.id}`}>
            <div className={styles["card-stars"]}>
              <StarIcon className={styles["stars-icon"]} />
              <span>{starsValue || 0}</span>
            </div>
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
                <div className={styles["nftCard-name-stars-container"]}>
                  <h3>{props.name} </h3>
                </div>
              </div>
              <div className={styles["eth-rarity"]}>
                <h3>ETH {props.price}</h3>
                <h3>${(props.lastBuy * ethPrice.USD).toFixed(2)} USD</h3>
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

          <button onClick={handlePay} className={styles["but-now-button"]}>
            Buy now
          </button>
        </div>
      </div>
    );
  }
}

{
  /* <div className={styles["cardContainer"]}>
        <div className={styles["nftCard-image-info"]}>
          <Link className={styles.link} to={`/details/${props.id}`}>
            <h3 className={styles["raritymove"]}>{props.rarity}</h3>
            <div className={styles["card-stars"]}>
              <StarIcon className={styles["stars-icon"]} />
              <span>{starsValue || 0}</span>
            </div>
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
                <div className={styles["flex-row"]}>
                  <img
                    src={ethereumLogo}
                    alt="ethereum-logo"
                    className={styles["eth-logo"]}
                  />
                  <h3>{props.price.toFixed(3)}</h3>
                </div>
              </div>
              <div className={styles["eth-rarity"]}>
                <div className={styles["flex-row"]}>
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
      </div> */
}
