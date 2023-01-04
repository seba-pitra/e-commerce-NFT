import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase.js";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import "./Registrer.css";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";


const Register = () => {
  const history = useHistory();

  const [signUp, setSignUpForm] = useState({
    email: "",
    password: "",
    name: "",
    last_name: "",
    age: "",
  });

  const [error, setError] = useState("");

  const createUser = async (params) => {
    try {
      const signUp = await createUserWithEmailAndPassword(
        auth,
        params.email,
        params.password
      );
      if (signUp) {
        console.log(auth.currentUser);
        let user = {
          id: auth.currentUser.uid,
          email: auth.currentUser.email,
          name: params.name,
          last_name: params.last_name,
          age: Number(params.age),
        };
        await fetch("http://localhost:3001/user/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
        sendEmailVerification(auth.currentUser);
        await signOut(auth);
        setError("");
        history.push("/");
      }
    } catch (error) {
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        setError("Invalid email");
      }
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("Email already in use");
      }
      if (error.message === "Firebase: Error (auth/weak-password).") {
        setError("Weak password");
      }
    }
  };

  const handdleChange = (e) => {
    setSignUpForm({
      ...signUp,
      [e.target.name]: e.target.value,
    });
  };

  const handdleSubmit = async (e) => {
    e.preventDefault();
    await createUser(signUp);

    history.push("/marketplace");

    setSignUpForm({
      email: "",
      password: "",
      name: "",
      last_name: "",
      age: "",
    });
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className="register">
      <div className="register-container">
        <h1 className="register-title">Create an account</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group
            as={Col}
            className="register-form-input"
            controlId="validationCustom01"
          >
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              onChange={handdleChange}
              value={signUp.name}
              name="name"
            />
            <Form.Control.Feedback type="invalid">
              Please type a name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            className="register-form-input"
            controlId="validationCustom02"
          >
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name example"
              onChange={handdleChange}
              value={signUp.last_name}
              name="last_name"
            />
            <Form.Control.Feedback type="invalid">
              Please type a last name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            className="register-form-input"
            controlId="validationCustomUsername"
          >
            <Form.Label>Email address</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                name="email"
                className="form-control form-control-lg"
                type="email"
                placeholder="example@gmail.com"
                aria-describedby="inputGroupPrepend"
                value={signUp.email}
                onChange={handdleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group
            as={Col}
            className="register-form-input"
            controlId="validationCustom03"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              onChange={handdleChange}
              name="password"
              value={signUp.password}
            />
            <Form.Control.Feedback type="invalid">
              Please type a password
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            className="register-form-input"
            controlId="validationCustom04"
          >
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Age"
              onChange={handdleChange}
              value={signUp.age}
              name="age"
            />
          </Form.Group>
          <button
            className="register-button"
            onClick={handdleSubmit}
            type="button"
          >
            Register
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
