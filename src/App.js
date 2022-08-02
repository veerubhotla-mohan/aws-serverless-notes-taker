import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/AuthComponents/Signin";
import Signup from "./components/AuthComponents/Signup";
import MyApp from "./components/AppComponents/MyApp";
import Amplify from "aws-amplify";
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
      </Routes>
    </div>
  );
}

export default App;
