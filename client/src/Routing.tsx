import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/welcome" element={<Welcome />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routing;