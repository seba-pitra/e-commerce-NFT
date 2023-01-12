import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateUserData } from "../../../../utils";

import darkStyles from "./stylesheets/DarkUserBasicInfo.module.css";
import lightStyles from "./stylesheets/LightUserBasicInfo.module.css";
import useStyles from "../../../../customHooks/useStyles";
import { useLoggedUser } from "../../../../customHooks/useLoggedUser"

export default function UserBasicInfo({ userData, setUserData, next }) {
  const styles = useStyles(darkStyles, lightStyles);
  const [loggedUser, updateLoggedUser, handleLogOut] = useLoggedUser()
  const user = loggedUser

  // ERRORS HANDLERS
  const [errors, setErrors] = useState({
    name: "",
    last_name: "",
    age: "",
    dni: "",
    phone_number: "",
    nationality: "",
    address: "",
    metamask_wallet: "",
  });

  function inputChange(e) {
    e.preventDefault();
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(
      validateUserData(errors, { ...userData, [e.target.name]: e.target.value })
    );
  }

  return (
    <div className={styles["user-basic-info-verify-container"]}>
      <div className={styles["user-basic-info-verify-details-container"]}>
        <h1>Add your personal data</h1>
        <div className={styles["user-basic-verify-inputs-container"]}>
          <div>
            <div className={styles["div-user-basic"]}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={(e) => inputChange(e)}
              />
              <span
                className={
                  errors.name === "False"
                    ? styles["error-false"]
                    : styles["error-true"]
                }
              >
                {errors.name}
              </span>
            </div>
            <div className={styles["div-user-basic"]}>
              <label>Last Name</label>
              <input
                type="text"
                name="last_name"
                value={userData.last_name}
                onChange={(e) => inputChange(e)}
              />
              <span
                className={
                  errors.last_name === "False"
                    ? styles["error-false"]
                    : styles["error-true"]
                }
              >
                {errors.last_name}
              </span>
            </div>
            <div className={styles["div-user-basic"]}>
              <label>Age</label>
              <input
                type="text"
                name="age"
                value={userData.age}
                onChange={(e) => inputChange(e)}
              />
              <span
                className={
                  errors.age === "False"
                    ? styles["error-false"]
                    : styles["error-true"]
                }
              >
                {errors.age}
              </span>
            </div>
            <div className={styles["div-user-basic"]}>
              <label>DNI</label>
              <input
                type="text"
                name="dni"
                value={userData.dni}
                onChange={(e) => inputChange(e)}
              />
              <span
                className={
                  errors.dni === "False"
                    ? styles["error-false"]
                    : styles["error-true"]
                }
              >
                {errors.dni}
              </span>
            </div>
          </div>

          <div className={styles["second-user-basic-info-container"]}>
            <div className={styles["div-user-basic"]}>
              <label>Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={userData.phone_number}
                onChange={(e) => inputChange(e)}
              />
              <span
                className={
                  errors.phone_number === "False"
                    ? styles["error-false"]
                    : styles["error-true"]
                }
              >
                {errors.phone_number}
              </span>
            </div>

            <div className={styles["div-user-basic"]}>
              <label>Nationality</label>
              <input
                type="text"
                name="nationality"
                value={userData.nationality}
                onChange={(e) => inputChange(e)}
              />
              <span
                className={
                  errors.nationality === "False"
                    ? styles["error-false"]
                    : styles["error-true"]
                }
              >
                {errors.nationality}
              </span>
            </div>

            <div className={styles["div-user-basic"]}>
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={(e) => inputChange(e)}
              />
              <span
                className={
                  errors.address === "False"
                    ? styles["error-false"]
                    : styles["error-true"]
                }
              >
                {errors.address}
              </span>
            </div>

            <div className={styles["div-user-basic"]}>
              <label>Metamask wallet</label>
              <input
                type="text"
                name="metamask_wallet"
                value={userData.metamask_wallet}
                onChange={(e) => inputChange(e)}
              />
            </div>
          </div>
        </div>
        <div className={styles["buttons-next-container"]}>
          <button
            className={
              errors.name !== "False" ||
              errors.last_name !== "False" ||
              errors.age !== "False" ||
              errors.dni !== "False" ||
              errors.phone_number !== "False" ||
              errors.nationality !== "False" ||
              errors.address !== "False"
                ? styles["disabled"]
                : styles["button-next"]
            }
            onClick={next}
            disabled={
              errors.name !== "False" ||
              errors.last_name !== "False" ||
              errors.age !== "False" ||
              errors.dni !== "False" ||
              errors.phone_number !== "False" ||
              errors.nationality !== "False" ||
              errors.address !== "False"
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
