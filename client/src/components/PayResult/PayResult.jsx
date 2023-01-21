import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import successIcon from "../../images/icons/success-icon.png";
import issueIcon from "../../images/icons/issue-icon.png";
import pendingIcon from "../../images/icons/pending-icon.png";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import styles from "./stylesheets/PayResult.module.css";
import axios from "axios";

function PayResult(props) {
  const dispatch = useDispatch();

  let firebaseCurrentUser = JSON.parse(
    localStorage.getItem("User")
  );

  let buyer = JSON.parse(
    localStorage.getItem("User")
  );

  let compras = JSON.parse(
    localStorage.getItem("compras")
  )
  console.log(compras)
  
  console.log(firebaseCurrentUser)
  let shoppingCartContents = JSON.parse(localStorage.getItem("nftsOnShoppingCart")); // este es monousuario

  let totalAmount = 0;
  for (const nft of shoppingCartContents) {
    totalAmount += nft.price;
  }

  let resultContainer;

  // className={styles[]}

  const sucessContainer = (
    <div className={styles["pay-result-container"]}>
      <div className={styles["pay-result-success-line"]}></div>
      <img
        src={successIcon}
        alt="pay-icon"
        className={styles["pay-result-img-icon"]}
      />
      <h1 className={styles["pay-result-success-title"]}>Success!</h1>
      <p className={styles["pay-result-success-space-line"]}>
        _________________
      </p>
      <p className={styles["pay-result-span"]}>
        We are delighted to inform you that we are received your payment
      </p>
      <div className={styles["pay-result-buttons-container"]}>
        <Link
          className={styles["pay-result-success-marketplace-button"]}
          to={"/marketplace"}
        >
          MarketPlace
        </Link>
      </div>
    </div>
  );

  const failureContainer = (
    <div className={styles["pay-result-failure-container"]}>
      <div className={styles["pay-result-failure-line"]}></div>
      <img
        src={issueIcon}
        alt="pay-icon"
        className={styles["pay-result-img-icon"]}
      />
      <h1 className={styles["pay-result-failure-title"]}>Error!</h1>
      <p className={styles["pay-result-failure-space-line"]}>
        _________________
      </p>
      <p className={styles["pay-result-span"]}>
        Unfortunately we have an issue with your payment. Try again later
      </p>
      <div className={styles["pay-result-buttons-container"]}>
        <Link
          className={styles["pay-result-failure-marketplace-button"]}
          to={"/marketplace"}
        >
          MarketPlace
        </Link>
      </div>
    </div>
  );

  const pendingContainer = (
    <div className={styles["pay-result-pending-container"]}>
      <div className={styles["pay-result-pending-line"]}></div>
      <img
        src={pendingIcon}
        alt="pay-icon"
        className={styles["pay-result-img-icon"]}
      />
      <h1 className={styles["pay-result-pending-title"]}>Pending...</h1>
      <p className={styles["pay-result-pending-space-line"]}>
        _________________
      </p>
      <p className={styles["pay-result-span"]}>The payment is pending</p>
      <div className={styles["pay-result-buttons-container"]}>
        <Link
          className={styles["pay-result-peding-marketplace-button"]}
          to={"/marketplace"}
        >
          MarketPlace
        </Link>
      </div>
    </div>
  );

  let mercadoPagoBuyData = {
    price: totalAmount,
    payMethod: "MercadoPago",
    statusPay: "Created",
    purchases: shoppingCartContents,
  };

  const validate =
    window.location.href.includes("collection_status") &&
    window.location.href.includes("external_reference");

  if (validate) {
    if (window.location.href.includes("success")) {
      resultContainer = sucessContainer;
      mercadoPagoBuyData = {
        ...mercadoPagoBuyData,
        statusPay: "Successed",
      };

      let sellers = new Array(...new Set(compras.map((data) => data.userId)))

      sellers.forEach( async seller => {
        let dataBuy = {
          price: compras.filter(nfts=>nfts.userId===seller).map((data) => data.price).reduce((a, b) => a + b),
          payMethod: "MercadoPago",
          statusPay: "Successful",
          buyerId: buyer.id,
          sellerId: seller,
          nftIds: compras.filter(nfts=>nfts.userId===seller).map(nfts=>nfts.id),
        }
        let newPurchase = await axios.post(`/purchase/create`,dataBuy)
        console.log(newPurchase)
        
      })

      dispatch(
        actions.sendFungibleMail({
          correoUser: firebaseCurrentUser,
          accion: "exito",
        })
      );
    } else if (window.location.href.includes("failure")) {
      resultContainer = failureContainer;
      mercadoPagoBuyData = {
        ...mercadoPagoBuyData,
        statusPay: "Rejected",
      };

      let sellers = new Array(...new Set(compras.map((data) => data.userId)))

      sellers.forEach( async seller => {
        let dataBuy = {
          price: compras.filter(nfts=>nfts.userId===seller).map((data) => data.price).reduce((a, b) => a + b),
          payMethod: "MercadoPago",
          statusPay: "Rejected",
          buyerId: buyer.id,
          sellerId: seller,
          nftIds: compras.filter(nfts=>nfts.userId===seller).map(nfts=>nfts.id),
        }
        
        let newPurchase = await axios.post(`/purchase/create`,dataBuy)
        console.log(newPurchase)
        
      })

      dispatch(
//  Esto esta mal porque cambiaron el opbjeto firebaseCurrentUser
//        actions.sendFungibleMail({
//          correoUser: firebaseCurrentUser.email,
//          accion: "error",
//        })

// Asi esta bien
        actions.sendFungibleMail({
          correoUser: firebaseCurrentUser,
          accion: "error",
        })


      );
    } else if (window.location.href.includes("pending")) {
      resultContainer = pendingContainer;
      mercadoPagoBuyData = {
        ...mercadoPagoBuyData,
        statusPay: "Pending",
      };

      let sellers = new Array(...new Set(compras.map((data) => data.userId)))

      sellers.forEach( async seller => {
        let dataBuy = {
          price: compras.filter(nfts=>nfts.userId===seller).map((data) => data.price).reduce((a, b) => a + b),
          payMethod: "MercadoPago",
          statusPay: "Pending",
          buyerId: buyer.id,
          sellerId: seller,
          nftIds: compras.filter(nfts=>nfts.userId===seller).map(nfts=>nfts.id),
        }
        
        let newPurchase = await axios.post(`/purchase/create`,dataBuy)
        console.log(newPurchase)
        
      })

      dispatch(
        actions.sendFungibleMail({
          correoUser: firebaseCurrentUser,
          accion: "pendiente",
        })
      );
    }

    // dispatch(actions.addBuyAtHistoryBuys(mercadoPagoBuyData)); --> Esto que hace? xD
  }

  return <div className={styles["pay-result"]}>{resultContainer}</div>;
}

export default PayResult;
