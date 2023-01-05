import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../../redux/actions/index";
import CloudinaryImageInput2 from "../../Create/CloudinaryImageInput/CloudinaryImageInput2";

export default function UserAdvancedInfo({ userData, setUserData, next, back }) {
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
        <h6>DNI INFO</h6>
        <div className="divs-separet">
          <div className="div-create-collection">
            <span>DNI FRONT</span>
            <CloudinaryImageInput2 setImage={setUserData} image_prop={"dni_image_front"}/>
          </div>

          <div className="div-create-collection">
            <span>DNI BACK</span>
            <CloudinaryImageInput2 setImage={setUserData} image_prop={"dni_image_back"}/>
          </div>
        </div>
      </div>

      <div className="buttons-next-prev">
        <button className="button-next" onClick={back} > Back </button>
      </div>
    </>
  );
}