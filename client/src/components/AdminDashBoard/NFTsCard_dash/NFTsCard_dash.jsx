import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// Components
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import RestoreIcon from "@material-ui/icons/Restore";

import styles from "./stylesheets/NFTsCard_dash.module.css";

//Por favor no olvidarse de eliminar los console.logs antes de entregar
const NFTsCard_dash = ({ id, name, price, userId, deletedAt }) => {
  const [edit, setEdit] = useState(false);
  const [priceState, setPriceState] = useState("");
  const [showPrice, setShowPrice] = useState(price);
  const [deleted, setDeleted] = useState(deletedAt);

  const handleteEdit = (e) => {
    e.preventDefault();
    setEdit(!edit);
  };

  const handlePriceChange = (e) => {
    setPriceState(e.target.value);
  };
  const handleDelete = async (e) => {
    try {
      const res = await axios.delete(`/nft/${id}`);
      res.data && setDeleted(true);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
      toast.error("Something was wrong. try again later");
    }
  };

  const handleRestore = async (e) => {
    try {
      const res = await axios.get(`/nft/restore/${id}`);
      res.data && setDeleted(false);
      console.log(res.data);
    } catch (error) {
      toast.error("Something was wrong. try again later");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let priceObj = { price: Number(priceState) };
    try {
      const res = await axios.put(`/nft/${id}`, priceObj);

      setEdit(!edit);
      setShowPrice(res.data.price);
      setPriceState("");
    } catch (err) {
      toast.error("Something was wrong. Try again later", {
        position: "bottom-left",
      });
    }
  };

  return (
    <div className={styles["nfts-dash-card"]}>
      <div className={styles["dash-card-name"]}>
        <Link className={styles["user-dash-link"]} to={`/details/${id}`}>
          <p>{name}</p>
        </Link>
      </div>
      <div className={styles["dash-card-price"]}>
        {edit ? (
          <input
            value={priceState}
            onChange={handlePriceChange}
            placeholder="new price"
          />
        ) : (
          <p>{showPrice}</p>
        )}
      </div>
      <div className={styles["dash-card-userId"]}>
        <p>{userId === "null" ? "No Owner" : userId}</p>
      </div>
      {edit ? (
        <div className={styles["dash-card-icons"]}>
          <div className={styles["dash-card-icon"]}>
            <DoneIcon onClick={handleUpdate} />
          </div>
          <div className={styles["dash-card-icon"]}>
            <CloseIcon onClick={handleteEdit} />
          </div>
        </div>
      ) : (
        <div className={styles["dash-card-icons"]}>
          <div className={styles["dash-card-icon"]}>
            <EditIcon onClick={handleteEdit} />
          </div>
          <div className={styles["dash-card-icon"]}>
            {deleted ? (
              <RestoreIcon onClick={handleRestore} />
            ) : (
              <DeleteIcon onClick={handleDelete} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTsCard_dash;
