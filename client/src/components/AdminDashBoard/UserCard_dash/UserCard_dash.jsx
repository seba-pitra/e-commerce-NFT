import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./stylesheets/UserCard_dash.module.css";
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
    <div className={styles["user-dash-card"]}>
      <div className={styles["user-dash-name"]}>
        <Link className={styles["user-dash-link"]} to={`/admin/user/${id}`}>
          <p>{username.split(" ").length>1?username.split(" ")[0]:username}</p>
        </Link>
      </div>
      <div className={styles["user-dash-email"]}>
        <p>{email}</p>
      </div>
      <div className={styles["user-dash-type"]}>
        <p>{type === "VerificationInProcess" ? "In process" : type}</p>
        {deleted ? (
          <div className={styles["dash-card-icon"]}>
            <RestoreIcon onClick={handleRestore} />
          </div>
        ) : (
          <div className={styles["dash-card-icon"]}>
            <BlockIcon onClick={handleBlock} />
          </div>
        )}
      </div>
      <div className={styles["dash-card-icons"]}>
        {/* {deleted ? (
          <div className={styles["dash-card-icon"]}>
            <RestoreIcon onClick={handleRestore} />
          </div>
        ) : (
          <div className={styles["dash-card-icon"]}>
            <BlockIcon onClick={handleBlock} />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default UserCard_dash;
