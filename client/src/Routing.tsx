import { useEffect } from "react";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import { useFirebaseAuthContext } from "./providers/FirebaseAuth";

import Welcome from "./pages/Welcome";
import Maps from "./pages/Maps";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";

const Routing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useFirebaseAuthContext();

  // user認証が必要なページはここに追加してください。
  const protectedRoutes = ["/", "/maps"];

  useEffect(() => {
    if (protectedRoutes.includes(location.pathname) && !user) {
      navigate("/welcome");
    }
  }, [location, user, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/maps" element={<Maps />} />
    </Routes>
  );
};

export default Routing;
