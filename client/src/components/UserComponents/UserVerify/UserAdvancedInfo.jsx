import { useEffect } from "react";
import { useState } from "react";
import { validateUserData } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../../redux/actions/index";
import CloudinaryImageInput2 from "../../Create/CloudinaryImageInput/CloudinaryImageInput2";

export default function UserAdvancedInfo({ userData, setUserData, back }) {
  const user = useSelector((state) => state.loggedUser);
  let render = false;

  const [errors, setErrors] = useState({
    dni_image_front: "",
    dni_image_back: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let userDataObj = { ...userData };
    console.log(userDataObj);
    // dispatch(actions.createNft(userDataObj));
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

  return (
    <>
      <div className="user-advanced-info-container">
        <div className="user-advanced-info-front">
          <h3>DNI front</h3>
          <div className="divs-add-face-pictures">
            <span>It must have good quality and light</span>
            <CloudinaryImageInput2
              setImage={setUserData}
              image_prop={"dni_image_front"}
            />
            <span className="margin-bottom">DNI FRONT IMAGE</span>
            <span
              className={
                errors.dni_image_front === "False"
                  ? "error-false"
                  : "error-true"
              }
            >
              {errors.dni_image_front}
            </span>
            <img
              src={
                userData.dni_image_front ||
                "https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png"
              }
              alt="face picture"
            />
          </div>
        </div>
        <div className=".user-advanced-info-back">
          <h3>DNI back</h3>
          <div className="divs-add-face-pictures">
            <span>it must have good quality and light</span>
            <CloudinaryImageInput2
              setImage={setUserData}
              image_prop={"dni_image_back"}
            />
            <span className="margin-bottom">DNI BACK IMAGE</span>
            <span
              className={
                errors.dni_image_back === "False" ? "error-false" : "error-true"
              }
            >
              {errors.dni_image_back}
            </span>
            <img
              src={
                userData.dni_image_back ||
                "https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png"
              }
              alt="face picture"
            />
          </div>
        </div>
      </div>
      <div className="buttons-next-prev-container">
        <button className="button-next" onClick={back}>
          Back
        </button>
        <button
          type="submit"
          className="button-next"
          value={"Ask for verify"}
          onClick={(e) => handleSubmit(e)}
          disabled={
            errors.dni_image_front !== "False" ||
            errors.dni_image_back !== "False"
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
