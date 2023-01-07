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
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              onChange={handdleChange}
              name="password"
              value={signUp.password}
              autoComplete="off"
            />
            <Form.Control.Feedback type="invalid">
              Please type a password
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            as={Col}
            className="register-form-input"
          >
            <Form.Label>Repeat password</Form.Label>
            <Form.Control
              required
              type="password"
              onChange={handdleChange}
              name="password2"
              value={signUp.password2}
              autoComplete="off"
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
    </div>
  );
};

export default Register;
