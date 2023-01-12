import * as actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Pages from "../Pages/Pages";
import FilterOptions from "../FilterOptrions/Options";
import Loading from "../Loading/Loading";
import Offcanvas from "react-bootstrap/Offcanvas";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

//dark-light theme
import useStyles from "../../customHooks/useStyles";
import darkStyles from "./stylesheets/DarkMarketPlace.module.css"
import lightStyles from "./stylesheets/LightMarketPlace.module.css"

import { useLoggedUser } from "../../customHooks/useLoggedUser";

function MarketPlace({ loggedIn }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const order = useSelector((state) => state.orderDirection);
  const isLoading = useSelector((state) => state.isLoading);
  const [loggedUser, updateLoggedUser, handleLogOut] = useLoggedUser()

  const [showFilters, setShowFilters] = useState(false);

  const styles = useStyles(darkStyles, lightStyles);
  
  useEffect(() => {
    dispatch(actions.getAllNfts());
    dispatch(actions.getAllCollections());
    dispatch(actions.getEthPrice());
  }, []);

  const handleClose = () => setShowFilters(false);
  const handleShow = () => setShowFilters(true);  

  useEffect(() => {}, [order]);

  //

  return (
    <div className="home-container">
      <div className={styles["market-place-container"]}>
        {isLoading ? (
          <Loading />
        ) : (
          <div className={styles["container_mainpage"]}>
            <Pages />
          </div>
        )}
      </div>
    </div>
  );
}

export default MarketPlace;
