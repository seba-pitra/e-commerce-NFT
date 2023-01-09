import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import * as helpers from "./LoginHelpers";
import * as actions from "../../redux/actions";
import { loadLocalStorage } from "../../utils";
import styles from "./stylesheets/Login.module.css";

// sendPasswordResetEmail
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [logginForm, setLogginForm] = useState({
    email: "",
    password: "",
  });

  const handdleChange = (e) => {
    setLogginForm({
      ...logginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogInGoogle = async () => {
    const user = await helpers.signGoogle();
    if (user) {
      dispatch(actions.signInWithGoogle(user));
    }
    loadLocalStorage(dispatch);
  };

  const handdleSubmit = async (e) => {
    e.preventDefault();
    loadLocalStorage(dispatch);
    const userId = await helpers.logginFunction(logginForm);
    if (userId) {
      setLogginForm({
        email: "",
        password: "",
      });
      dispatch(actions.logInUser(userId));
    }
  };

  return (
    <form onSubmit={handdleSubmit}>
      <div className="form-outline mb-4">
        <label className="form-label text-light" htmlFor="email">
          Email address
        </label>
        <input
          onChange={handdleChange}
          name="email"
          type="email"
          className="form-control form-control-lg col-md-2"
          placeholder="example@gmail.com"
          value={logginForm.email}
        />
      </div>

      <div className="form-outline mb-3">
        <label className="form-label text-light" htmlFor="PassField">
          Password
        </label>
        <input
          onChange={handdleChange}
          name="password"
          type="password"
          id="PassField"
          className="form-control form-control-lg"
          placeholder="Enter password"
          value={logginForm.password}
          autoComplete="off"
        />
      </div>

      <div className="text-center text-lg-start mt-4 pt-2">
        <button
          onClick={handdleSubmit}
          type="button"
          className={styles["sing-in"]}
          style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
        >
          Log in
        </button>
        <button
          className={styles["sing-in"]}
          type="button"
          onClick={handleLogInGoogle}
        >
          <div className={styles["sing-in-contaienr"]}>
            <GoogleIcon />
            <span> </span>
            <span>Sign in with Google</span>
          </div>
        </button>
      </div>
    </form>
  );
};

export default Login;
