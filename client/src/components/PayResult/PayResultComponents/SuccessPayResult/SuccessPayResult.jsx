import successIcon from "../../../../images/icons/success-icon.png";
import { Link } from "react-router-dom";
import React, { useState } from "react";

export default function SuccessPayResult({
  styles,
  createPurchaseMercadoPago,
}) {
  return (
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
          onClick={() => createPurchaseMercadoPago("Successful")}
          className={styles["pay-result-marketplace-button"]}
          to={"/marketplace"}
        >
          MarketPlace
        </Link>
      </div>
    </div>
  );
}
