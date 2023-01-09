import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import Loading from "../Loading/Loading";
import { Link, useHistory } from "react-router-dom";
import styles from "./Details.module.css";
import ethereumLogo from "../../images/ethereum-logo.png";
import { startPayment } from "../../utils";
import StarRating from "../StarRating/StarRating";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Details = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = props.match.params;
  const nftDetail = useSelector((state) => state.nftDetail);
  const isLoading = useSelector((state) => state.isLoading);

  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);


  useEffect(() => {
    dispatch(actions.getNftDetail(id));
    dispatch(actions.addViewNft(id));
  }, [dispatch, id]);

  const handlePay = async (e) => {
    setError();
    const transactionMetamask = await startPayment({
      setError,
      setTxs,
      ether: nftDetail.price.toString(),
      addr: nftDetail.contract,
    });

    //aca muestra quien hizo la compra y quien recibio la plata.
    let buyData = {
      price: nftDetail.price + " ETH",
      contract: nftDetail.contract,
      payMethod: "Metamask",
      statusPay: "Created",
      purchases: [nftDetail],
    };

    if (transactionMetamask.hash) {
      //si salio bien...
      toast.success("Payment successfully", {
        position: "bottom-left",
      });
      buyData = {
        ...buyData,
        statusPay: "Successful",
      };
    } else if (transactionMetamask.includes("rejected")) {
      //si se rechazo en metamask
      toast.error("Something was wrong. Try again later", {
        position: "bottom-left",
      });
      buyData = {
        ...buyData,
        statusPay: "Rejected",
      };
    } else if (transactionMetamask.includes("insufficient funds")) {
      //si faltan fondos
      toast.warning("You have insufficient funds in Metamask", {
        position: "bottom-left",
      });
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

  let date = new Date(nftDetail.createdTs);
  date = date.toString();
  date = date.slice(4, 16);

  //esto va a traer el promedio directamente del model
  
  let starsValue = 0;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles["detail-all-container"]}>
          <button
            onClick={() => history.goBack()}
            className={styles["back-button"]}
          >
            {" "}
            {"< "}Back{" "}
          </button>
          <div className={styles["detail-card-container"]}>
            <img
              src={nftDetail.image}
              alt="nft-detail"
              className={styles["nft-img"]}
            />

            <div className={styles["nft-data-container"]}>
              <div>
                <StarRating nftId={nftDetail.id}/>
                <h1>{nftDetail.name}</h1>
                <span className={styles["detail-span"]}>
                  Included from {nftDetail.ownerName + " "}
                  <img
                    src={nftDetail.ownerIcon}
                    alt="icon-detail"
                    className={styles["source-icon"]}
                  />
                </span>
              </div>

              <div>
                <span className={styles["detail-span"]}>
                  {"Item from "}
                  <Link to={"/collections/" + nftDetail.collection?.id}>
                    {nftDetail.collection?.name}
                  </Link>
                  {" collection"}
                </span>
              </div>

              <div className={styles["flex-row3"]}>
                <h6>Views: {nftDetail.favs}</h6>
                <h6>Stars: {starsValue}</h6>
                <h6>Rarity: {nftDetail.rarity}</h6>
              </div>

              <div className={styles["price-container"]}>
                <div className={styles["ethereum-container"]}>
                  <span className={styles["detail-span"]}>Price</span>
                  <div className="flex-row">
                    <img
                      src={ethereumLogo}
                      alt="ethereum-logo"
                      className={styles["ethereum-logo-price"]}
                    />
                    <h4>{nftDetail.price?.toFixed(3)}</h4>
                  </div>
                </div>
                <div className={styles["ethereum-container"]}>
                  <span className={styles["detail-span"]}>Last Buy</span>
                  <div className="flex-row">
                    <img
                      src={ethereumLogo}
                      alt="ethereum-logo"
                      className={styles["ethereum-logo-price"]}
                    />
                    <h4>{nftDetail.lastBuyValue?.toFixed(3)}</h4>
                  </div>
                </div>
              </div>

              <div className={styles["data-detail-nft"]}>
                {/* <span >
                  {nftDetail.description}
                </span> */}
                <h6 className={styles.categories}>
                  Categories: <br /> {nftDetail.category?.join(", ")}
                </h6>
                {/* {nftDetail.available ? (
                  <span className={styles.available}>Available</span>
                ) : (
                  <span className={styles.unavailable}>Unavailable</span>
                )} */}
                <h6>Created At: {date}</h6>
              </div>

              <div className={styles["buttons-container"]}>
                <button className={styles["button-detail"]} onClick={handlePay}>
                  {" "}
                  Buy now{" "}
                </button>
                <button
                  className={styles["button-detail"]}
                  onClick={handleClickOnShoppingCart}
                >
                  {" "}
                  Add to Cart{" "}
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
