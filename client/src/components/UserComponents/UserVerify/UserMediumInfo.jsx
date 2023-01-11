import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateUserData } from "../../../utils";
import { useHistory } from "react-router-dom";
import * as actions from "../../../redux/actions/index";
import CloudinaryImageInput2 from "../../Create/CloudinaryImageInput/CloudinaryImageInput2";
import styles from "./stylesheets/UserVerify.module.css";

export default function UserMediumInfo({ userData, setUserData, next, back }) {
  const user = useSelector((state) => state.loggedUser);
  const img =
    "https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png";
  const dispatch = useDispatch();
  let render = false;

  const [errors, setErrors] = useState({
    face_picture: "",
  });

  useEffect(() => {
    setUserData((prev) => ({ ...prev, userId: user.id }));
    setErrors(
      validateUserData(errors, {
        ...userData,
        ["face_picture"]: userData.face_picture,
      })
    );
    render = true;
  }, [userData.face_picture, render]);

  return (
    <div className={styles["user-medium-info-verify-container"]}>
      <h1>Add an image of your face</h1>
      <div className={styles["divs-add-face-pictures"]}>
        <h6>it must have good quality and light</h6>
        <CloudinaryImageInput2
          setImage={setUserData}
          image_prop={"face_picture"}
        />
        <span
          className={
            errors.face_picture === "False"
              ? styles["error-false"]
              : styles["error-true"]
          }
        >
          {errors.face_picture}
        </span>
        <img
          className={styles["img-dni"]}
          src={userData.face_picture || img}
          alt="face_picture"
        />
      </div>
      <div className={styles["buttons-next-prev-container"]}>
        <button className={styles["disabled"]} onClick={back}>
          Back
        </button>
        <button
          className={
            errors.face_picture !== "False"
              ? styles["disabled"]
              : styles["button-next"]
          }
          onClick={next}
          disabled={errors.face_picture !== "False"}
        >
          Next
        </button>
      </div>
    </div>
  );
}
