import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import styles from "./Details.module.css";
import ethereumLogo from "../../images/ethereum-logo.png";

function Details(props) {
  //{image, name, id, owner, price, lastSale,viewsCount,SalesHistory}
  const { id } = props.match.params;

  const nftDetail = useSelector((state) => state.nftDetail);
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getNftDetail(id));
  }, [dispatch, id]);

  console.log("DETALLE", nftDetail);

  return (
    <>
      {
        // si esta cargando muestra el componente de carga caso contrario muestra la el componente de detalle.
        isLoading ? (
          <Loading />
        ) : (
          <div className={styles["detail-all-container"]}>
            <Link to={"/home"} className={styles["back-button"]}>
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
                  <button className={styles.button}>Add to cart</button>
                  <button className={styles.button}>Like</button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}

export default Details;
