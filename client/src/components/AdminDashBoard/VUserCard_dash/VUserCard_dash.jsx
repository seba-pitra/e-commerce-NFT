import React from "react";
import { toast } from "react-toastify";
import * as actions from "../../../redux/actions";
import styles from "./stylesheets/VUserCard_dash.module.css";
// Components
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      dispatch(actions.verifyUser(id));
    } catch (error) {
      toast.error("Something was wrong. try again later");
    }
  };
  const handleReject = async (e) => {
    e.preventDefault();
    try {
      dispatch(actions.rejectVerification(id));
    } catch (error) {
      toast.error("Something was wrong. try again later");
    }
  };

  return (
    <div className={styles["vUser-dash-card"]}>
      <div className={styles["vUser-dash-name"]}>
        <p>{`${name} ${last_name}`}</p>
      </div>
      <div className={styles["vUser-dash-dni"]}>
        <p>{dni}</p>
      </div>
      <div className={styles["vUser-dash-age"]}>
        <p>{age}</p>
      </div>
      <div className={styles["vUser-dash-pn"]}>
        <p>{phoneNumber}</p>
      </div>
      <div className={styles["vUser-dash-nacionality"]}>
        <p>{nacionality}</p>
      </div>
      <div className={styles["vUser-dash-pictures-answer-verify"]}>
        <div className={styles["vUser-dash-pp1"]}>
          <a className={styles["user-dash-link"]} href={pp1} target={"_blank"}>
            Face
          </a>
          <a className={styles["user-dash-link"]} href={pp2} target={"_blank"}>
            DNI-Front
          </a>
          <a className={styles["user-dash-link"]} href={pp3} target={"_blank"}>
            DNI-Back
          </a>
        </div>
        <div className={styles["dash-card-icons"]}>
          <div className={styles["dash-card-icon"]}>
            <CheckIcon onClick={(e) => handleVerify(e)} />
          </div>
          <div className={styles["dash-card-icon"]}>
            <CloseIcon onClick={(e) => handleReject(e)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VUserCard_dash;
