import { useEffect } from "react";
import "./App.css";
import { getUserAuthStatus } from "./helper";
import { Routes, Route,useNavigate } from "react-router-dom";
import ToDo from "./ToDo";
import SignIn from "./SignIn";
import NavBar from "./NavBar";
import Posts from "./Posts";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { stateType } from "./types";
import { useDispatch } from "react-redux/es/hooks/useDispatch";

function App() {
  let navigate = useNavigate();
  const dipatch = useDispatch();
  const { isLogin } = useSelector((state: stateType) => state.auth);

  useEffect(() => {
    if (!isLogin) {
      if (getUserAuthStatus()) {
        dipatch({
          type: "LOGIN_SUCCESS",
        });
        return;
      }
      navigate("/signin");
    }
  }, [isLogin]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<ToDo />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </div>
  );
}

export default App;
