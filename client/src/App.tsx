import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useAuth } from "./context/authContext/useAuth";
import Welcome from "./components/Welcome";

const App = () => {
  const auth = useAuth();

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { authUser, setAuthUser } = auth;

  return (
    <Routes>
      <Route path="/" element={authUser ? <Homepage /> : <Welcome />} />
      <Route
        path="/signup"
        element={authUser ? <Navigate to={"/"} /> : <Signup />}
      />
      <Route
        path="/login"
        element={authUser ? <Navigate to={"/"} /> : <Login />}
      />
    </Routes>
  );
};

export default App;
