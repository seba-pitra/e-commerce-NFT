import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { useState } from "react";
import successIcon from "../../images/icons/success-icon.png";
import issueIcon from "../../images/icons/issue-icon.png";
import pendingIcon from "../../images/icons/pending-icon.png";
import styles from "./PayResult.module.css";
import { Link } from "react-router-dom";

function PayResult(props) {
  const dispatch = useDispatch();

  let userNfts = JSON.parse(localStorage.getItem("nftsOnShoppingCart"));

  let totalAmount = 0;
  for (const nft of userNfts) {
    totalAmount += nft.price;
  }

  let resultContainer;

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
        <Link className={styles["pay-result-success-details-button"]}>
          View Details
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
        <Link className={styles["pay-result-failure-details-button"]}>
          View Details
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
        <Link className={styles["pay-result-peding-details-button"]}>
          View Details
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

  if (validate) {
    if (window.location.href.includes("success")) {
      resultContainer = sucessContainer;
      mercadoPagoBuyData = {
        ...mercadoPagoBuyData,
        statusPay: "Successed",
      };
    } else if (window.location.href.includes("failure")) {
      resultContainer = failureContainer;
      mercadoPagoBuyData = {
        ...mercadoPagoBuyData,
        statusPay: "Rejected",
      };
    } else if (window.location.href.includes("pending")) {
      resultContainer = pendingContainer;
      mercadoPagoBuyData = {
        ...mercadoPagoBuyData,
        statusPay: "Pending",
      };
    }

    dispatch(actions.addBuyAtHistoryBuys(mercadoPagoBuyData));
  }

  return <div className={styles["pay-result"]}>{resultContainer}</div>;
}

export default PayResult;
