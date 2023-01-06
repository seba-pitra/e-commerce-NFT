import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions/index";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import "./UserVerify.css";
import UserBasicInfo from "./UserBasicInfo";
import UserMediumInfo from "./UserMediumInfo"; 
import UserAdvancedInfo from "./UserAdvancedInfo"; 


export default function UserVerify() {
  const user = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const loginStatusStorage = localStorage.getItem("Logged");
  const [step, setStep] = useState(1);

  const [userData, setUserData] = useState({
    // step 1
    name: "",
    last_name: "",
    age: "",
    dni: "",
    phone_number: "",
    nationality: "",
    address: "",
    metamask_wallet: "",

    // step 2
    face_picture: "",
    
    // step 3
    dni_image_front: "",
    dni_image_back: "",
  });

  // console.log(userData)

  // -- STEPS --
  const next = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };
  const back = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  // SUBMIT USER
  const handleSubmit = (e) => {
    e.preventDefault();
    let userDataObj = {
      ...userData,
      userId: user.id,
    };
    console.log(userDataObj);
    // dispatch(actions.createNft(userDataObj));
  };

  // const validateUser = async () => {
  //   if (loginStatusStorage === "Estoy loggeado") {
  //     dispatch(actions.getAllNfts());
  //     dispatch(actions.getAllCollections());
  //     dispatch(actions.getEthPrice());
  //   } else {
  //     history.push("/");
  //   }
  // };
    
    // useEffect(() => {
    //   setCreatedNft((prev) => ({
    //     ...prev,
    //     userId: user.id,
    //   }));
    //   validateUser();
    // }, [user]);
    

  return (
    <>
      <div className="mainContainer">
        <fieldset className={`info-fieldset ${ step !== 1 ? "noneDisplay" : "first-field-collections" }`} >
          <UserBasicInfo userData={userData} setUserData={setUserData} next={next}/>
        </fieldset>

        <fieldset className={`info-fieldset ${step !== 2 ? "noneDisplay" : ""}`}>
          <UserMediumInfo userData={userData} setUserData={setUserData} back={back} next={next}/>
        </fieldset>

        <fieldset className={`info-fieldset ${ step !== 3 ? "noneDisplay" : "first-field-collections"}`}>
          <UserAdvancedInfo userData={userData} setUserData={setUserData} back={back} next={next}/>
        </fieldset>
      </div>
    </>
  );
}
