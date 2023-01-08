// import * as actions from "../actions/actions.js";
import styles from "./stylesheets/PurchaseHistory.module.css";

const PurchaseHistory = ({ props }) => {
  //price,statusPay,purchases
  return (
    <div className={styles["detail-shopping-history"]}>
      {props ? (
        <div className={styles["history-title-container"]}>
          <div className={styles["sale"]}>Sale Price</div>
          <div className={styles["from"]}>From</div>
          <div className={styles["to"]}>To</div>
          <div className={styles["date"]}>Date</div>
        </div>
      ) : (
        <div>There isn't shopping history</div>
      )}

      {props &&
        props.map((elem) => {
          return (
            <div className={styles["history-title-container"]}>
              <div className={styles["from"]}>{elem.contract}</div>
              <div className={styles["to"]}>{elem.contract}</div>
              <div className={styles["date"]}>{elem.createdAt}</div>
            </div>
          );
        })}
    </div>
  );
};

export default PurchaseHistory;
