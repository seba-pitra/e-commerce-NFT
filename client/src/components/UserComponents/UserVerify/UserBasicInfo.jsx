import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../../redux/actions/index";
import CloudinaryImageInput from "../../Create/CloudinaryImageInput/CloudinaryImageInput";

export default function UserBasicInfo({ userData, setUserData, next }) {
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
        <h6>Basic information about you</h6>
        <div className="divs-separet">

          <div className="div-create-collection">
            <label>Name</label>
            <input type="text" name="name" value={userData.name} onChange={(e) => inputName(e)} />
          </div>

          <div className="div-create-collection">
            <label>Last Name</label>
            <input type="text" name="last_name" value={userData.last_name} onChange={(e) => inputName(e)} />
          </div>

          <div className="div-create-collection">
            <label>Age</label>
            <input type="text" name="age" value={userData.age} onChange={(e) => inputName(e)} />
          </div>

          <div className="div-create-collection">
            <label>DNI</label>
            <input type="text" name="dni" value={userData.dni} onChange={(e) => inputName(e)} />
          </div>

          <div className="div-create-collection">
            <label>Phone Number</label>
            <input type="text" name="phone_number" value={userData.phone_number} onChange={(e) => inputName(e)} />
          </div>

          <div className="div-create-collection">
            <label>Nationality</label>
            <input type="text" name="nationality" value={userData.nationality} onChange={(e) => inputName(e)} />
          </div>

          <div className="div-create-collection">
            <label>Address</label>
            <input type="text" name="address" value={userData.address} onChange={(e) => inputName(e)} />
          </div>

          <div className="div-create-collection">
            <label>Metamask wallet</label>
            <input type="text" name="metamask_wallet" value={userData.metamask_wallet} onChange={(e) => inputName(e)} />
          </div>

        </div>
      </div>

      <div className="buttons-next-prev">
          <button className={userData.name === " " ? "button-next" : "disabled"} 
          onClick={next} disabled={userData.name === " " } > Next </button>
      </div>
    </>
  );
}


{/* <div className="cloudinary-collections-create">
                  <span>Add Collection Image</span>
                      <CloudinaryImageInput
                          setImage={setCreatedCollection}
                      />
                  </div> */}