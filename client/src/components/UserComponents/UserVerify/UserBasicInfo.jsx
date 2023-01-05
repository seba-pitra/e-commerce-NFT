import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateUserData } from "../../../utils";
import "./UserVerify.css";

export default function UserBasicInfo({ userData, setUserData, next }) {
  const user = useSelector((state) => state.loggedUser);

  // ERRORS HANDLERS
  const [errors, setErrors] = useState({
    name: "",
    last_name: "",
    age: "",
    dni: "",
    phone_number: "",
    nationality: "",
    address: "",
    metamask_wallet: "",
  })
  
  function inputChange (e) {
    e.preventDefault();
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(validateUserData(errors, {...userData, [e.target.name]: e.target.value}))
  }

  let cont = 0
  useEffect(()=> {
    cont++;
    console.log(userData)
    console.log(cont);
  }, [errors])
  
  return (
    <>
      <div className="inputContainer">
        <h6>Basic information about you</h6>
        <div className="divs-separet">

          <div className="div-user-basic">
            <label>Name</label>
            <input type="text" name="name" value={userData.name} onChange={(e) => inputChange(e)} />
            <span className={errors.name === "False" ? "error-false" : "error-true"}>{errors.name}</span>
          </div>

          <div className="div-user-basic">
            <label>Last Name</label>
            <input type="text" name="last_name" value={userData.last_name} onChange={(e) => inputChange(e)} />
            <span className={errors.last_name === "False" ? "error-false" : "error-true"}>{errors.last_name}</span>
          </div>

          <div className="div-user-basic">
            <label>Age</label>
            <input type="text" name="age" value={userData.age} onChange={(e) => inputChange(e)} />
          </div>

          <div className="div-user-basic">
            <label>DNI</label>
            <input type="text" name="dni" value={userData.dni} onChange={(e) => inputChange(e)} />
          </div>

          <div className="div-user-basic">
            <label>Phone Number</label>
            <input type="text" name="phone_number" value={userData.phone_number} onChange={(e) => inputChange(e)} />
          </div>

          <div className="div-user-basic">
            <label>Nationality</label>
            <input type="text" name="nationality" value={userData.nationality} onChange={(e) => inputChange(e)} />
          </div>

          <div className="div-user-basic">
            <label>Address</label>
            <input type="text" name="address" value={userData.address} onChange={(e) => inputChange(e)} />
          </div>

          <div className="div-user-basic">
            <label>Metamask wallet</label>
            <input type="text" name="metamask_wallet" value={userData.metamask_wallet} onChange={(e) => inputChange(e)} />
          </div>

        </div>
      </div>

      <div className="buttons-next-prev">
          <button className={userData.name === "" ? "disabled" : "button-next"} 
          onClick={next} disabled={userData.name === "" } > Next </button>
      </div>
    </>
  );
}