import React from "react";
import pendingIcon from "../../../../images/icons/pending-icon.png";
import { Link } from "react-router-dom";

export default function PendingPayResult({
  styles,
  createPurchaseMercadoPago,
}) {
  return (
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
          onClick={() => createPurchaseMercadoPago("Pending")}
          className={styles["pay-result-marketplace-button"]}
          to={"/marketplace"}
        >
          MarketPlace
        </Link>
      </div>
    </div>
  );
}
