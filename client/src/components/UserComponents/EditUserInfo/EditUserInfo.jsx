// import * as actions from "../../../redux/actions";
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/actions";
import { validate, validateUserData } from "../../../utils";
// import "./UserProfile/UserProfile.css";
import styles from "./EditUserInfo.module.css";

export default function EditUserINfo(props) {
  // props : name,last_name,email,age,type,phone,mobile,id

  let [input, setInput] = useState({
    name: props.name,
    last_name: props.last_name,
    email: props.email,
    age: props.age,
    phone_number: props.phone_number,
    dni: props.dni,
    id: props.id,
  });
  let [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  let handleChange = (e) => {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(input);
    let err = {};
    validateUserData(err, { ...input, [e.target.name]: e.target.value });
    setErrors(err);
    console.log(errors);
  };
  console.log(props);

  let handleSubmit = (e) => {
    //al apretar enviar tendria q hacer el dispatch con los cambios,y volver a cargar el componente,pero el lo
    e.preventDefault();

    let obj = { ...input };
    if (
      obj.name === props.name &&
      obj.last_name === props.last_name &&
      obj.age === props.age
    ) {
      //si esto se da significa que no hubo ningun cambio .entonces no deberia hacer el dispatch
      console.log("There was no change in your data.");
      return;
    } else {
      console.log("there was a change");
      dispatch(updateUser(obj));
    }
  };

  return (
    <form className={styles["edit-form"]}>
      <div className={styles["edit-input"]}>
        <label className={styles["edit-label"]}>First Name *</label>
        <input
          name="name"
          type="text"
          onChange={(e) => handleChange(e)}
          value={input.name}
        />
        <p
          className={
            errors.name === "False"
              ? styles["success-msg"]
              : styles["error-msg"]
          }
        >
          {errors.name === "False" ? "Name is correct " : errors.name}
        </p>
      </div>
      <div className={styles["edit-input"]}>
        <label className={styles["edit-label"]}>Last Name *</label>
        <input
          name="last_name"
          type="text"
          onChange={(e) => handleChange(e)}
          value={input.last_name}
        />
        <p
          className={
            errors.last_name === "False"
              ? styles["success-msg"]
              : styles["error-msg"]
          }
        >
          {errors.last_name === "False"
            ? "Last Name is correct "
            : errors.last_name}
        </p>
      </div>
      <div className={styles["edit-input"]}>
        <label>Email</label>
        <input
          name="email"
          type="text"
          onChange={(e) => handleChange(e)}
          value={input.email}
          placeholder={input.email}
          disabled={true}
        />
      </div>
      <div className={styles["edit-input"]}>
        <label className={styles["edit-label"]}>Age *</label>
        <input
          name="age"
          type="number"
          onChange={(e) => handleChange(e)}
          value={input.age}
        />
        <p
          className={
            errors.age === "False" ? styles["success-msg"] : styles["error-msg"]
          }
        >
          {errors.age === "False" ? "Age is correct " : errors.age}
        </p>
      </div>

      <div className={styles["edit-input"]}>
        <label>Phone Number</label>
        <input
          name="phone"
          type="number"
          onChange={(e) => handleChange(e)}
          value={input.phone}
          disabled={true}
        />
      </div>

      {/* <input
        id="submit"
        className={
          errors.name !== "False" ||
          errors.age !== "False" ||
          errors.last_name !== "False"
            ? "disabled-submit"
            : "submit"
        }
        type={"submit"}
        onClick={(e) => handleSubmit(e)}
        disabled={
          errors.name !== "False" ||
          errors.age !== "False" ||
          errors.last_name !== "False"
            ? true
            : false
        }
      /> */}
      <button
        type="submit"
        id="submit"
        className={
          errors.name !== "False" ||
          errors.age !== "False" ||
          errors.last_name !== "False"
            ? styles["disabled-submit"]
            : styles["submit-button"]
        }
        onClick={(e) => handleSubmit(e)}
        disabled={
          errors.name !== "False" ||
          errors.age !== "False" ||
          errors.last_name !== "False"
            ? true
            : false
        }
      >
        Edit
      </button>
    </form>
  );
}
