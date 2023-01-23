import React from "react";
import issueIcon from "../../../../images/icons/issue-icon.png";
import { Link } from "react-router-dom";

export default function FailurePayResult({
  styles,
  createPurchaseMercadoPago,
}) {
  return (
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
          onClick={() => createPurchaseMercadoPago("Rejected")}
          className={styles["pay-result-marketplace-button"]}
          to={"/marketplace"}
        >
          MarketPlace
        </Link>
      </div>
    </div>
  );
}
