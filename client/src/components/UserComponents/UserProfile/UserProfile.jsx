import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import PurchaseHistory from "../../PurchaseHistory/PurchaseHistory";
import EditUserInfo from "../EditUserInfo/EditUserInfo";
// import EditUserInfo from "./../EditUserInfo";
import { NavLink } from "react-router-dom";

// import "./UserProfile.css";
import styles from "./stylesheets/UserProfile.module.css";

export default function UserProfile() {
  let [edit, setEdit] = useState({
    state: false,
  });

  let handleEdit = () => {
    setEdit(() => ({ state: true }));
  };
  let navHistory = useHistory();

  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.loggedUser);

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
  useEffect(() => {}, [dispatch]);

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
              "https://iconsplace.com/wp-content/uploads/_icons/ffc0cb/256/png/edit-icon-12-256.png"
            }
            alt="edit-info"
            referrerPolicy="no-referrer"
            onClick={() => {
              handleEdit();
            }}
          />
        </div>
        {edit.state ? (
          <EditUserInfo
            name={userDetail.name}
            last_name={userDetail.last_name}
            email={userDetail.email}
            age={userDetail.age}
            phone_number={userDetail.phone_number}
            id={userDetail.id}
            dni={userDetail.dni}
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
                    {userDetail.phone ? userDetail.phone : "No phone founded"}
                  </h6>
                </div>
                <div className={styles["info"]}>
                  <h6>Age</h6>
                  <h6 className="text-muted">
                    {userDetail.age ? userDetail.age : "No age founded"}
                  </h6>
                </div>
                <div className={styles["info"]}>
                  <h6>Adress</h6>
                  <h6 className="text-muted">
                    {userDetail.adress
                      ? userDetail.adress
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
            <h6>2 NFT's bought</h6>
            <h6 className={styles["user-profile-not-permition"]}>
              You dont have permitions to create an NFT ,you need to upgrade
              your account
            </h6>
            <NavLink
              className={styles["upgrade-button"]}
              to="/myAccount/verify"
            >
              Upgrade to Premium
              {/* <div className="upgrade-button">Upgrade to Premium</div> */}
            </NavLink>
          </div>
        ) : (
          <div className={styles["available-functionalities"]}>
            <h5>You are Premium User !</h5>
            <h6>You can :</h6>
            <h6>Buy NFTs</h6>
            <h6>Sell NFTs</h6>
            <h6>Create NFTs</h6>
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
