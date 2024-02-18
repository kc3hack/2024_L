import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/welcome";

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routing;