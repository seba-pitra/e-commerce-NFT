// import * as actions from "../../../redux/actions";
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import "./UserProfile/UserProfile.css";

export default function EditUserINfo(props) {
  // props : name,last_name,email,age,type,phone,mobile

  let [input, setInput] = React.useState({
    name: props.name,
    last_name: props.last_name,
    email: props.email,
    age: props.age,
    phone: props.phone,
    mobile: props.mobile,
  });

  useEffect(() => {}, []);

  let handleChange = (e) => {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // setErrors(Validate({ ...input, [e.target.name]: e.target.value }));
  };
  let handleSubmit = (e) => {
    //al apretar enviar tendria q hacer el dispatch con los cambios,y volver a cargar el componente,pero el lo
  };

  return (
    <form className="edit-form">
      <div className="edit-input">
        <label>First Name</label>
        <input
          name="name"
          type="text"
          onChange={(e) => handleChange(e)}
          value={input.name}
        />
      </div>
      <div className="edit-input">
        <label>Last Name</label>
        <input
          name="last_name"
          type="text"
          onChange={(e) => handleChange(e)}
          value={input.last_name}
        />
      </div>
      <div className="edit-input">
        <label>Email</label>
        <input
          name="email"
          type="text"
          onChange={(e) => handleChange(e)}
          value={input.email}
        />
      </div>
      <div className="edit-input">
        <label>Age</label>
        <input
          name="age"
          type="number"
          onChange={(e) => handleChange(e)}
          value={input.age}
        />
      </div>

      <div className="edit-input">
        <label>Phone Number</label>
        <input
          name="phone"
          type="number"
          onChange={(e) => handleChange(e)}
          value={input.phone}
        />
      </div>
      <div className="edit-input">
        <label>Mobile Number</label>
        <input
          name="mobile"
          type="number"
          onChange={(e) => handleChange(e)}
          value={input.mobile}
        />
      </div>
      <input id="submit" type={"submit"} onClick={(e) => handleSubmit(e)} />
    </form>
  );
}
