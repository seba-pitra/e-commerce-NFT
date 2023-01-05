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
    dni_image_back: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    let userDataObj = { ...userData };
    console.log(userDataObj);
    // dispatch(actions.createNft(userDataObj));
  };
  
  useEffect(()=> {
    setUserData((prev) => ({ ...prev, userId: user.id, }));
    setErrors(validateUserData(errors, {...userData, ["dni_image_front"]: userData.dni_image_front}))
    render = true
  }, [userData.dni_image_front, render])

  useEffect(()=> {
    setUserData((prev) => ({ ...prev, userId: user.id, }));
    setErrors(validateUserData(errors, {...userData, ["dni_image_back"]: userData.dni_image_back}))
    render = true
  }, [userData.dni_image_back, render])

  return (
    <>
      <div className="separate-in-two">
        <div className="inputContainer">
          <h6>Add an iname the front of your DNI</h6>
          <div className="divs-add-face-pictures">
            <span>it must have good quality and light</span>
            <button>
              <CloudinaryImageInput2 setImage={setUserData} image_prop={"dni_image_front"}/>
            </button>
            <span className="margin-bottom">DNI FRONT IMAGE</span>
            <span className={errors.dni_image_front === "False" ? "error-false" : "error-true"}>{errors.dni_image_front}</span>
            <img src={userData.dni_image_front || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"} alt="face picture" />
          </div>
        </div>

        <div className="inputContainer">
          <h6>Add an image of the back of your DNI</h6>
          <div className="divs-add-face-pictures">
            <span>it must have good quality and light</span>
            <button>
              <CloudinaryImageInput2 setImage={setUserData} image_prop={"dni_image_back"}/>
            </button>
            <span className="margin-bottom">DNI BACK IMAGE</span>
            <span className={errors.dni_image_back === "False" ? "error-false" : "error-true"}>{errors.dni_image_back}</span>
            <img src={userData.dni_image_back || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"} alt="face picture" />
          </div>
        </div>
      </div>
      <div className="buttons-next-prev">
        <button className="button-next" onClick={back} > Back </button>
      </div>

      <div className="ilustration-validations">
        <input className={errors.dni_image_front !== "False" || errors.dni_image_back !== "False" ? "errorSubmit" : "submit"} 
        type="submit" value={"Ask for verify"} onClick={(e) => handleSubmit(e)} 
        disabled={(errors.dni_image_front !== "False" || errors.dni_image_back !== "False")}/>
      </div>
    </>
  );
}