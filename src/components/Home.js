import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
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
