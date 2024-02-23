import { Link } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MapIcon from "@mui/icons-material/Map";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HomeIcon from "@mui/icons-material/Home";

const Footer = () => {
  return (
    <footer>
      <div className="absolute bottom-0 ">
        <hr />
        <br />
        <div className="flex items-center justify-center w-screen">
          <Link to="/">
            <HomeIcon fontSize="large" />
          </Link>
          <Link to="/maps">
            <MapIcon fontSize="large" className="ml-8" />
          </Link>
          <Link to="/rank">
          <EmojiEventsIcon fontSize="large" className="ml-8" />
          </Link>
          <AccountCircleIcon fontSize="large" className="ml-8" />
        </div>
        <br />
      </div>
    </footer>
  );
};

export default Footer;