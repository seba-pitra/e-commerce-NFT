import React, { useState } from "react";
import "./NFTsCard_dash.css";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";

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

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/nft/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: Number(priceState) }),
    })
      .then((res) => res.json())
      .then((data) => {
        setEdit(!edit);
        setShowPrice(data.price);
        setPriceState("");
      })
      .catch((err) => {
        alert(err.message);
      });
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
