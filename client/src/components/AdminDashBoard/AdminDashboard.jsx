import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../redux/actions/index";
import "./AdminDashboard.css";

// Components
import NFTList_dash from "./NFTsList_dash/NFTList_dash";
import Charts from "./Charts/BarChart.jsx";
import DoughChart from "./Charts/DougnoutChart.jsx";
import Loading from "../Loading/Loading";

const AdminDashboard = () => {
  const { adminNfts, adminUsers, collections, loggedUser } = useSelector(
    (state) => state
  );

  console.log("nft", adminNfts);
  console.log("user", adminUsers);
  console.log("collection", collections);
  console.log("logged", loggedUser);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    validateUser();
  }, [dispatch]);

  const validateUser = () => {
    let loginStatusStorage = localStorage.getItem("Logged");
    if (loginStatusStorage === "Estoy loggeado") {
      dispatch(actions.getAllAdminNfts());
      dispatch(actions.getAllAdminUsers());
      dispatch(actions.getAllCollections());
    } else {
      history.push("/");
    }
  };

  if (!adminNfts.length || !adminUsers.length || !collections.length)
    return <Loading />;
  return (
    <div className="dashboard-container">
      <div className="dashboard-barchart">
        <Charts chartNfts={adminNfts} chartCollections={collections} />
      </div>
      <div className="dashboard-users-info">
        <div className="dashboard-users">
          <h3>Manage Users</h3>
          <NFTList_dash users={adminUsers} />
        </div>
        <DoughChart users={adminUsers} />
      </div>
      <div className="dasboard-left-side">
        <div className="dahsboard-nfts">
          <h3>Manage NFTs</h3>
          <NFTList_dash nfts={adminNfts} />
        </div>
        <div className="dashboard-verify">
          <h3>Manage Verifications</h3>
          <NFTList_dash
            verifyingUsers={adminUsers.filter(
              (user) => user.type === "VerificationInProcess"
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
