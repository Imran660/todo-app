import { useEffect } from "react";
import "./App.css";
import { getUserAuthStatus } from "./helper";
import { Routes, Route,useNavigate } from "react-router-dom";
import ToDo from "./ToDo";
import SignIn from "./SignIn";

function App() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!getUserAuthStatus()) {
      navigate("/signin")
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ToDo />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
