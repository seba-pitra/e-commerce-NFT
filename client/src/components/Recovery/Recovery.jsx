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
    <div className="generalContainer">
      <div className="card2">
        <div className="card-header">
          <h3>Password Recovery</h3>
        </div>
        <form>
          <div className="form-outline mb-4">
            <label className="form-label text-light" htmlFor="email">
              Email address
            </label>

            <input
              onChange={handdleChange}
              name="email"
              type="email"
              className="form-control form-control-lg"
              placeholder="your_email@gmail.com"
              value={recuperation.email}
            />
          </div>

          <div className={`login-errormessage ${error ? "" : "noneDisplay"}`}>
            <p>{error}</p>
          </div>
          <div className="text-center text-lg-start ">
            <button
              onClick={handdleSubmit}
              type="button"
              className="button-back"
            >
              Send Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Recovery;
