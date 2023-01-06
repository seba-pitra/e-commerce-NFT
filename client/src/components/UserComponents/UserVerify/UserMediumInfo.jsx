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
  })

  useEffect(()=> {
    setUserData((prev) => ({ ...prev, userId: user.id, }));
    setErrors(validateUserData(errors, {...userData, ["face_picture"]: userData.face_picture}))
    render = true
  }, [userData.face_picture, render])

  return (
    <>
      <div className="inputContainer">
        <h6>Add an image of your face</h6>
        <div className="divs-add-face-pictures">
          <span>it must have good quality and light</span>
          <button>
            <CloudinaryImageInput2 setImage={setUserData} image_prop={"face_picture"}/>
          </button>
          <span className="margin-bottom">Your image</span>
          <span className={errors.face_picture === "False" ? "error-false" : "error-true"}>{errors.face_picture}</span>
          <img src={userData.face_picture || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"} alt="face picture" />
        </div>
      </div>

      <div className="buttons-next-prev">
        <button className="button-next" onClick={back} > Back </button>
        <button className={errors.face_picture !== "False" ? "disabled" : "button-next"} 
        onClick={next} disabled={errors.face_picture !== "False" } > Next </button>
      </div>
    </>
  );
}