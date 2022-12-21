import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase.js";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import "./Registrer.css";

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
        let user = {
          email: auth.currentUser.email,
          name: params.name,
          last_name: params.last_name,
          age: Number(params.age),
          available: true,
        };
        fetch("http://localhost:3001/user", {
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
        setError("User not found");
      }
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("User not found");
      }
      if (error.message === "Firebase: Error (auth/weak-password).") {
        setError("Wrong password");
      }
    }
  };

  const handdleChange = (e) => {
    setSignUpForm({
      ...signUp,
      [e.target.name]: e.target.value,
    });
  };

  const handdleSubmit = (e) => {
    e.preventDefault();
    createUser(signUp);
    setSignUpForm({
      email: "",
      password: "",
      name: "",
      last_name: "",
      age: "",
    });
  };

  return (
    <form>
      <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
        <div className="form-outline mb-4">
          <label className="form-label text-light" for="EmailField">
            Email address
          </label>
          <input
            onChange={handdleChange}
            name="email"
            type="email"
            id="EmailField"
            className="form-control form-control-lg"
            placeholder="Enter a valid email address"
            value={signUp.email}
          />
        </div>

        <div className="form-outline mb-3">
          <label className="form-label text-light" for="PassField">
            Password
          </label>
          <input
            onChange={handdleChange}
            name="password"
            type="password"
            id="PassField"
            className="form-control form-control-lg"
            placeholder="Enter password"
            value={signUp.password}
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label text-light" for="EmailField">
            Name
          </label>
          <input
            onChange={handdleChange}
            name="name"
            type="name"
            id="NameField"
            className="form-control form-control-lg"
            placeholder="Enter a name"
            value={signUp.name}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label text-light" for="EmailField">
            Last Name
          </label>
          <input
            onChange={handdleChange}
            name="last_name"
            type="last_name"
            id="LastNameField"
            className="form-control form-control-lg"
            placeholder="Enter a last name"
            value={signUp.last_name}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label text-light" for="EmailField">
            Age
          </label>
          <input
            onChange={handdleChange}
            name="age"
            type="number"
            id="AgeField"
            className="form-control form-control-lg"
            placeholder="Enter your age"
            value={signUp.age}
          />
        </div>

        <div className={`login-errormessage ${error ? "" : "noneDisplay"}`}>
          <p>{error}</p>
        </div>
        <div className="text-center text-lg-start mt-4 pt-2">
          <button
            onClick={handdleSubmit}
            type="button"
            className="btn btn-dark btn-lg"
            style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
          >
            Registrer
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
