import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import * as helpers from "./LoginHelpers";
import * as actions from "../../redux/actions";
import * as utils from "../../utils";
import styles from "./stylesheets/Login.module.css";
import { useLoggedUser } from "../../customHooks/useLoggedUser";


const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loggedUser, updateLoggedUser, handleLogOut] = useLoggedUser();
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
      utils.loadCartLocalStorage(dispatch, user.email);
      utils.loadFavsLocalStorage(dispatch, user.email);
      history.push("/home");

      let SavedTheme = JSON.parse(
        localStorage.getItem(JSON.stringify(user.email + "theme"))
      );
      if (SavedTheme) {
        dispatch(actions.injectLocalStorageTheme(SavedTheme));
      }

      localStorage.setItem("User", JSON.stringify(user.email));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await helpers.logginFunction(logginForm);

    if (user && user.uid) {
      setLogginForm({
        email: "",
        password: "",
      });
      dispatch(actions.logInUser(user.uid));
      history.push("/home");
      utils.loadCartLocalStorage(dispatch, user.email);
      utils.loadFavsLocalStorage(dispatch, user.email);
      let SavedTheme = JSON.parse(
        localStorage.getItem(JSON.stringify(user.email + "theme"))
      );
      if (SavedTheme) {
        dispatch(actions.injectLocalStorageTheme(SavedTheme));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          onClick={handleSubmit}
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
