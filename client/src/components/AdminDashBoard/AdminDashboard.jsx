import React from "react";
import "./AdminDashboard.css";

// Components
import NFTList_dash from "./NFTsList_dash/NFTList_dash";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Soy Dashboard</h1>
      <div className="dahsboard-nfts">
        <h3>Admin NFTs</h3>
        <NFTList_dash />
      </div>
    </div>
  );
};

export default AdminDashboard;
