import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import styles from "./ShoppingCart.module.css";
import { useState } from "react";

export default function Shoppingkart() {
  const userNfts = useSelector((state) => state.userNfts);

  const dispatch = useDispatch();

  const handleRemoveButton = async (nftId) => {
    dispatch(actions.removeNftOfShoppingCart(nftId));
  };

<<<<<<< HEAD
  //Apreto el boton de comprar:
  //1) dispatchar la action para mandar los nft's al back

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

useEffect(() => {
dispatch(actions.buyNftOnShoppingCart(userNfts));
  //Runs on every render
});


const handleBuyNftsOnShoppingCart = () => {
//window.open(redirectMercadoPago)
//e.preventDefault()

//triggerPay();    
//if (redirectMercadoPago === ""){triggerPay()} // not working as spected
dispatch(actions.buyNftOnShoppingCart(userNfts));

console.log('start');
console.log(redirectMercadoPago);
console.log('end');

};



  




  //2) En el back, llega al router y se ejecuta "getPaymentLink"
  //3) En este controller, se ejecuta la funcion de suscripcion con la que se hace el pago.
  //   (le deben llegar los NFT's y el email del user que compra)
=======
  const handleBuyNftsOnShoppingCart = async () => {
    dispatch(actions.buyNftOnShoppingCart(userNfts));
  };
>>>>>>> origin/development

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
          onClick={(e) => {
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
