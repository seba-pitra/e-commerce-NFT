import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase.js";
import { sendPasswordResetEmail } from "firebase/auth";
import "./Recovery.css";

// sendPasswordResetEmail
const Recovery = () => {
  const history = useHistory();

  const [recuperation, setRecuperation] = useState({
    email: "",
  });

  const [error, setError] = useState("");

  const handdleChange = (e) => {
    setRecuperation({
      ...recuperation,
      [e.target.name]: e.target.value,
    });
  };

  const recovery = async (params) => {
    try {
      const sendRecovery = await sendPasswordResetEmail(auth, params.email);
      history.push("/");
      return sendRecovery;
    } catch (error) {
      if (error.message === "Firebase: Error (auth/missing-email).") {
        setError("Enter a valid email address");
      }
      if (error.message === "Firebase: Error (auth/user-not-found).") {
        setError("Email not found");
      }
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        setError("Enter a valid email addres");
      }
    }
  };

  const handdleSubmit = (e) => {
    e.preventDefault();
    recovery(recuperation);
    setRecuperation({
      email: "",
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
            value={recuperation.email}
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
            Send Email
          </button>
        </div>
      </div>
    </form>
  );
};

export default Recovery;
