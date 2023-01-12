import { useEffect } from "react";
import { useState } from "react";
import { validateUserData } from "../../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../../../redux/actions/index";
import CloudinaryImageInput2 from "../../../Create/CloudinaryImageInput/CloudinaryImageInput2";

import darkStyles from "./stylesheets/DarkUserAdvancedInfo.module.css";
import lightStyles from "./stylesheets/LightUserAdvancedInfo.module.css";
import useStyles from "../../../../customHooks/useStyles";
import { useLoggedUser } from "../../../../customHooks/useLoggedUser";

export default function UserAdvancedInfo({ userData, setUserData, back }) {
  const history=useHistory()
  const styles = useStyles(darkStyles, lightStyles);
  const dispatch = useDispatch();
  const [loggedUser, updateLoggedUser, handleLogOut] = useLoggedUser();
  const user = loggedUser;
  const img =
    "https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png";
  let render = false;

  const [errors, setErrors] = useState({
    dni_image_front: "",
    dni_image_back: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let userDataObj = { ...userData };
    dispatch(actions.askForVerification(userDataObj));
    history.goBack()
  };

  useEffect(() => {
    setUserData((prev) => ({ ...prev, userId: user.id }));
    setErrors(
      validateUserData(errors, {
        ...userData,
        ["dni_image_front"]: userData.dni_image_front,
      })
    );
    render = true;
  }, [userData.dni_image_front, render]);

  useEffect(() => {
    setUserData((prev) => ({ ...prev, userId: user.id }));
    setErrors(
      validateUserData(errors, {
        ...userData,
        ["dni_image_back"]: userData.dni_image_back,
      })
    );
    render = true;
  }, [userData.dni_image_back, render]);

  //   className={styles[]}

  return (
    <>
      <div className={styles["user-advanced-info-container"]}>
        <div className={styles["user-advanced-info-front"]}>
          <h3>DNI front</h3>
          <div className={styles["divs-add-face-pictures"]}>
            <span>It must have good quality and light</span>
            <CloudinaryImageInput2
              setImage={setUserData}
              image_prop={"dni_image_front"}
            />
            <span className={styles["margin-bottom"]}>DNI FRONT IMAGE</span>
            <span
              className={
                errors.dni_image_front === "False"
                  ? styles["error-false"]
                  : styles["error-true"]
              }
            >
              {errors.dni_image_front}
            </span>
            <img
              className={styles["img-dni"]}
              src={userData.dni_image_front || img}
              alt="face_picture"
            />
          </div>
        </div>
        <div className={styles["user-advanced-info-back"]}>
          <h3>DNI back</h3>
          <div className={styles["divs-add-face-pictures"]}>
            <span>it must have good quality and light</span>
            <CloudinaryImageInput2
              setImage={setUserData}
              image_prop={"dni_image_back"}
            />
            <span className={styles["margin-bottom"]}>DNI BACK IMAGE</span>
            <span
              className={
                errors.dni_image_back === "False"
                  ? styles["error-false"]
                  : styles["error-true"]
              }
            >
              {errors.dni_image_back}
            </span>
            <img src={userData.dni_image_back || img} alt="face picture" />
          </div>
        </div>
      </div>
      <div className={styles["buttons-next-prev-container-advanced"]}>
        <button className={styles["disabled"]} onClick={back}>
          Back
        </button>
        <button
          type="submit"
          className={
            errors.dni_image_front !== "False" ||
            errors.dni_image_back !== "False"
              ? styles["disabled"]
              : styles["button-next"]
          }
          value={"Ask for verify"}
          onClick={handleSubmit}
          disabled={
            errors.dni_image_front !== "False" ||
            errors.dni_image_back !== "False" || user.type==="Verified" || user.type==="Admin"
          }
        >
          Ask for verify
        </button>
        {/* <input
          type="submit"
          className="button-next"
          value={"Ask for verify"}
          onClick={(e) => handleSubmit(e)}
          disabled={
            errors.dni_image_front !== "False" ||
            errors.dni_image_back !== "False"
          }
        /> */}
      </div>
    </>
  );
}
