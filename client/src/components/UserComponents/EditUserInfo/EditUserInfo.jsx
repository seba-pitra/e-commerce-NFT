// import * as actions from "../../../redux/actions";
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/actions";
import { validate, validateUserData } from "../../../utils";
// import styles from "./stylesheets/EditUserInfo.module.css";
import darkStyles from "./stylesheets/DarkEditUserInfo.module.css";
import lightStyles from "./stylesheets/LightEditUserInfo.module.css";
import useStyles from "../../../customHooks/useStyles";


export default function EditUserINfo(props) {
  const styles = useStyles(darkStyles, lightStyles);

  let [input, setInput] = useState({
    name: props.name,
    last_name: props.last_name,
    age: props.age,
    id: props.id,
    address: props.address,
    username: props.username,
    // profile_pic : props.profile_pic
    
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
  console.log(input);
  let handleSubmit = (e) => {
    //al apretar enviar tendria q hacer el dispatch con los cambios,y volver a cargar el componente,pero el lo
    e.preventDefault();

    let obj = { ...input };
    if (
      obj.name === props.name &&
      obj.last_name === props.last_name &&
      obj.age === props.age &&
      obj.address === props.address &&
      obj.username === props.username 
      // && obj.profile_pic === props.profile_pic
    ) {
      //si esto se da significa que no hubo ningun cambio .entonces no deberia hacer el dispatch
      console.log("There was no change in your data.");
      console.log(obj);

      return;
    } else {
      console.log("there was a change");
      dispatch(updateUser(obj));
      props.setEdit(false);
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
        <label className={styles["edit-label"]}>Address</label>
        <input
          name="address"
          type="text"
          onChange={(e) => handleChange(e)}
          value={input.address}
          placeholder={input.address}
        />
        <p
          className={
            errors.address === "False"
             
              ? styles["success-msg"]
             
              : styles["error-msg"]
          }
        >
          {errors.address === "False" ? "Age is correct " : errors.address}
        </p>
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
        <label>Username</label>
        
        <input
          name="username"
          type="text"
          onChange={(e) => handleChange(e)}
          value={input.username}
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
      {/* <CloudinaryImageInput2 setImage={setInput} image_prop= {'profile_pic'}/> */}
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
          errors.last_name !== "False" ? true : false
        }
      >
        Edit
      </button>
      
    </form>
  );
}
