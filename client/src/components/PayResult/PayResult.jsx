import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import { useLoggedUser } from "../../customHooks/useLoggedUser";
import SuccessPayResult from "./PayResultComponents/SuccessPayResult/SuccessPayResult";

import useStyles from "../../customHooks/useStyles";
import darkStyles from "./stylesheets/DarkPayResult.module.css";
import lightStyles from "./stylesheets/LightPayResult.module.css";
import FailurePayResult from "./PayResultComponents/FailurePayResult/FailurePayResult";
import PendingPayResult from "./PayResultComponents/PendingPayResult/PendingPayReult";

function PayResult(props) {
  const dispatch = useDispatch();

  const styles = useStyles(darkStyles, lightStyles);

  const [loggedUser, updateLoggedUser, handleLogOut] = useLoggedUser();

  let firebaseCurrentUser = JSON.parse(localStorage.getItem("User"));

  let buyer = JSON.parse(localStorage.getItem("User"));

  let compras = JSON.parse(localStorage.getItem("compras"));

  let shoppingCartContents = JSON.parse(
    localStorage.getItem("nftsOnShoppingCart")
  ); // este es monousuario

  let totalAmount = 0;
  for (const nft of shoppingCartContents) {
    totalAmount += nft.price;
  }

  const validate =
    window.location.href.includes("collection_status") &&
    window.location.href.includes("external_reference");

  function createPurchaseMercadoPago(statusPay) {
    if (statusPay === "Successful") {
      let sellers = new Array(...new Set(compras.map((data) => data.userId)));

      sellers.forEach(async (seller) => {
        let dataBuy = {
          price: compras
            .filter((nfts) => nfts.userId === seller)
            .map((data) => data.price)
            .reduce((a, b) => a + b),
          payMethod: "MercadoPago",
          statusPay: statusPay,
          buyerId: buyer.id,
          sellerId: seller,
          nftIds: compras
            .filter((nfts) => nfts.userId === seller)
            .map((nfts) => nfts.id),
        };
        let newPurchase = await axios.post(`/purchase/create`, dataBuy);
      });

      dispatch(
        actions.sendFungibleMail({
          correoUser: firebaseCurrentUser,
          accion: "exito",
        })
      );
    } else if (statusPay === "Rejected") {
      let sellers = new Array(...new Set(compras.map((data) => data.userId)));

      sellers.forEach(async (seller) => {
        let dataBuy = {
          price: compras
            .filter((nfts) => nfts.userId === seller)
            .map((data) => data.price)
            .reduce((a, b) => a + b),
          payMethod: "MercadoPago",
          statusPay: "Rejected",
          buyerId: loggedUser.id,
          sellerId: seller,
          nftIds: compras
            .filter((nfts) => nfts.userId === seller)
            .map((nfts) => nfts.id),
        };

        let newPurchase = await axios.post(`/purchase/create`, dataBuy);
      });

      dispatch(
        actions.sendFungibleMail({
          correoUser: firebaseCurrentUser,
          accion: "error",
        })
      );
    } else if (statusPay === "Pending") {
      let sellers = new Array(...new Set(compras.map((data) => data.userId)));

      sellers.forEach(async (seller) => {
        let dataBuy = {
          price: compras
            .filter((nfts) => nfts.userId === seller)
            .map((data) => data.price)
            .reduce((a, b) => a + b),
          payMethod: "MercadoPago",
          statusPay: "Pending",
          buyerId: buyer.id,
          sellerId: seller,
          nftIds: compras
            .filter((nfts) => nfts.userId === seller)
            .map((nfts) => nfts.id),
        };

        let newPurchase = await axios.post(`/purchase/create`, dataBuy);
      });

      dispatch(
        actions.sendFungibleMail({
          correoUser: firebaseCurrentUser,
          accion: "pendiente",
        })
      );
    }
  }

  let resultContainer;

  if (validate) {
    if (window.location.href.includes("success")) {
      resultContainer = (
        <SuccessPayResult
          styles={styles}
          createPurchaseMercadoPago={createPurchaseMercadoPago}
        />
      );
    } else if (window.location.href.includes("failure")) {
      resultContainer = (
        <FailurePayResult
          styles={styles}
          createPurchaseMercadoPago={createPurchaseMercadoPago}
        />
      );
    } else if (window.location.href.includes("pending")) {
      resultContainer = (
        <PendingPayResult
          styles={styles}
          createPurchaseMercadoPago={createPurchaseMercadoPago}
        />
      );
    }
  }

  return <div className={styles["pay-result"]}>{resultContainer}</div>;
}

export default PayResult;
