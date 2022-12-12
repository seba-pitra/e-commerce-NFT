import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import img from "../../images/city-landing.jpg";

function LandingPage() {
  return (
    <div className={styles["landing"]}>
      <div className={styles["landing-container"]}>
        <div className={styles["landing-info-container"]}>
          <div className={styles["landing-text-container"]}>
            <h1 className={styles["landing-title"]}>NOT FUNGIBLE TOWN</h1>
            <h1 className={styles["landing-subtitle"]}>
              Explore the NFT world
            </h1>
            <h6>
              <span></span>
              <div className={styles.message}>
                <div className={styles.word1}>Create</div>
                <div className={styles.word2}>Buy</div>
                <div className={styles.word3}>Sell</div>
              </div>
            </h6>
          </div>
          <Link to={"/home"} className={styles["link-home"]}>
            Let's Go
          </Link>
        </div>

        <img
          // src="https://www.realestatemarket.com.mx/images/2022/05-mayo/1305/se-suman-fondos-de-inversion-proptech-latam-2022-g.jpg"
          src={img}
          className={styles["landing-img"]}
          alt="Enter the Town"
        />
      </div>
      {/* <div className="vh-50">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3 text-light">
                    Sign in with
                  </p>
                  <button
                    type="button"
                    className="btn btn-dark btn-floating mx-1"
                  >
                    <FacebookIcon />
                  </button>

                  <button
                    type="button"
                    className="btn btn-dark btn-floating mx-1"
                  >
                    <GitHubIcon />
                  </button>

                  <button
                    type="button"
                    className="btn btn-dark btn-floating mx-1"
                  >
                    <LinkedInIcon />
                  </button>
                </div>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-light">
                    Or if you have an Account:
                  </p>
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label text-light" for="EmailField">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="EmailField"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                  />
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label text-light" for="PassField">
                    Password
                  </label>
                  <input
                    type="password"
                    id="PassField"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="RememberCheck"
                    />
                    <label
                      className="form-check-label text-light"
                      for="RememberCheck"
                    >
                      Remember me
                    </label>
                  </div>

                  <a href="#!" className=" text-light">
                    Forgot your password?
                  </a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-dark btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Login
                  </button>

                  <Link to="/home">
                    <button
                      type="button"
                      className="btn btn-dark btn-lg"
                      style={{
                        paddingLeft: "2.5rem",
                        paddingRight: "2.5rem",
                        marginLeft: "50px",
                      }}
                    >
                      DEMO
                    </button>
                  </Link>

                  <p className="small fw-bold mt-2 pt-1 mb-0 text-light">
                    Don't have an account?{" "}
                    <a href="#!" className="link-danger">
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default LandingPage;
