import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import Navigationbar from "./Navigationbar";

const Profile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    async function checkAnyUser() {
      try {
        await Auth.currentAuthenticatedUser();
      } catch (error) {
        navigate("/");
      }
    }
    checkAnyUser();
  }, []);
  const [errorInChangePassword, setErrorInChangePassword] = useState("");
  const [oldPasswordInput, setOldPasswordInput] = useState("");
  const oldPasswordInputChangeHandler = (event) => {
    setOldPasswordInput(event.target.value);
    setErrorInChangePassword("");
  };
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const newPasswordInputChangeHandler = (event) => {
    setNewPasswordInput(event.target.value);
    setErrorInChangePassword("");
  };

  const changePasswordFormSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(
        currentUser,
        oldPasswordInput,
        newPasswordInput
      );
      setErrorInChangePassword("SUCCESS");
      setOldPasswordInput("");
      setNewPasswordInput("");
      setTimeout(() => {
        setErrorInChangePassword("");
        navigate("/");
      }, 5000);
      await Auth.signOut();
    } catch (error) {
      if (
        error.name === "NotAuthorizedException" ||
        error.name === "InvalidParameterException"
      )
        setErrorInChangePassword("Your old password is incorrect");
      else if (error.name === "InvalidPasswordException")
        setErrorInChangePassword("Password policy not met");
      else
        setErrorInChangePassword(
          "An error occured while changing your password. Please try again"
        );
    }
  };

  return (
    <div>
      <Navigationbar></Navigationbar>
      <div className="container mt-3">
        <h2>Change your password</h2>
        <div className="row">
          <form onSubmit={changePasswordFormSubmitHandler}>
            <div className="form-group">
              <label className="col-sm-2" htmlFor="oldPassword">
                Old Password:
              </label>
              <div className="col-sm-10">
                <input
                  onChange={oldPasswordInputChangeHandler}
                  value={oldPasswordInput}
                  type="password"
                  required={true}
                  className="form-control"
                  id="oldPassword"
                  placeholder="Enter old password"
                  name="oldPassword"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2" htmlFor="newPassword">
                New Password:
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
          <span
            className={`${
              errorInChangePassword.length > 0 &&
              errorInChangePassword !== "SUCCESS"
                ? "text-danger"
                : "d-none"
            }`}
          >
            {errorInChangePassword}
          </span>
          <span
            className={`${
              errorInChangePassword === "SUCCESS" ? "text-info" : "d-none"
            }`}
          >
            Successfully changed your password. Logging off...
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
