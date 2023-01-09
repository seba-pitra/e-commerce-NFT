// import * as actions from "../../../redux/actions";
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/actions";
import {validate, validateUserData} from '../../utils/index'
import "./UserProfile/UserProfile.css";

export default function EditUserINfo(props) {
  // props : name,last_name,email,age,type,phone,mobile,id

  let [input, setInput] = React.useState({
    name: props.name,
    last_name : props.last_name,
    email: props.email,
    age: props.age,
    phone_number: props.phone_number,
    dni: props.dni,
    id: props.id
  });
  let [errors, setErrors] = React.useState({
    
  });
  const dispatch = useDispatch();

  useEffect(() => {
    
    
    

  }, []);

  let handleChange = (e) => {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(input);
    let err ={};
     validateUserData(err,{...input,
     [e.target.name]: e.target.value,});
    setErrors(err)
    console.log(errors)
    
  };
  console.log(props);

  let handleSubmit = (e) => {
    //al apretar enviar tendria q hacer el dispatch con los cambios,y volver a cargar el componente,pero el lo
    e.preventDefault();
    
    let obj = { ...input };
    console.log(obj);
    console.log(input);
    if (
      obj.name === props.name &&
      obj.last_name === props.last_name &&
      obj.age === props.age) {
      //si esto se da significa que no hubo ningun cambio .entonces no deberia hacer el dispatch
      console.log("There was no change in your data.");
      return;
    } else {
      console.log('there was a change');
      dispatch(updateUser(obj))
    }
  };

  return (
    <form className="edit-form">
      {console.log(errors)}
       <div className="edit-input">
        <label className="edit-label"
        >First Name  *
        <p className={errors.name === 'False' ? 'greenMsg' : 'redMsg'}>
        {errors.name === 'False' ? 'Name is correct ' : errors.name}</p></label>
        <input
          name="name"
          type="text"
          onChange={(e) => handleChange(e)}
          value={input.name}
          
        />
      </div>
      <div className="edit-input">
        <label className="edit-label">Last Name  *
        <p className={errors.last_name === 'False' ? 'greenMsg' : 'redMsg'}>
        {errors.last_name=== 'False' ? 'Last Name is correct ' : errors.last_name}</p>
          </label>
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
          placeholder = 'brunoosuna8@gmail.com'
          disabled = {true}
        />
      </div>
      <div className="edit-input">
        <label className="edit-label">Age   *
        <p className={errors.age === 'False' ? 'greenMsg' : 'redMsg'}>
        {errors.age=== 'False' ? 'Age is correct ' : errors.age}</p>
        </label>
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
          disabled = {true}
        />
      </div> 
      
      <input 
      id="submit"
      className={errors.name !== 'False' || errors.age !== 'False' || errors.last_name !== 'False' ? 'disabled-submit' : 'submit'}
      type={"submit"} 
      onClick={(e) => handleSubmit(e)}
      disabled={errors.name !== 'False' || errors.age !== 'False' || errors.last_name  !== 'False'  ? true : false} />
      

     
      
    </form>
  );
}


