import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions/index";
import "./AdminDashboard.css";

// Components
import NFTList_dash from "./NFTsList_dash/NFTList_dash";
import Charts from "./Charts/BarChart.jsx";

const AdminDashboard = () => {
  const { nfts, users } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getAllNfts());
    dispatch(actions.getAllUsers());
  }, []);

  if (!nfts.length || !users.length) return <h1>Loading</h1>;
  return (
    <div>
      <h1>Soy Dashboard</h1>
      <div>
        <Charts />
      </div>
      <div className="dahsboard-nfts">
        <h3>Admin NFTs</h3>
        <NFTList_dash nfts={nfts} />
      </div>
      <div className="dashboard-users">
        <h3>Admin Users</h3>
        <NFTList_dash users={users} />
      </div>
    </div>
  );
};

export default AdminDashboard;
