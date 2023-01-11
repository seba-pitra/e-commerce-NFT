import React from "react";
import { Link, useHistory } from "react-router-dom";
import { freeShoppingCartState } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
// import "./UserIcon.css";
import { toast } from "react-toastify";
import * as actions from "../../../redux/actions";
import useStyles from "../../../customHooks/useStyles";
import darkStyles from "./stylesheets/DarkUserIcon.module.css";
import lightStyles from "./stylesheets/LightUserIcon.module.css";
import { useLoggedUser } from "../../../customHooks/useLoggedUser"

// Components
import LogoutIcon from "@material-ui/icons/ExitToApp";

const UserIcon = ({ setVisible, visible }) => {
  const history = useHistory();
  const styles = useStyles(darkStyles, lightStyles);
  const [loggedUser, updateLoggedUser, handleLogOut] = useLoggedUser()
  const dispatch = useDispatch();

  const logOutFunction = async () => {
    try {
      await signOut(auth);
      dispatch(actions.logOutUser());
      history.push("/");
    } catch (error) {
      toast.error("Something was wrong. Try again later", {
        position: "bottom-left",
      });
    }
  };
  const handdleCick = (e) => {
    handleLogOut();
    dispatch(freeShoppingCartState());
    logOutFunction();
    setVisible(e);
  };

  // className={styles[]}

  return (
    <ul className={visible ? styles["user-icon-list"] : styles["noneDisplay"]}>
      <li onClick={setVisible}>
        <Link className={styles["user-icon-list-link"]} to="/myAccount">
          My Account
        </Link>
      </li>
      <li>
        <Link className={styles["user-icon-list-link"]} to="/mycollections">
          My Collections
        </Link>
      </li>

      <li
        onClick={(e) => setVisible(e)}
        className={` ${loggedUser.type === "Admin" ? "" : "noneDisplay"}`}
      >
        <Link
          className={styles[`user-icon-list-link`]}
          to="/admin/adminDashboard"
        >
          Admin DashBoard
        </Link>
      </li>

      <li onClick={(e) => handdleCick(e)}>
        <div className={styles["user-list-noLink"]}>
          Logout
          <div className={styles["logOut-icon"]}>
            <LogoutIcon />
          </div>
        </div>
      </li>
    </ul>
  );
};

export default UserIcon;
