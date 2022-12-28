import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import successIcon from "../../images/icons/success-icon.png";
import issueIcon from "../../images/icons/issue-icon.png";
import pendingIcon from "../../images/icons/pending-icon.png";
import styles from "./PayResult.module.css";
import { Link } from "react-router-dom";

function PayResult(props) {
  const dispatch = useDispatch();

  const nodemailer = require('nodemailer');


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

// ------- send mail

async function SendingMail() {
  let testAccount = await nodemailer.createTestAccount();

	// create transporter SMTP transport
	let transporter = nodemailer.createTransport({
		host: "mail.gruponucleon.com",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: "andresarzate@gruponucleon.com", 
			pass: "Henry-Nodejs-2022", 
		},
		tls:{ 
			secure: false,
			ignoreTLS: true,
			rejectUnauthorized: false
		},
	});  
	
	// messages ----------------------

	let info = await transporter.sendMail({
		from: '"Principal" <andresarzate@gruponucleon.com>', 
		to: "direccion@gruponucleon.com", // receivers
		subject: "Hello world", // Subject line
		text: "Hello world? all works fine!!", // plain text body
		html: "<b>Se puede incluir html?</b>", // html body
	});

	// -------------------------------
}
// Shebang function
// SendingMail().catch(console.error);
// ----------------SendMail End-







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
 SendingMail().catch(console.error);
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
