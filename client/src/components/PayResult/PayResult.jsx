import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import successIcon from "../../images/icons/success-icon.png";
import issueIcon from "../../images/icons/issue-icon.png";
import styles from "./PayResult.module.css";

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
      <img
        src={successIcon}
        alt="pay-icon"
        className={styles["pay-result-img-icon"]}
      />
      <h1 className={styles["pay-result-title"]}>Success!</h1>
      <p>We are delighted to inform you that we are received your payment</p>
      <div>
        <button>Back to MarketPlace</button>
        <button>View Details</button>
      </div>
    </div>
  );

  const failureContainer = (
    <div className={styles["pay-result-container"]}>
      <img
        src={issueIcon}
        alt="pay-icon"
        className={styles["pay-result-img-icon"]}
      />
      <h1 className={styles["pay-result-title"]}>Error!</h1>
      <span className={styles["pay-result-span"]}>
        Unfortunately we have an issue with your payment. Try again later
      </span>
      <div>
        <button>Back to MarketPlace</button>
        <button>View Details</button>
      </div>
    </div>
  );

  const pendingContainer = (
    <div className={styles["pay-result-container"]}>
      <img
        src={issueIcon}
        alt="pay-icon"
        className={styles["pay-result-img-icon"]}
      />
      <h1 className={styles["pay-result-title"]}>Pending...</h1>
      <span className={styles["pay-result-span"]}>
        The payment is waiting for
      </span>
      <div>
        <button>Back to MarketPlace</button>
        <button>View Details</button>
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
