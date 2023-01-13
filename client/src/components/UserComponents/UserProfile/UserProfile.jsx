import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import PurchaseHistory from "../../PurchaseHistory/PurchaseHistory";
import EditUserInfo from "../EditUserInfo/EditUserInfo";
import { NavLink } from "react-router-dom";

import darkStyles from "./stylesheets/DarkUserProfile.module.css";
import lightStyles from "./stylesheets/LightUserProfile.module.css";
import useStyles from "../../../customHooks/useStyles";

import { logInUser } from "../../../redux/actions";

export default function UserProfile() {
  const styles = useStyles(darkStyles, lightStyles);
  let [edit, setEdit] = useState(false);
  const shouldUpdate = useSelector(state => state.shouldUpdate)
  let handleEdit = () => {
    setEdit(!edit);
  };
  let handleRefresh = () => {
    dispatch(logInUser(userDetail.id));
  };
  let navHistory = useHistory();

  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.loggedUser);
  useEffect(()=>{
    dispatch(logInUser(userDetail.id))
  },[shouldUpdate])
  // const { userDetail } = useSelector((state) => state);

  // FALTA TRAER EL COMPONENTE PurchaseHistory y pasarle por params las relaciones con buy para q muestre el historial

  // NO HACE FALTA LO DE EDITAR TYPE porque este es el componente de user normal,no puede cambair de normal a admin

  //   const [edit, setEdit] = useState(false);
  //   const [type, setType] = useState("");
  //   const [update, setUpdate] = useState(false);
  //   const handleteEdit = (e) => {
  //     e.preventDefault();
  //     setEdit(!edit);
  //   };

  //   const handleTypeChange = (e) => {
  //     setType(e.target.value);
  //   };

  //   const handleUpdate = (e) => {
  //     e.preventDefault();
  //     let body = {
  //       type: type,
  //     };
  //     dispatch(actions.updateUser(id, body)).then((data) => {
  //       setUpdate(!update);
  //       setEdit(!edit);
  //     });
  //   };
  console.log(userDetail);
  

  return (
    <div className={styles["user-profile-container"]}>
      <div className={styles["profile-container"]}>
        <div className={styles["avatar-nickname-container"]}>
          <img
            className={styles["profile-pic"]}
            src={userDetail.profile_pic}
            alt="avatar"
            referrerPolicy="no-referrer"
          />
          <p className="text-muted mb-1">{userDetail.username}</p>
          <img
            hidden={
              userDetail.type === "Verified" || userDetail.type === "Admin"
                ? false
                : true
            }
            className={styles["edit-info"]}
            src={
              "https://cdn4.iconfinder.com/data/icons/multimedia-24/512/Edit-512.png"
            }
            alt="edit-info"
            referrerPolicy="no-referrer"
            onClick={() => {
              handleEdit();
            }}
          />
          <img
            hidden={
              userDetail.type === "Verified" || userDetail.type === "Admin"
                ? false
                : true
            }
            className={styles["refresh-info"]}
            src={"https://www.svgrepo.com/show/172157/refresh.svg"}
            alt="refresh-info"
            referrerPolicy="no-referrer"
            onClick={() => {
              handleRefresh();
            }}
          />
        </div>
        {edit ? (
          <EditUserInfo
            name={userDetail.name}
            last_name={userDetail.last_name}
            age={userDetail.age}
            id={userDetail.id}
            address={userDetail.address}
            username={userDetail.username}
            setEdit = {setEdit}
          />
        ) : (
          <div className={styles["user-info"]}>
            <div className={styles["info"]}>
              <h6>Email</h6>
              <h6 className="text-muted">{userDetail.email}</h6>
            </div>
            <div className={styles["info"]}>
              <h6>Type</h6>
              <h6 className="text-muted">{userDetail.type}</h6>
            </div>
            {(userDetail.type === "Verified" ||
              userDetail.type === "Admin") && (
              <div>
                <div className={styles["info"]}>
                  <h6>Full Name</h6>
                  <h6 className="text-muted">
                    {userDetail.name} {userDetail.last_name}
                  </h6>
                </div>

                <div className={styles["info"]}>
                  <h6>Phone</h6>
                  <h6 className="text-muted">
                    {userDetail.phone_number ? userDetail.phone_number : "No phone founded"}
                  </h6>
                </div>
                <div className={styles["info"]}>
                  <h6>Age</h6>
                  <h6 className="text-muted">
                    {userDetail.age ? userDetail.age : "No age founded"}
                  </h6>
                </div>
                <div className={styles["info"]}>
                  <h6>Address</h6>
                  <h6 className="text-muted">
                    {userDetail.address
                      ? userDetail.address
                      : "No adress founded"}
                  </h6>
                </div>
                <div className={styles["info"]}>
                  <h6>Identification</h6>
                  <h6 className="text-muted">
                    {userDetail.dni
                      ? userDetail.dni
                      : "No identification founded"}
                  </h6>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className={styles["functionalities-history-container"]}>
        {userDetail.type === "Basic" ? (
          <div className={styles["available-functionalities"]}>
            <h6 className={styles["user-profile-not-permition"]}>
              In order to create and sell NFTs you must verify your identity
            </h6>
            <NavLink
              className={styles["upgrade-button"]}
              to="/myAccount/verify"
            >
              Verify identity
            </NavLink>
          </div>
        ) : (
          <div className={styles["available-functionalities"]}>
            <h4>Thanks for verifying your identity</h4>
            <h6>Verified users can buy, sell and create NFTs</h6>
          </div>
        )}
  
        <div className={styles["history-purchases"]}>
          <PurchaseHistory
            purchases={userDetail.purchases}
            sales={userDetail.sales}
          />
        </div>
      </div>
    </div>
  );
}
