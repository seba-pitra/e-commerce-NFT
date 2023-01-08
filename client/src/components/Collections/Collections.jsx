import * as actions from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import styles from "./stylesheets/Collections.module.css";

function Collections() {
  //  const loggedUser = useSelector((state) => state.loggedUser);
  const history = useHistory();
  const dispatch = useDispatch();
  let loginStatusStorage = localStorage.getItem("Logged");

  useEffect(() => {
    validateUser();
  }, [dispatch]);

  const validateUser = async () => {
    if (loginStatusStorage) {
      dispatch(actions.getAllNfts());
      dispatch(actions.getAllCollections());
    } else {
      history.push("/");
    }
  };

  const collections = useSelector((state) => state.collections);
  const isLoading = useSelector((state) => state.isLoading);

  const collectionsCards = collections.map((collection) => {
    if (collection.nfts.length > 4) {
      let floorPrice = 100;
      collection.nfts.map((nft) => {
        if (nft.price < floorPrice) floorPrice = nft.price;
      });

      return (
        <Link to={`/collections/${collection.id}`} className={styles["link"]}>
          <div className={styles["collections-container"]}>
            <img
              className={styles["collections-img-main"]}
              src={collection.image}
              alt="img-collections"
            />
            <div className={styles["img-name-container"]}>
              <img
                className={styles["collections-img-owner"]}
                src={collection.nfts[0].image}
                alt="img-collections"
              />
              <div>
                <div className={styles["collection-name-container"]}>
                  <VerifiedIcon />
                  <h3 className={styles["collections-name"]}>
                    {collection.name}
                  </h3>
                </div>
                <div className={styles["collection-name-container"]}>
                  <h3 className={styles["collections-name"]}>
                    Floor Price ETH: {floorPrice.toFixed(3)}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    }
  });

  return (
    <div className={styles["container-main-collections"]}>
      {isLoading ? <Loading /> : collectionsCards}
    </div>
  );
}

export default Collections;
