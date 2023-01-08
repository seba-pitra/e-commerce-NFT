import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import successIcon from "../../images/icons/success-icon.png";
import issueIcon from "../../images/icons/issue-icon.png";
import pendingIcon from "../../images/icons/pending-icon.png";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import styles from "./stylesheets/PayResult.module.css";

function PayResult(props) {
  const dispatch = useDispatch();

  let firebaseCurrentUser = JSON.parse(
    localStorage.getItem("firebaseCurrentUser")
  );
  const activeUserIs = useSelector((state) => state.activeUser);
  const loggedUser = useSelector((state) => state.loggedUser);

  let userNfts = JSON.parse(localStorage.getItem("nftsOnShoppingCart"));

  let totalAmount = 0;
  for (const nft of userNfts) {
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
    purchases: userNfts,
  };

  const validate =
    window.location.href.includes("collection_status") &&
    window.location.href.includes("external_reference");

  console.log("loggedUser", firebaseCurrentUser);

  if (validate) {
    if (window.location.href.includes("success")) {
      resultContainer = sucessContainer;
      mercadoPagoBuyData = {
        ...mercadoPagoBuyData,
        statusPay: "Successed",
      };

      dispatch(
        actions.sendFungibleMail({
          correoUser: firebaseCurrentUser.email,
          accion: "exito",
        })
      );
    } else if (window.location.href.includes("failure")) {
      resultContainer = failureContainer;
      mercadoPagoBuyData = {
        ...mercadoPagoBuyData,
        statusPay: "Rejected",
      };
      dispatch(
        actions.sendFungibleMail({
          correoUser: firebaseCurrentUser.email,
          accion: "error",
        })
      );
    } else if (window.location.href.includes("pending")) {
      resultContainer = pendingContainer;
      mercadoPagoBuyData = {
        ...mercadoPagoBuyData,
        statusPay: "Pending",
      };
      dispatch(
        actions.sendFungibleMail({
          correoUser: firebaseCurrentUser.email,
          accion: "pendiente",
        })
      );
    }

    dispatch(actions.addBuyAtHistoryBuys(mercadoPagoBuyData));
  }

  return <div className={styles["pay-result"]}>{resultContainer}</div>;
}

export default PayResult;
