import * as actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Pages from "../Pages/Pages";
import FilterOptions from "../FilterOptrions/Options";
import Loading from "../Loading/Loading";
import Offcanvas from "react-bootstrap/Offcanvas";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import "./MarketPlace.css";

function MarketPlace({ loggedIn }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const order = useSelector((state) => state.orderDirection);
  const isLoading = useSelector((state) => state.isLoading);
  const loggedUser = useSelector((state) => state.loggedUser);

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(actions.getAllNfts());
    dispatch(actions.getAllCollections());
  }, []);

  const handleClose = () => setShowFilters(false);
  const handleShow = () => setShowFilters(true);  

  useEffect(() => {}, [order]);

  return (
    <div className="home-container">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container_mainpage">
          <Pages />
        </div>
      )}
    </div>
  );
}

export default MarketPlace;
