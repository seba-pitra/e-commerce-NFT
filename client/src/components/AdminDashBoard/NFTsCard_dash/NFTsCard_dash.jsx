import * as actions from "../../../redux/actions/index";
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

import "./NFTsCard_dash.css";

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
      console.log(error.message);
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
      toast.error("Something was wrong. try again later");
      // alert(err.message);
    }
  };
  return (
    <div className="nfts-dash-card">
      <div className="dash-card-name">
        <Link className="user-dash-link" to={`/details/${id}`}>
          <p>{name}</p>
        </Link>
      </div>
      <div className="dash-card-price">
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
      <div className="dash-card-userId">
        <p>{userId === "null" ? "No Owner" : userId}</p>
      </div>
      {edit ? (
        <div className="dash-card-icons">
          <div className="dash-card-icon">
            <DoneIcon onClick={handleUpdate} />
          </div>
          <div className="dash-card-icon">
            <CloseIcon onClick={handleteEdit} />
          </div>
        </div>
      ) : (
        <div className="dash-card-icons">
          <div className="dash-card-icon">
            <EditIcon onClick={handleteEdit} />
          </div>
          <div className="dash-card-icon">
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
