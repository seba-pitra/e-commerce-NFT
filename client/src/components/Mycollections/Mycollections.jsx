import * as actions from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import "./Mycollections.module.css";
import VerifiedIcon from "@mui/icons-material/Verified";

function Mycollections() {
  const loggedUser = useSelector((state) => state.loggedUser);
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

  // -------------------
  //console.log('HERE!!');
  //console.log(loggedUser.collections);
  // -------------------

  const collectionsCards =
    loggedUser.collections &&
    loggedUser.collections.map((collection) => {
      if (collection.nfts.length > 4) {
        let floorPrice = 100;
        collection.nfts.map((nft) => {
          if (nft.price < floorPrice) floorPrice = nft.price;
        });

        return (
          <Link to={`/collections/${collection.id}`} className="nolink">
            <div className="collections-conteiner">
              <img
                className="collections-img-main"
                src={collection.image}
                alt="img-collections"
              />
              <div className="img-name-conteiner">
                <img
                  className="collections-img-owner"
                  src={collection.nfts[0].image}
                  alt="img-collections"
                />
                <div>
                  <div className="collection-name-conteiner">
                    <VerifiedIcon />
                    <h3 className="collections-name"> {collection.name} </h3>
                  </div>
                  <div className="collection-name-conteiner">
                    <h3 className="collections-name">
                      {" "}
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
    <div className="conteiner-main-collections">
      {isLoading ? <Loading /> : collectionsCards}
    </div>
  );
}

export default Mycollections;
