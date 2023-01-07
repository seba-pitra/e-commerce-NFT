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
