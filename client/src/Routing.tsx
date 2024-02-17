import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { Home, Location, SignUp, SignIn} from "./pages";
// import Maps from "./pages/Maps";
import SignUp from "./pages/SignUp";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/signin" element={<SignIn />} /> */}
        {/* <Route path="/maps" element={<Maps />} /> */}
        {/* <Route path="/location" element={<Location />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
