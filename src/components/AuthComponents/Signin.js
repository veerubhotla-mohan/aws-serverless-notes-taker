import React, { useState, useEffect } from "react";
import validator from "validator";
import { Auth } from "aws-amplify";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    async function checkAnyUser() {
      try {
        const loggedInUser = await Auth.currentAuthenticatedUser();
        navigate("/myapp");
      } catch (error) {}
    }
    checkAnyUser();
  });
  const [errorInInput, setErrorInInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const emailInputChangeHandler = (event) => {
    setErrorInInput("");
    setEmailInput(event.target.value);
  };
  const passwordInputChangeHandler = (event) => {
    setErrorInInput("");
    setPasswordInput(event.target.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!validator.isEmail(emailInput)) {
      setErrorInInput("Bad credentials");
      return;
    }
    if (
      !validator.isStrongPassword(passwordInput, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorInInput("Bad credentials");
      return;
    }
    try {
      await Auth.signIn(emailInput, passwordInput);
      setErrorInInput("");
      navigate("/myapp");
    } catch (error) {
      setErrorInInput("Bad credentials");
    }
  };

  return (
    <div className="container mt-3">
      <h2>Signin form</h2>
      <div className="row">
        <form onSubmit={formSubmitHandler}>
          <div className="form-group">
            <label className="col-sm-2" htmlFor="email">
              Email:
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                onChange={emailInputChangeHandler}
                required={true}
                value={emailInput}
                className="form-control"
                id="email"
                placeholder="Enter email"
                name="email"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2" htmlFor="password">
              Password:
            </label>
            <div className="col-sm-10">
              <input
                onChange={passwordInputChangeHandler}
                value={passwordInput}
                required={true}
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                name="password"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-10 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
        <span className={`${errorInInput.length ? "text-danger" : "d-none"}`}>
          {errorInInput}
        </span>
      </div>
      <Link to="/forgotPassword">Forgot Password?</Link>
    </div>
  );
};

export default Signin;
