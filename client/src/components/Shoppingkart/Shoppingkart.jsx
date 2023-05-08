import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { startPayment } from "../../utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//dark-light theme
import useStyles from "../../customHooks/useStyles";
import darkStyles from "./stylesheets/DarkShoppingCart.module.css";
import lightStyles from "./stylesheets/LightShoppingCart.module.css";
import { useLoggedUser } from "../../customHooks/useLoggedUser";

export default function Shoppingkart() {
  const shoppingCartContents = useSelector(
    (state) => state.shoppingCartContents
  );

  const loggedUser = useLoggedUser();
  console.log("loggedUser", loggedUser);

  const styles = useStyles(darkStyles, lightStyles);
  const dispatch = useDispatch();

  const handleBuyNftsOnShoppingCart = async () => {

  
    localStorage.setItem(
      "nftsOnShoppingCart",
      JSON.stringify(shoppingCartContents)
    );
    dispatch(actions.buyNftOnShoppingCart(shoppingCartContents, loggedUser));
    console.log(shoppingCartContents);
    localStorage.setItem("compras", JSON.stringify(shoppingCartContents));
   
  };

  const handlePay = async ({ nftPrice, nftContract, nftObj }) => {
    const transactionMetamask = await startPayment({
      ether: nftPrice.toString(),
      addr: nftContract,
    });

    let metamaskBuyData = {
      price: nftPrice + " ETH",
      contract: nftContract,
      payMethod: "Metamask",
      statusPay: "Created",
      purchases: [nftObj],
    };

    if (transactionMetamask.hash) {
      toast.success("Payment successfully", { position: "bottom-left" });
      metamaskBuyData = {
        ...metamaskBuyData,
        statusPay: "Successful",
      };
    } else if (transactionMetamask.includes("rejected")) {
      metamaskBuyData = {
        ...metamaskBuyData,
        statusPay: "Rejected",
      };
    } else if (transactionMetamask.includes("insufficient funds")) {
      toast.warning("You have insufficient funds in Metamask", {
        position: "bottom-left",
      });
      metamaskBuyData = {
        ...metamaskBuyData,
        statusPay: "Pending",
      };
    }

    // dispatch(actions.addBuyAtHistoryBuys(metamaskBuyData));
  };

  const handleRemoveButton = async (nftId) => {
    dispatch(actions.removeNftOfShoppingCart(nftId));
  };

  let totalAmount = 0;
  for (const nft of shoppingCartContents) {
    totalAmount += nft.price;
  }

  return (
    <div className={styles["shopping-cart-container"]}>
      <div className={styles["shopping-cart"]}>
        <div className={styles["shopping-cart-nft-cards"]}>
          {shoppingCartContents && shoppingCartContents.length > 0 ? (
            shoppingCartContents.map((nft, index) => {
              return (
                <div key={index} className={styles["cart-nfts-container"]}>
                  <img
                    src={nft.image}
                    alt="nft-cart"
                    className={styles["cart-nft-img"]}
                  />
                  <div>
                    <p>{nft.name}</p>
                    <p className={styles["cart-nft-price"]}>
                      <b className={styles["negrita"]}>
                        {" "}
                        ${(nft.price * 1271).toFixed(2)}{" "}
                      </b>{" "}
                      USD
                    </p>
                    {/* <button
                      className={styles["button-buy-fast"]}
                      onClick={handlePay}
                    >
                      Buy Now
                    </button> */}
                  </div>
                  <button
                    className={styles["cart-nft-remove-button"]}
                    onClick={() => handleRemoveButton(nft.id)}
                  >
                    X
                  </button>
                </div>
              );
            })
          ) : (
            <div className={styles["cart-no-nfts"]}>
              <span>There are no items added to the cart yet</span>
            </div>
          )}
        </div>
      </div>
      <div className="text-center text-lg-bottom mt-4 pt-2">
        <h4>Total</h4>
        <p className={styles["cart-nft-price"]}>
          <b className={styles["negrita"]}>
            ${(totalAmount * 1271).toFixed(2)}{" "}
          </b>
          USD
        </p>
        {/* <h4>Clear cart</h4> */}
      </div>
      <button
        className={styles["button-buy"]}
        onClick={(e) => {
          handleBuyNftsOnShoppingCart();
        }}
      >
        Checkout
      </button>
    </div>
  );
}
