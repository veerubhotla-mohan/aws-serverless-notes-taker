import { Auth } from "aws-amplify";
import React, { useState } from "react";

const ForgotPassword = () => {
  const [userNameInput, setUserNameInput] = useState("");
  const [verificationCodeInput, setVerificationCodeInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [codeSentInfo, setCodeSentInfo] = useState(false);
  const [updatePasswordStatus, setUpdatePasswordStatus] = useState("");
  const usernameInputChangeHandler = (event) => {
    setUserNameInput(event.target.value);
    setUpdatePasswordStatus("");
  };
  const verificationCodeInputChangeHandler = (event) => {
    setVerificationCodeInput(event.target.value);
    setUpdatePasswordStatus("");
  };
  const newPasswordInputChangeHandler = (event) => {
    setNewPasswordInput(event.target.value);
    setUpdatePasswordStatus("");
  };
  const forgotPasswordFormSubmitHandler = async (event) => {
    event.preventDefault();
    setCodeSentInfo(true);
    try {
      await Auth.forgotPassword(userNameInput);
    } catch (error) {}
  };
  const setNewPasswordHandler = async (event) => {
    event.preventDefault();
    try {
      await Auth.forgotPasswordSubmit(
        userNameInput,
        verificationCodeInput,
        newPasswordInput
      );
      setUpdatePasswordStatus("SUCCESS");
      setUserNameInput("");
      setVerificationCodeInput("");
      setNewPasswordInput("");
      setCodeSentInfo(false);
    } catch (error) {
      setUpdatePasswordStatus("FAIL");
    }
  };
  return (
    <div className="container mt-3">
      <h2>Forgot Password form</h2>
      <div className="row">
        <form onSubmit={forgotPasswordFormSubmitHandler}>
          <div className="form-group">
            <label className="col-sm-2" htmlFor="username">
              Email:
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                onChange={usernameInputChangeHandler}
                required={true}
                value={userNameInput}
                className="form-control"
                id="username"
                placeholder="Enter your email"
                name="username"
              />
            </div>
          </div>
          <span className={`${codeSentInfo ? "text-info" : "d-none"}`}>
            Code sent to the email if account exists with the provided email
          </span>
          <div className="form-group">
            <div className="col-sm-10 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      {codeSentInfo ? (
        <form onSubmit={setNewPasswordHandler}>
          <div className="form-group">
            <label className="col-sm-2" htmlFor="verificationCode">
              Verification code:
            </label>
            <div className="col-sm-10">
              <input
                onChange={verificationCodeInputChangeHandler}
                value={verificationCodeInput}
                required={true}
                type="number"
                className="form-control"
                id="verificationCode"
                placeholder="Enter verification code"
                name="verificationCode"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2" htmlFor="newPassword">
              Password:
            </label>
            <div className="col-sm-10">
              <input
                onChange={newPasswordInputChangeHandler}
                value={newPasswordInput}
                required={true}
                type="password"
                className="form-control"
                id="newPassword"
                placeholder="Enter new password"
                name="newPassword"
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
      ) : (
        <></>
      )}
      <span
        className={`${
          updatePasswordStatus === "SUCCESS" ? "text-info" : "d-none"
        }`}
      >
        Updated password successfully
      </span>
      <span
        className={`${
          updatePasswordStatus === "FAIL" ? "text-danger" : "d-none"
        }`}
      >
        Code Mismatch or Password policy not met. Failed to update password
      </span>
    </div>
  );
};
export default ForgotPassword;
