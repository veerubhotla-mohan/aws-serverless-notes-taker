import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/AuthComponents/Signin";
import Signup from "./components/AuthComponents/Signup";
import MyApp from "./components/AppComponents/MyApp";

function App() {
  return (
    <div className="container mt-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/myapp" element={<MyApp />} />
      </Routes>
    </div>
  );
}

export default App;
