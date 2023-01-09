import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateUserData } from "../../../utils";
import "./UserVerify.css";

export default function UserBasicInfo({ userData, setUserData, next }) {
  const user = useSelector((state) => state.loggedUser);

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
    <div className="user-basic-info-verify-container">
      <div className="user-basic-info-verify-details-container">
        <h1>Add your personal data</h1>
        <div className="user-basic-verify-inputs-container">
          <div className="div-user-basic">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={(e) => inputChange(e)}
            />
            <span
              className={errors.name === "False" ? "error-false" : "error-true"}
            >
              {errors.name}
            </span>
          </div>

          <div className="div-user-basic">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={userData.last_name}
              onChange={(e) => inputChange(e)}
            />
            <span
              className={
                errors.last_name === "False" ? "error-false" : "error-true"
              }
            >
              {errors.last_name}
            </span>
          </div>

          <div className="div-user-basic">
            <label>Age</label>
            <input
              type="text"
              name="age"
              value={userData.age}
              onChange={(e) => inputChange(e)}
            />
            <span
              className={errors.age === "False" ? "error-false" : "error-true"}
            >
              {errors.age}
            </span>
          </div>

          <div className="div-user-basic">
            <label>DNI</label>
            <input
              type="text"
              name="dni"
              value={userData.dni}
              onChange={(e) => inputChange(e)}
            />
            <span
              className={errors.dni === "False" ? "error-false" : "error-true"}
            >
              {errors.dni}
            </span>
          </div>

          <div className="div-user-basic">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={userData.phone_number}
              onChange={(e) => inputChange(e)}
            />
            <span
              className={
                errors.phone_number === "False" ? "error-false" : "error-true"
              }
            >
              {errors.phone_number}
            </span>
          </div>

          <div className="div-user-basic">
            <label>Nationality</label>
            <input
              type="text"
              name="nationality"
              value={userData.nationality}
              onChange={(e) => inputChange(e)}
            />
            <span
              className={
                errors.nationality === "False" ? "error-false" : "error-true"
              }
            >
              {errors.nationality}
            </span>
          </div>

          <div className="div-user-basic">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={(e) => inputChange(e)}
            />
            <span
              className={
                errors.address === "False" ? "error-false" : "error-true"
              }
            >
              {errors.address}
            </span>
          </div>

          <div className="div-user-basic">
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

      <div className="buttons-next-prev">
        <button
          className={
            errors.name !== "False" ||
            errors.last_name !== "False" ||
            errors.age !== "False" ||
            errors.dni !== "False" ||
            errors.phone_number !== "False" ||
            errors.nationality !== "False" ||
            errors.address !== "False"
              ? "disabled"
              : "button-next"
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
          {" "}
          Next{" "}
        </button>
      </div>
    </div>
  );
}
