import React, { useState } from "react";
import validator from "validator";
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const Signup = () => {
  const poolData = {
    UserPoolId: process.env.REACT_APP_USERPOOLID,
    ClientId: process.env.REACT_APP_CLIENTID,
  };
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  const [errorInInput, setErrorInInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const usernameInputChangeHandler = (event) => {
    setErrorInInput("");
    setUsernameInput(event.target.value);
  };
  const [emailInput, setEmailInput] = useState("");
  const emailInputChangeHandler = (event) => {
    setErrorInInput("");
    setEmailInput(event.target.value);
  };
  const [passwordInput, setPasswordInput] = useState("");
  const passwordInputChangeHandler = (event) => {
    setErrorInInput("");
    setPasswordInput(event.target.value);
  };
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
  const passwordConfirmInputChangeHandler = (event) => {
    setErrorInInput("");
    setPasswordConfirmInput(event.target.value);
  };

  const [isFormValid, setFormValid] = useState(false);
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!validator.equals(passwordInput, passwordConfirmInput)) {
      setErrorInInput("Passwords do not match");
      return;
    }
    if (!validator.isEmail(emailInput)) {
      setErrorInInput("Email is not valid");
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
      setErrorInInput("Password policy not met");
      return;
    }

    const attributeList = [];
    const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "email",
      Value: emailInput,
    });
    const attributeName = new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "name",
      Value: usernameInput,
    });

    attributeList.push(attributeEmail);
    attributeList.push(attributeName);

    userPool.signUp(
      emailInput,
      passwordInput,
      attributeList,
      [],
      (error, data) => {
        if (error) {
          if (error.message.includes("exists")) {
            setErrorInInput("Account already exists with given details");
          } else {
            setErrorInInput(
              "An error occured while creating your account. Please try again"
            );
          }
        } else {
          setErrorInInput("");
          setUsernameInput("");
          setEmailInput("");
          setPasswordInput("");
          setPasswordConfirmInput("");
          setFormValid(true);
          setTimeout(() => {
            setFormValid(false);
          }, 5000);
        }
      }
    );
  };
  return (
    <div className="container mt-3">
      <h2>Signup form</h2>
      <div className="row">
        <form onSubmit={formSubmitHandler}>
          <div className="form-group">
            <label className="col-sm-2" htmlFor="name">
              Name:
            </label>
            <div className="col-sm-10">
              <input
                onChange={usernameInputChangeHandler}
                value={usernameInput}
                required={true}
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                name="name"
              />
            </div>
          </div>
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
            <label className="col-sm-2" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <div className="col-sm-10">
              <input
                onChange={passwordConfirmInputChangeHandler}
                value={passwordConfirmInput}
                required={true}
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Enter password"
                name="confirmPassword"
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
        <span className={`${isFormValid ? "text-info" : "d-none"}`}>
          Verification link sent to your email
        </span>
        <span className={`${errorInInput.length ? "text-danger" : "d-none"}`}>
          {errorInInput}
        </span>
      </div>
    </div>
  );
};

export default Signup;
