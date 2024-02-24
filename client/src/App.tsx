import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Routing from "./Routing";
import Footer from "./components/Footer";

const App = () => {
  const location = useLocation();
  const [isFooter, setIsFooter] = useState(true);
  // Footerを表示しないページのパス
  const nonFooterRoutes = ["/welcome", "/signup", "/signin"];

  // Footerを表示するかどうかを判定する
  useEffect(() => {
    setIsFooter(!nonFooterRoutes.includes(location.pathname));
  }, [location.pathname]);

  return (
    <div className="App flex flex-col min-h-screen">
      <div className="flex-grow">
        <Routing />
      </div>
      {isFooter && <Footer />}
    </div>
  );
};

export default App;
