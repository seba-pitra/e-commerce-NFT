import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../redux/actions/index";
import "./AdminDashboard.css";

// Components
import NFTList_dash from "./NFTsList_dash/NFTList_dash";
import Charts from "./Charts/BarChart.jsx";

const AdminDashboard = () => {
  const { nfts, users, collections, loggedUser } = useSelector(
    (state) => state
  );

  console.log("nft", nfts);
  console.log("user", users);
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
      dispatch(actions.getAllNfts());
      dispatch(actions.getAllUsers());
      dispatch(actions.getAllCollections());
    } else {
      history.push("/");
    }
  };

  if (!nfts.length || !users.length || !collections.length)
    return <h1>Loading</h1>;
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <Charts chartNfts={nfts} chartCollections={collections} />
      </div>
      <div className="dahsboard-nfts">
        <h3>Admin NFTs</h3>
        <NFTList_dash nfts={nfts} />
      </div>
      <div className="dashboard-users">
        <h3>Admin Users</h3>
        <NFTList_dash users={users} />
      </div>
      <div>
        <h3>Admin verifying process</h3>
        <NFTList_dash verifyingUsers={users.filter(user=>user.type==="VerificationInProcess")} />
      </div>
    </div>
  );
};

export default AdminDashboard;
