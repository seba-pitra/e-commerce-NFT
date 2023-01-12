
import React from "react";
import styles from "./LandingPage.module.css";
import img from "../../images/city-landing.jpg";
import Login from "../Login/Login";
import { useState } from "react";
import Register from "../Registrer/Registrer";
import Recovery from "../Recovery/Recovery";
import { useLoggedUser } from "../../customHooks/useLoggedUser";

function LandingPage() {
  //The changes of classname is executing in the "onClick" event of buttons
  const [customClass, setCustomClass] = useState("landing-container");
  const [loginClass, setLoginClass] = useState("disabled-container");
  const [registerClass, setRegisterClass] = useState("disabled-container");
  const [recoveryClass, setRecoveryClass] = useState("disabled-container");
  
  return (
    <div className={styles["landing"]}>
      <div className={styles[customClass]}>
        <div className={styles["landing-info-container"]}>
          <div className={styles["landing-text-container"]}>
            <h1 className={styles["landing-title"]}>NON FUNGIBLE TOWN</h1>
            <h1 className={styles["landing-subtitle"]}>
              Explore the NFT world
            </h1>
            <h6 className={styles["title-presentation-words"]}>
              <span className={styles["title-presentation-span"]}></span>
              <div className={styles.message}>
                <div className={styles.word1}>Create</div>
                <div className={styles.word2}>Buy</div>
                <div className={styles.word3}>Sell</div>
              </div>
            </h6>
          </div>
          <button
            onClick={() => {
              setCustomClass("disabled-container");
              setLoginClass("login-container");
            }}
            className={styles["link-home"]}
          >
            Lets go
          </button>
        </div>

        <img src={img} className={styles["landing-img"]} alt="Enter the Town" />
      </div>
      <div className={styles[loginClass]}>
        <div>
          <Login loginClass={loginClass} />
        </div>
        <div className="d-flex justify-content-evenly ">
          <span
            onClick={() => {
              setLoginClass("disabled-container");
              setRegisterClass("register-container");
            }}
            className={styles["to-account-section"]}
          >
            Create an account
          </span>
          <span
            onClick={() => {
              setLoginClass("disabled-container");
              setRecoveryClass("recovery-container");
            }}
            className={styles["to-account-section"]}
          >
            Reset password
          </span>
        </div>
      </div>
      <div className={styles[registerClass]}>
        <Register
          setLoginClass={setLoginClass}
          setRegisterClass={setRegisterClass}
        />
        <button
          onClick={() => {
            setLoginClass("login-container");
            setRegisterClass("disabled-container");
          }}
          className={styles["back-to-login-button"]}
        >
          Back to login
        </button>
      </div>
      <div className={styles[recoveryClass]}>
        <Recovery />
        <button
          onClick={() => {
            setLoginClass("login-container");
            setRecoveryClass("disabled-container");
          }}
          className={styles["back-to-login-button"]}
        >
          Back to login
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
