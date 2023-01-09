import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateUserData } from "../../../utils";
import { useHistory } from "react-router-dom";
import * as actions from "../../../redux/actions/index";
import CloudinaryImageInput2 from "../../Create/CloudinaryImageInput/CloudinaryImageInput2";
import "./UserVerify.css";

export default function UserMediumInfo({ userData, setUserData, next, back }) {
  const user = useSelector((state) => state.loggedUser);
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
    <>
      {/* <div className="inputContainer"> */}
      <div className="user-medium-info-verify-container">
        <h1>Add an image of your face</h1>
        <div className="divs-add-face-pictures">
          <h5>it must have good quality and light</h5>
          <CloudinaryImageInput2
            setImage={setUserData}
            image_prop={"face_picture"}
          />
          <h1
            className={
              errors.face_picture === "False" ? "error-false" : "error-true"
            }
          >
            {errors.face_picture}
          </h1>
          <img
            src={
              userData.face_picture ||
              "https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png"
            }
            alt="face picture"
          />
        </div>
      </div>

      <div className="buttons-next-prev-container">
        <button className="button-next" onClick={back}>
          {" "}
          Back{" "}
        </button>
        <button
          className={
            errors.face_picture !== "False" ? "disabled" : "button-next"
          }
          onClick={next}
          disabled={errors.face_picture !== "False"}
        >
          {" "}
          Next{" "}
        </button>
      </div>
    </>
  );
}
