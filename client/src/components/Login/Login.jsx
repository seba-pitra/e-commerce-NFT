import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css"


const Login = () => {

  const history = useHistory()

  const [logginForm, setLogginForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("")

  const [logged, setLogged] = useState(null)

  useEffect(()=>{
    // console.log(logged)
    isLogged()
  }, [])

  const handdleChange = (e) => {
    setLogginForm({
      ...logginForm,
      [e.target.name]: e.target.value,
    });
  };

  const isLogged = async () =>{
    const loggedUser = await fetch("http://localhost:3001/login/userInfo").then(res=>res.json())
    console.log("Estoy en logged",loggedUser)
    if(loggedUser){
      setLogged(loggedUser)
    }
  }

  const logginFunction = async (params) => {
    try {
      const loggedUser = await fetch("http://localhost:3001/login",{
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(params)
      }).then((res) => res.json());

      if(loggedUser){
        setError("")
        history.push("/home")
      }
      
    } catch (error) {
      setError("Could not login, data is invalid")
    }
  };

  const handdleSubmit = (e) => {
    e.preventDefault();
    logginFunction(logginForm)
    setLogginForm({
      email: "",
      password: "",
    })
    console.log(logginForm);
  };

  if(logged) return <p>You've been logged</p>
  else return (
    <form>
      <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
        {/* <p className="lead fw-normal mb-0 me-3 text-light">Sign in with</p>
        <button type="button" className="btn btn-dark btn-floating mx-1">
          <FacebookIcon />
        </button> */}

        {/* <button type="button" className="btn btn-dark btn-floating mx-1">
          <GitHubIcon />
        </button> */}

        {/* <button type="button" className="btn btn-dark btn-floating mx-1">
          <LinkedInIcon />
        </button> */}
      </div>

      {/* <div className="divider d-flex align-items-center my-4">
        <p className="text-center fw-bold mx-3 mb-0 text-light">
          Or if you have an Account:
        </p>
      </div> */}

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
        />
      </div>

      <div className={`login-errormessage ${error?"":"noneDisplay"}`}>
        <p>{error}</p>
      </div>

      {/* <div className="d-flex justify-content-between align-items-center">
        <div className="form-check mb-0">
          <input
            className="form-check-input me-2"
            type="checkbox"
            value=""
            id="RememberCheck"
          />
          <label
            className="form-check-label text-light"
            htmlFor="RememberCheck"
          >
            Remember me
          </label>
        </div>

        <a href="#!" className=" text-light">
          Forgot your password?
        </a>
      </div> */}

      <div className="text-center text-lg-start mt-4 pt-2">
        <button
          onClick={handdleSubmit}
          type="button"
          className="btn btn-dark btn-lg"
          style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
        >
          Login
        </button>

        {/* <Link to="/home">
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
        </Link> */}

        <p className="small fw-bold mt-2 pt-1 mb-0 text-light">
          Don't have an account?{" "}
          <a href="/registrer" className="link-danger">
            Register
          </a>
        </p>
      </div>
    </form>
  );
};

export default Login;
