import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../../redux/actions/index";
import CloudinaryImageInput2 from "../../Create/CloudinaryImageInput/CloudinaryImageInput2";

export default function UserMediumInfo({ userData, setUserData, next, back }) {
  const user = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  let render = false;

  const inputName = (e) => {
    e.preventDefault();
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(userData)
  };

  useEffect(()=> {
    setUserData((prev) => ({ ...prev, userId: user.id, }));
    render = false
  }, [user, render])

  return (
    <>
      <div className="inputContainer">
        <h6>Face reveal</h6>
        <div className="divs-separet">
          <div className="div-create-collection">
            <span>Add Face</span>
            <CloudinaryImageInput2 setImage={setUserData} image_prop={"face_picture"}/>
          </div>
        </div>
      </div>

      <div className="buttons-next-prev">
        <button className="button-next" onClick={back} > Back </button>
        <button className={userData.name === "" ? "disabled" : "button-next"} 
        onClick={next} disabled={userData.name === "" } > Next </button>
      </div>
    </>
  );
}