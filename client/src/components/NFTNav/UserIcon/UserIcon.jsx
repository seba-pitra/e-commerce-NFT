import React from "react";
import { Link, useHistory } from "react-router-dom";
import { freeShoppingCartState } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import "./UserIcon.css";
import { toast } from "react-toastify";

// Components
import LogoutIcon from "@material-ui/icons/ExitToApp";

const UserIcon = ({ setVisible, visible }) => {
  const { userNfts, cartItemsCount, activeUserIs, loggedUser } = useSelector(
    (state) => state
  );

  const dispatch = useDispatch();

  const history = useHistory();

  const logOutFunction = async () => {
    try {
      await signOut(auth);
      history.push("/");
    } catch (error) {
      toast.error("Something was wrong. try again later");
    }
  };
  const handdleCick = (e) => {
    dispatch(freeShoppingCartState());
    logOutFunction();
    setVisible(e);
  };

  return (
    <ul className={`user-icon-list ${visible ? "" : "noneDisplay"}`}>
      <li onClick={setVisible}>
        <Link className="user-icon-list-link" to="/myAccount">
          My Acount{" "}
        </Link>
      </li>

      <li
        onClick={(e) => setVisible(e)}
        className={` ${loggedUser.type === "Admin" ? "" : "noneDisplay"}`}
      >
        <Link className={`user-icon-list-link`} to="/admin/adminDashboard">
          Admin DashBoard
        </Link>
      </li>

      <li onClick={(e) => handdleCick(e)}>
        <div className="user-list-noLink">
          Logout
          <div className="logOut-icon">
            <LogoutIcon />
          </div>
        </div>
      </li>
    </ul>
  );
};

export default UserIcon;
