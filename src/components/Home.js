import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
const Home = () => {
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
  return (
    <div>
      <Link to="/signup" className="text-decoration-none text-dark">
        Signup
      </Link>{" "}
      |{" "}
      <Link to="/signin" className="text-decoration-none text-dark">
        Signin
      </Link>
    </div>
  );
};

export default Home;
