import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import * as helpers from "./LoginHelpers";
import * as actions from "../../redux/actions";
import * as utils  from "../../utils";
import styles from "./stylesheets/Login.module.css";
import { useLoggedUser } from "../../customHooks/useLoggedUser";

// sendPasswordResetEmail

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

 /**
 * Handles the login process using Google Sign-In.
 */
  const handleLogInGoogle = async () => {
    // Attempt to sign the user in using Google Sign-In
    const user = await helpers.signGoogle();
    // If the user was successfully signed in
    if (user) {
      // Dispatch the signInWithGoogle action
      dispatch(actions.signInWithGoogle(user));
      // Load the user's cart and favorites from local storage
      utils.loadCartLocalStorage(dispatch, user.email);
      utils.loadFavsLocalStorage(dispatch, user.email);
      history.push("/home")
      // Theme LocalStorage Loader for logInGoogle only
      let SavedTheme = JSON.parse(localStorage.getItem(JSON.stringify(user.email+'theme')));  
      if (SavedTheme) { dispatch(actions.injectLocalStorageTheme(SavedTheme))}; 
//      localStorage.setItem("User",JSON.stringify(user));   // Originalmente solo estaba con user  
	localStorage.setItem("User",JSON.stringify(user.email));   // asi solo enviamos el correo al LS 
    }
  };
  /**
   * Handles the login process using the login form
   */
  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
  
    // Attempt to log the user in using the logginFunction helper
    const user = await helpers.logginFunction(logginForm);
  
    // If the user was successfully logged in
    if (user && user.uid) {
      // Reset the form fields
      setLogginForm({
        email: "",
        password: "",
      });
      // // Dispatch the logInUser action to get the user data to global state.
      dispatch(actions.logInUser(user.uid));
      // Load the user's cart and favorites from local storage
      history.push("/home")
      utils.loadCartLocalStorage(dispatch, user.email);
      utils.loadFavsLocalStorage(dispatch, user.email);
      let SavedTheme = JSON.parse(localStorage.getItem(JSON.stringify(user.email+'theme')));  
      if (SavedTheme) { dispatch(actions.injectLocalStorageTheme(SavedTheme))};
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
