import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Registrer.css";

const Register = () => {
  const history = useHistory();

  const [signUp, setSignUpForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const createUser = async (params) => {
    try {
      const userCreate = await fetch("http://localhost:3001/login/sign", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(params),
      }).then((res) => res.json());

      if (userCreate) {
        setError("")
        fetch("http://localhost:3001/login/logOut").then((res) => res.json());
        history.push("/");
      }
    } catch (error) {
      setError("Could not create user");
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
    });
    console.log(signUp);
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
