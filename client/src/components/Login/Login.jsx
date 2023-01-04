import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  gettingActiveUserToState,
  injectLocalStorageCart,
  getAllUsers,
  signInWithGoogle,
} from "../../redux/actions";
import { useHistory } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, loginGoogle } from "../../firebase.js";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";

// sendPasswordResetEmail
const Login = () => {
  const users = useSelector((state) => state.users);
  // const loggedUser = useSelector((state) => state.loggedUser);
  // let loginStatusStorage = localStorage.getItem("Logged");

  const dispatch = useDispatch();

  const history = useHistory();

  const [logginForm, setLogginForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handdleChange = (e) => {
    setLogginForm({
      ...logginForm,
      [e.target.name]: e.target.value,
    });
  };

  const signGoogle = async () => {
    await loginGoogle();
    // dispatch(gettingActiveUserToState(auth.currentUser.email)); //no hace nada
    loadLocalStorage(auth.currentUser.email);
    let fullName = auth.currentUser.displayName;
    let user = {
      id: auth.currentUser.uid,
      email: auth.currentUser.email,
      name: fullName.split(" ")[0],
      last_name: fullName.split(" ")[1],
      profile_pic: auth.currentUser.photoURL,
    };
    await axios.post("user/google/signin", user);
    const userDb = await axios.get(`user/${user.id}`);

    if (userDb) {
      history.push("/marketplace");
    }
    // await dispatch(signInWithGoogle(user));

    // setTimeout(() => {
    //   history.push("/marketplace");
    // }, 7000);
  };

  const logginFunction = async (params) => {
    try {
      const loggedUserX2 = await signInWithEmailAndPassword(
        auth,
        params.email,
        params.password
      );

      if (!users.filter((user) => user.id === loggedUserX2.user.uid).length) {
        await signOut(auth);
        throw new Error("Firebase: Error (auth/user-not-found).");
      }

      if (auth.currentUser.emailVerified && loggedUserX2) {
        // dispatch(gettingActiveUserToState(auth.currentUser.email));
        // loadLocalStorage(auth.currentUser.email);

        // fetch("http://localhost:3001/payment/userEmail", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(auth.currentUser),
        // });

        await axios.post("/payment/userEmail", auth.currentUser);

        setTimeout(() => {
          setError("");
          history.push("/marketplace");
        }, 1000);
      } else {
        setError("Email not verified");
        await signOut(auth);
      }
    } catch (error) {
      if (error.message === "Firebase: Error (auth/user-not-found).") {
        setError("User not found");
      }
      if (error.message === "Firebase: Error (auth/wrong-password).") {
        setError("Wrong password");
      }
    }
  };

  function loadLocalStorage(email) {
    let localCart = JSON.parse(localStorage.getItem(email));
    if (localCart) {
      dispatch(injectLocalStorageCart(localCart));
    }
  }

  const handdleSubmit = (e) => {
    e.preventDefault();
    dispatch(gettingActiveUserToState(logginForm.email));
    loadLocalStorage(logginForm.email);
    logginFunction(logginForm);
    setLogginForm({
      email: "",
      password: "",
    });
  };

  // if (loginStatusStorage === "Estoy loggeado") {
  //   return (
  //     <div className="login-loggedmessage">
  //       <Link to={"/marketplace"}>Home</Link>
  //       <p>You've been logged</p>
  //     </div>
  //   );
  // } else
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

      <div className={`login-errormessage ${error ? "" : "noneDisplay"}`}>
        <p>{error}</p>
      </div>

      <div className="text-center text-lg-start mt-4 pt-2">
        <button
          onClick={handdleSubmit}
          type="button"
          className={"sing-in"}
          style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
          disabled={!users.length}
        >
          Log in
        </button>
        <button className={"sing-in"} type="button" onClick={signGoogle}>
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
