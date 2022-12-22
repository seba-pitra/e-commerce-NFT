import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions/index";
import "./AdminDashboard.css";

// Components
import NFTList_dash from "./NFTsList_dash/NFTList_dash";

const AdminDashboard = () => {
  const { nfts } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getAllNfts());
  }, []);

  if (!nfts.length) return <h1>Loading</h1>;
  return (
    <div>
      <h1>Soy Dashboard</h1>
      <div className="dahsboard-nfts">
        <h3>Admin NFTs</h3>
        <NFTList_dash nfts={nfts} />
      </div>
    </div>
  );
};

export default AdminDashboard;
