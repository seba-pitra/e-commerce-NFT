import React from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import styles from "./ShoppingCart.module.css";

export default function Shoppingkart() {
  const userNfts = useSelector((state) => state.userNfts);

  const dispatch = useDispatch();

  const handleRemoveButton = async (nftId) => {
    dispatch(actions.removeNftOfShoppingCart(nftId));
  };

  const handleBuyNftsOnShoppingCart = async () => {
    dispatch(actions.buyNftOnShoppingCart(userNfts));
  };

  let totalAmount = 0;
  for (const nft of userNfts) {
    totalAmount += nft.price;
  }

  return (
    <div className={styles["shopping-cart"]}>
      <div className={styles["shopping-cart-nft-cards"]}>
        {userNfts &&
          userNfts.map((nft) => {
            return (
              <div className={styles["cart-nfts-container"]}>
                <img
                  src={nft.image}
                  alt="nft-cart"
                  className={styles["cart-nft-img"]}
                />
                {/* <div>
                  <p>Name</p>
                  <p className={styles["cart-nft-name"]}>{nft.name}</p>
                </div> */}
                <div>
                  <p>Price</p>
                  <p className={styles["cart-nft-price"]}>
                    ${(nft.price * 1271).toFixed(2)} USD
                  </p>
                </div>
                <button
                  className={styles["cart-nft-remove-button"]}
                  onClick={() => handleRemoveButton(nft.id)}
                >
                  X
                </button>
              </div>
            );
          })}
      </div>
      {/* kart footer totals */}

      <div className="text-center text-lg-bottom mt-4 pt-2">
        <h3>Total</h3>
        <h3>${(totalAmount * 1271).toFixed(2)} USD</h3>
        <h4>Clear cart</h4>
      </div>

      {/* To pay API   */}
      <div className="text-center text-lg-bottom mt-4 pt-2">
        <Button
          onClick={() => {
            handleBuyNftsOnShoppingCart();
          }}
        >
          checkout
          {/* <Link to={redirectMercadoPago && redirectMercadoPago}>Checkout</Link> */}
        </Button>
        {/* <div>
          <Link to={{ pathname: redirectMercadoPago }} target="_blank">
            Click to open HereWeCode (new tab)
          </Link>
        </div> */}
      </div>
    </div>
  );
}
