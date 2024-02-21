import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Maps from "./pages/Maps";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/maps" element={<Maps />} />
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routing;