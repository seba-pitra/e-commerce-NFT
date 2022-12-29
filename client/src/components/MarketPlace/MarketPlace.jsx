import * as actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase.js";
import Pages from "../Pages/Pages";
import FilterOptions from "../FilterOptrions/Options";
import Loading from "../Loading/Loading";

import "./MarketPlace.css";

function MarketPlace({ loggedIn }) {
  const order = useSelector((state) => state.orderDirection);
  const isLoading = useSelector((state) => state.isLoading);
  const loggedUser = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const history = useHistory();

  //   const [loggedIn, setLoggedIn] = useState(true);
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setLoggedIn(true);
  //     } else {
  //       setLoggedIn(false);
  //     }
  //   });

  useEffect(() => {
    // if (loggedIn !== undefined) {
    //   dispatch(actions.getAllNfts());
    //   dispatch(actions.getAllCollections());
    //   // console.log(auth.currentUser)
    //   fetch("http://localhost:3001/payment/userEmail", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(auth.currentUser),
    //   });
    // } else {
    //   history.push("/");
    // }
    validateUser();
  }, []);

  const validateUser = async () => {
    console.log(loggedUser);
    if (Object.keys(loggedUser).length) {
      dispatch(actions.getAllCollections());
      dispatch(actions.getAllNfts());
      dispatch(actions.getEthPrice());
    } else {
      history.push("/");
    }
  };

  useEffect(() => {}, [order]);
  return (
    <>
      <div className="home-background">
        <div className="home-container">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="container_mainpage">
              <div className="test">
                <FilterOptions />
              </div>
              <Pages />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MarketPlace;
