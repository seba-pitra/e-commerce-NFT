import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import Loading from "../Loading/Loading";
import { Link, useHistory } from "react-router-dom";
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

  let date = new Date(nftDetail.createdTs)
  date = date.toString()
  date = date.slice(4, 16)

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles["detail-all-container"]}>
          <button onClick={() => history.goBack()} className={styles["back-button"]}> {"< "}Back </button>
          <div className={styles["detail-card-container"]}>
            <img src={nftDetail.image} alt="nft-detail" className={styles["nft-img"]} />
            
            <div className={styles["nft-data-container"]}>

              <div>
                <h1>{nftDetail.name}</h1>
                <span className={styles["detail-span"]}>
                  Included from {nftDetail.ownerName + " "}
                  <img src={nftDetail.ownerIcon} alt="icon-detail" className={styles["source-icon"]} />
                </span>
              </div>

              <div>
                <span className={styles["detail-span"]}>
                  Item from "{nftDetail.collection?.name}" collection
                </span>
              </div>

              <div className={styles["flex-row3"]}>
                <h6>Favs: {nftDetail.favs}</h6>
                <h6>Stars: {nftDetail.stars}</h6>
                <h6>Rarity: {nftDetail.rarity}</h6>
              </div>

              <div className={styles["price-container"]}>
                <div className={styles["ethereum-container"]}>
                <span className={styles["detail-span"]}>Price</span>
                <div className="flex-row">
                  <img src={ethereumLogo} alt="ethereum-logo" className={styles["ethereum-logo-price"]} />
                  <h4>{nftDetail.price?.toFixed(3)}</h4>
                </div>
                </div>
                <div className={styles["ethereum-container"]}>
                <span className={styles["detail-span"]}>Last Buy</span>
                <div className="flex-row">
                  <img src={ethereumLogo} alt="ethereum-logo" className={styles["ethereum-logo-price"]} />
                  <h4>{nftDetail.lastBuyValue?.toFixed(3)}</h4>
                </div>
                </div>
              </div>

              <div className={styles["data-detail-nft"]}>
                <h3>Details</h3>
                <h6>{nftDetail.description}</h6>
                {/* {nftDetail.available ? ( <span className={styles.available}>Available</span> ) : ( <span className={styles.unavailable}>Unavailable</span> )} */}
                <h6>Categories: {nftDetail.category?.join(", ")}</h6>
                <h6>Created At: {date}</h6>
              </div>

              <div className={styles["buttons-container"]}>
                <button className={styles["button-detail"]} onClick={handlePay}> Buy now </button>
                <button className={styles["button-detail"]} onClick={handleClickOnShoppingCart} > Add to Cart </button>
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
