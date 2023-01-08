import React from "react";
import "./UserCard_dash.css";
import { auth } from "../../../firebase.js";
import { deleteUser } from "firebase/auth";
import { Link } from "react-router-dom";
import axios from "axios";
// Components
import BlockIcon from "@material-ui/icons/Block";
import RestoreIcon from "@material-ui/icons/Restore";
import { useState } from "react";

const UserCard_dash = ({ id, username, email, type, deletedAt }) => {
  const [deleted, setDeleted] = useState(deletedAt);

  const handleBlock = async () => {
    const res = await axios.delete(`/user/${id}`);
    // const res = await axios.delete(`/user/${id}asasd`);
    res.data && setDeleted(true);
    console.log(res);
  };
  const handleRestore = async () => {
    const res = await axios.get(`/user/restore/${id}`);
    res.data && setDeleted(false);
    console.log(res.data);
  };

  return (
    <div className="user-dash-card">
      <div className="user-dash-name">
        <Link className="user-dash-link" to={`/admin/user/${id}`}>
          <p>{username}</p>
        </Link>
      </div>
      <div className="user-dash-email">
        <p>{email}</p>
      </div>
      <div className="user-dash-type">
        <p>{type === "VerificationInProcess" ? "In process" : type}</p>
      </div>
      <div className="dash-card-icons">
        {deleted ? (
          <div className="dash-card-icon">
            <RestoreIcon onClick={handleRestore} />
          </div>
        ) : (
          <div className="dash-card-icon">
            <BlockIcon onClick={handleBlock} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard_dash;
