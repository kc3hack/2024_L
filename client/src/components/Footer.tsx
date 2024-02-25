import { Link } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MapIcon from "@mui/icons-material/Map";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HomeIcon from "@mui/icons-material/Home";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 bg-white py-5 border-t-8 w-full"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
      <div
        className="flex items-center justify-center"
        style={{ justifyContent: "space-around" }}
      >
        <Link to="/">
          <HomeIcon fontSize="large" />
        </Link>
        <Link to="/maps">
          <MapIcon fontSize="large" />
        </Link>
        <Link to="/rank">
          <EmojiEventsIcon fontSize="large" />
        </Link>
        <Link to="/ranking">
          <GroupsOutlinedIcon fontSize="large" />
        </Link>
        <Link to="/user">
          <AccountCircleIcon fontSize="large" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
