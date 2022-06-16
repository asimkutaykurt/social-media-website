import "./topbar.css";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function Topbar() {
  const {user} = useContext(AuthContext)
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="topbar-container">
        <div className="topbar-left">
          <Link to="/" className="logo">
            <span className="logo">Social Website</span>
          </Link>
        </div>

        <div className="topbar-center">
          <div className="searchbar">
            
            <SearchIcon className="search-icon"/>
            <input placeholder="Search for friends, post or any video" className="search-input" />
          </div>
        </div>

        <div className="topbar-right">
          <div className="topbar-links">
            <span className="topbar-link">Homepage</span>
            <span className="topbar-link">Timeline</span>
            </div>
            <div className="topbar-icons">
              <div className="topbar-icon-item">
                <PersonIcon />
                <span className="topbar-icon-badge">1</span>
              </div>

              <div className="topbar-icon-item">
                <ChatIcon />
                <span className="topbar-icon-badge">2</span>
              </div>

              <div className="topbar-icon-item">
                <NotificationsIcon />
                <span className="topbar-icon-badge">1</span>
              </div>
            </div>
            <Link to={`/profile/${user.username}`}>
              <img src={ user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"} alt="" className="topbar-img" />
            </Link>
        </div>
    </div>
  )
}

export default Topbar