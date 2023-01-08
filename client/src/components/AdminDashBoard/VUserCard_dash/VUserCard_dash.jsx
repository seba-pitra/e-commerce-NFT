import React from "react";
import "./VUserCard_dash.css";
import { auth } from "../../../firebase.js";
import { deleteUser } from "firebase/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
// Components
import BlockIcon from "@material-ui/icons/Block";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const VUserCard_dash = ({
  id,
  name,
  last_name,
  dni,
  age,
  phoneNumber,
  nacionality,
  pp1,
  pp2,
  pp3,
}) => {
  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/user/verify/${id}`);
    } catch (error) {
      toast.error("Something was wrong. try again later");
    }
  };
  const handleReject = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/user/reject/${id}`);
    } catch (error) {
      toast.error("Something was wrong. try again later");
    }
  };

  return (
    <div className="user-dash-card">
      <div className="vUser-dash-name">
        <p>{`${name} ${last_name}`}</p>
      </div>
      <div className="vUser-dash-dni">
        <p>{dni}</p>
      </div>
      <div className="vUser-dash-age">
        <p>{age}</p>
      </div>
      <div className="vUser-dash-pn">
        <p>{phoneNumber}</p>
      </div>
      <div className="vUser-dash-nacionality">
        <p>{nacionality}</p>
      </div>
      <div className="vUser-dash-pp1">
        <a className="user-dash-link" href={pp1} target={"_blank"}>
          Face
        </a>
        <a className="user-dash-link" href={pp2} target={"_blank"}>
          DNI-Front
        </a>
        <a className="user-dash-link" href={pp3} target={"_blank"}>
          DNI-Back
        </a>
      </div>
      <div className="dash-card-icons">
        <div className="dash-card-icon">
          <CheckIcon onClick={(e) => handleVerify(e)} />
        </div>
        <div className="dash-card-icon">
          <CloseIcon onClick={(e) => handleReject(e)} />
        </div>
      </div>
    </div>
  );
};

export default VUserCard_dash;
