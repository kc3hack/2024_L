import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Maps from "./pages/Maps";

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/maps" element={<Maps />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routing;