import * as actions from "../../../redux/actions";
import React, { useState } from "react";
import { useEffect, useRef } from "react";

import "./UserProfile/UserProfile.css";

export default function EditUserINfo(props) {
  // props : name,last_name,email,age,type,phone,mobile

  let [input, setInput] = React.useState({
    name: props.name,
    last_name: props.last_name,
    email : props.name,
    age : props.age,
    phone : props.phone,
    mobile: props.mobile,
  });

  useEffect(() => {
    
  }, []);

  let handleChange = (e) => {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // setErrors(Validate({ ...input, [e.target.name]: e.target.value }));
  };

  return (
    <form className="user-info">
      <div className="info">
        <label>First Name</label>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          value={input.name}
        />
      </div>
      <div className="info">
        <label>Last Name</label>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          value={input.last_name}
        />
      </div>
      <div className="info">
        <label>Email</label>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          value={input.email}
        />
      </div>
      <div className="info">
        <label>Age</label>
        <input
          type="number"
          onChange={(e) => handleChange(e)}
          value={input.age}
        />
      </div>

      <div className="info">
        <label>Phone Number</label>
        <input
          type="number"
          onChange={(e) => handleChange(e)}
          value={input.phone}
        />
      </div>
      <div className="info">
        <label>Mobile Number</label>
        <input
          type="number"
          onChange={(e) => handleChange(e)}
          value={input.mobile}
        />
        <input type={"submit"} />
      </div>
    </form>
  );
}
