import React, { useEffect } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
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
  });
  return <div>Profile</div>;
};

export default Profile;
