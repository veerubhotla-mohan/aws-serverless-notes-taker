import React, { useEffect } from "react";
import Navigationbar from "./Navigationbar";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

const MyApp = () => {
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
  });
  return (
    <div>
      <Navigationbar></Navigationbar>
    </div>
  );
};

export default MyApp;
