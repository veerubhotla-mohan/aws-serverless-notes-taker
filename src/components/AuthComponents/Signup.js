import React, { useEffect, useState } from "react";
import validator from "validator";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  useEffect(() => {
    async function checkAnyUser() {
      try {
        await Auth.currentAuthenticatedUser();
        navigate("/myapp");
      } catch (error) {}
    }
    checkAnyUser();
  });
  const [errorInInput, setErrorInInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
  const [isFormValid, setFormValid] = useState(false);

  const usernameInputChangeHandler = (event) => {
    setErrorInInput("");
    setFormValid(false);
    setUsernameInput(event.target.value);
  };
  const emailInputChangeHandler = (event) => {
    setErrorInInput("");
    setFormValid(false);
    setEmailInput(event.target.value);
  };
  const passwordInputChangeHandler = (event) => {
    setErrorInInput("");
    setFormValid(false);
    setPasswordInput(event.target.value);
  };
  const passwordConfirmInputChangeHandler = (event) => {
    setErrorInInput("");
    setFormValid(false);
    setPasswordConfirmInput(event.target.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setFormValid(false);
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
      setErrorInInput(
        "Password policy not met. Password must contain atleast 8 characters, 1 lowercase character, 1 uppercase character, 1 numeric character and 1 special character"
      );
      return;
    }
    try {
      await Auth.signUp({
        username: emailInput,
        password: passwordInput,
        attributes: {
          email: emailInput,
          name: usernameInput,
        },
      });
      setFormValid(true);
      setErrorInInput("");
      setUsernameInput("");
      setEmailInput("");
      setPasswordInput("");
      setPasswordConfirmInput("");
      setTimeout(() => {
        setFormValid(false);
      }, 5000);
    } catch (error) {
      if (error.message.includes("exist")) {
        setErrorInInput("An account exists with the given details");
      } else {
        setErrorInInput(
          "An error occured while creating your account. Please try later."
        );
      }
    }
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
