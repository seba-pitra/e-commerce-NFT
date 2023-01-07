import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import * as helpers from "./LoginHelpers";
import * as actions from "../../redux/actions";
import { loadLocalStorage } from "../../utils";
import "./Login.css";
import { toast } from "react-toastify";

// sendPasswordResetEmail
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoadingUser = useSelector(state => state.isLoadingUser);

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
      history.push("/marketplace");
    }

    loadLocalStorage(dispatch);
  };

  const handdleSubmit = async (e) => {
    e.preventDefault();

    loadLocalStorage(dispatch);

    const userId = await helpers.logginFunction(logginForm);
    if (userId) {
      dispatch(actions.logInUser(userId));
      history.push("/home");
      setLogginForm({
        email: "",
        password: "",
      });
    }
  };

  return (
    <form>
      <div className="form-outline mb-4">
        <label className="form-label text-light" for="EmailField">
          Email address
        </label>
        <input
          onChange={handdleChange}
          name="email"
          type="email"
          id="EmailField"
          className="form-control form-control-lg col-md-2"
          placeholder="example@gmail.com"
          value={logginForm.email}
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
          value={logginForm.password}
        />
      </div>

      {/* 
      <div className={`login-errormessage ${error ? "" : "noneDisplay"}`}>
        <p>{error}</p>
      </div> */}

      <div className="text-center text-lg-start mt-4 pt-2">
        <button
          onClick={handdleSubmit}
          type="button"
          className={"sing-in"}
          style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
        >
          Log in
        </button>
        <button className={"sing-in"} type="button" onClick={handleLogInGoogle}>
          <div className={"sing-in-container"}>
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
