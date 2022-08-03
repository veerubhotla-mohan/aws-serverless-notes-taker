import { Routes, Route } from "react-router-dom";
import Amplify from "aws-amplify";

import Home from "./components/Home";
import Signin from "./components/AuthComponents/Signin";
import Signup from "./components/AuthComponents/Signup";
import ForgotPassword from "./components/AuthComponents/ForgotPassword";

import MyApp from "./components/AppComponents/MyApp";
import Profile from "./components/AppComponents/Profile";

function App() {
  Amplify.configure({
    Auth: {
      mandatorySignId: true,
      region: process.env.REGION,
      userPoolId: process.env.REACT_APP_USERPOOLID,
      userPoolWebClientId: process.env.REACT_APP_CLIENTID,
    },
  });
  return (
    <div className="container mt-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/myapp" element={<MyApp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
