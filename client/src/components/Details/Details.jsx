import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import styles from "./Details.module.css";
import ethereumLogo from "../../images/ethereum-logo.png";
import { startPayment } from "../../utils";
import { useHistory } from "react-router-dom";



const Details = (props) => {

	const dispatch = useDispatch();
	const history = useHistory();

	let loginStatusStorage = localStorage.getItem("Logged");


	const validateUser = async () => {
		let loginStatusStorage = localStorage.getItem("Logged");
		if (loginStatusStorage === "Estoy loggeado") {
			dispatch(actions.getAllNfts());
			dispatch(actions.getAllCollections());
			dispatch(actions.getEthPrice());
		} else {
			history.push("/");
		}
	};

 //useEffect(() => {
 //     validateUser();
 // }, []);


  const { id } = props.match.params;
  let sales;
  const nftDetail = useSelector((state) => state.nftDetail);
  const isLoading = useSelector((state) => state.isLoading);

  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  useEffect(() => {
      validateUser();
	  dispatch(actions.getNftDetail(id));
  }, [dispatch, id]);

  const handlePay = async (e) => {
    setError();
    const transactionMetamask = await startPayment({
      setError,
      setTxs,
      ether: nftDetail.price.toString(),
      addr: nftDetail.contract,
    });

    console.log(transactionMetamask);
    let buyData = {
      price: nftDetail.price + " ETH",
      contract: nftDetail.contract,
      payMethod: "Metamask",
      statusPay: "Created",
    };

    if (transactionMetamask.hash) {
      //si salio bien...
      buyData = {
        ...buyData,
        statusPay: "Successed",
      };
    } else if (transactionMetamask.includes("rejected")) {
      //si se rechazo en metamask
      buyData = {
        ...buyData,
        statusPay: "Rejected",
      };
    } else if (transactionMetamask.includes("insufficient funds")) {
      //si faltan fondos
      buyData = {
        ...buyData,
        statusPay: "Pending",
      };
    }

    dispatch(actions.addBuyAtHistoryBuys(buyData));
  };

  const handleClickOnShoppingCart = (e) => {
    dispatch(actions.addNftOnShoppingCart(nftDetail));
  };

  console.log(nftDetail);


  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles["detail-all-container"]}>
          <Link to={"/marketplace"} className={styles["back-button"]}>
            {"< "}Back
          </Link>
          <div className={styles["detail-card-container"]}>
            <img
              src={nftDetail.image}
              alt="nft-detail"
              className={styles["nft-img"]}
            />
            <div className={styles["nft-data-container"]}>
              <div>
                <h1>{nftDetail.name}</h1>
                {nftDetail.source && (
                  <span className={styles["detail-span"]}>
                    Included from{"  "}
                    <img
                      src={nftDetail.source.icon}
                      alt="icon-detail"
                      className={styles["source-icon"]}
                    />
                  </span>
                )}
              </div>
              <div className={styles["price-container"]}>
                <span className={styles["detail-span"]}>Price</span>
                <div className={styles["ethereum-container"]}>
                  <img
                    src={ethereumLogo}
                    alt="ethereum-logo"
                    className={styles["ethereum-logo-price"]}
                  />
                  <h3>{nftDetail.price}</h3>
                </div>
              </div>
              <div className={styles["data-detail-nft"]}>
                <h2>Details</h2>
                {nftDetail.available ? (
                  <span className={styles.available}>Available</span>
                ) : (
                  <span className={styles.unavailable}>Unavailable</span>
                )}
                <div>
                  <span>
                    Contract
                    <br />
                    adress:
                  </span>
                  <span className={styles["contract-adress"]}>
                    {nftDetail.contract}
                  </span>
                </div>
                <div>
                  <span>Token id:</span>
                  <span>{nftDetail.tokenId}</span>
                </div>
              </div>
              <div className={styles["buttons-container"]}>
                <button className={styles["button-detail"]} onClick={handlePay}>
                  Select & buy
                </button>

                <button
                  className={styles["button-detail"]}
                  onClick={handleClickOnShoppingCart}
                >
                  Add to Cart
                </button>
              </div>
              {error && <p>{error}</p>}
              {txs && <p>{txs}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
