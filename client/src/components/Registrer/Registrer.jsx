import { useState } from "react";
import { useHistory } from "react-router-dom";
import * as helpers from "./RegisterHelpers";
import * as actions from "../../redux/actions";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./Registrer.css";
import { useDispatch } from "react-redux";

const Register = ({ setRegisterClass, setLoginClass }) => {
  const dispatch = useDispatch();

  const [signUp, setSignUpForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const handdleChange = (e) => {
    setSignUpForm({
      ...signUp,
      [e.target.name]: e.target.value,
    });
  };

  const handdleSubmit = async (e) => {
    e.preventDefault();
    const createdUser = await helpers.createUser(signUp);

    if (createdUser) {
      dispatch(actions.registerUser(createdUser));

      setLoginClass("login-container");
      setRegisterClass("disabled-container");

      setSignUpForm({
        username: "",
        email: "",
        password: "",
        password2: "",
      });
    }
  };

  
  
  //Esto para que es?
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className="register">
      <div className="register-container">
        <h1 className="register-title">Create an account</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group
            as={Col}
            className="register-form-input"
            controlId="validationCustom01"
          >
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Username"
              onChange={handdleChange}
              value={signUp.name}
              name="username"
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            as={Col}
            className="register-form-input"
            controlId="validationCustomUsername"
          >
            <Form.Label>Email address</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                name="email"
                className="form-control form-control-lg"
                type="email"
                placeholder="example@gmail.com"
                aria-describedby="inputGroupPrepend"
                value={signUp.email}
                onChange={handdleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please type an email
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group
            as={Col}
            className="register-form-input"
            controlId="validationCustom02"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              onChange={handdleChange}
              name="password"
              value={signUp.password}
            />
            <Form.Control.Feedback type="invalid">
              Please type a password
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            as={Col}
            className="register-form-input"
            controlId="validationCustom02"
          >
            <Form.Label>Repeat password</Form.Label>
            <Form.Control
              required
              type="password"
              onChange={handdleChange}
              name="password2"
              value={signUp.password2}
            />
            <Form.Control.Feedback type="invalid">
              Please repeat your password
            </Form.Control.Feedback>
          </Form.Group>

          <button
            className="register-button"
            onClick={handdleSubmit}
            type="button"
          >
            Register
          </button>
        </Form>
      </div>
      {/* <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please type a name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="Zip" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form> */}

      {/* <div class="generalContainer">
        <div class="container">
          <div class="d-flex justify-content-center w-100">
            <div class="card">
              <div class="card-header">
                <h3>Register</h3>
              </div>

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
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    value={signUp.email}
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
                    value={signUp.password}
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label text-light" for="EmailField">
                    Name
                  </label>

                  <input
                    onChange={handdleChange}
                    value={signUp.name}
                    name="name"
                    type="name"
                    id="NameField"
                    className="form-control form-control-lg"
                    placeholder="Enter a name"
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label text-light" for="EmailField">
                    Last Name
                  </label>
                  <input
                    onChange={handdleChange}
                    value={signUp.last_name}
                    name="last_name"
                    type="last_name"
                    id="LastNameField"
                    className="form-control form-control-lg"
                    placeholder="Enter a last name"
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label text-light" for="EmailField">
                    Age
                  </label>
                  <input
                    onChange={handdleChange}
                    value={signUp.age}
                    name="age"
                    id="AgeField"
                    type="number"
                    className="form-control form-control-lg"
                    placeholder="Enter your age"
                  />
                </div>

                <div
                  className={`login-errormessage ${error ? "" : "noneDisplay"}`}
                >
                  <p>{error}</p>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    onClick={handdleSubmit}
                    type="button"
                    className="btn btn-dark btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Register;
