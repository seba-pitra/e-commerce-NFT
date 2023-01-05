import React from "react";
import "./VUserCard_dash.css";
import { auth } from "../../../firebase.js";
import { deleteUser } from "firebase/auth";
import { Link } from "react-router-dom";
import axios from "axios";
// Components
import BlockIcon from "@material-ui/icons/Block";

const VUserCard_dash = ({
  id,
  name,
  last_name,
  dni,
  age,
  phoneNumber,
  nacionality,
}) => {
  const handleBlock = async () => {
    const res = await axios.delete(`/user/${id}`);
    console.log(res.data);
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(auth.currentUser);
  };

  return (
    <div className="user-dash-card">
      <div className="user-dash-name">
        <p>{name}</p>
      </div>
      <div className="user-dash-email">
        <p>{last_name}</p>
      </div>
      <div className="user-dash-email">
        <p>{dni}</p>
      </div>
      <div className="user-dash-email">
        <p>{age}</p>
      </div>
      <div className="user-dash-email">
        <p>{phoneNumber}</p>
      </div>
      <div className="user-dash-email">
        <p>{nacionality}</p>
      </div>
      <div className="user-dash-email">
        <p>Pp1</p>
      </div>
    </div>
  );
};

export default VUserCard_dash;
