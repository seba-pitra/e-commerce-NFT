import * as actions from "../../../redux/actions/index";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import "./NFTsCard_dash.css";

const NFTsCard_dash = ({ id, name, price, userId }) => {
  const [edit, setEdit] = useState(false);
  const [priceState, setPriceState] = useState("");
  const [showPrice, setShowPrice] = useState(price);

  const handleteEdit = (e) => {
    e.preventDefault();
    setEdit(!edit);
  };

  const handlePriceChange = (e) => {
    setPriceState(e.target.value);
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
      <div className="dash-card-id">
        <p>{id}</p>
      </div>
      <div className="dash-card-name">
        <p>{name}</p>
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
      <div className="dash-card-icons">
        <div className="dash-card-icon">
          {edit ? (
            <DoneIcon onClick={handleUpdate} />
          ) : (
            <EditIcon onClick={handleteEdit} />
          )}
        </div>
        <div className="dash-card-icon">
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
};

export default NFTsCard_dash;
