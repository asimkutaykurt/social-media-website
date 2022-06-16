import axios from "axios"
import { useEffect, useState } from "react"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import { useParams } from "react-router"
import "./profile.css"

export default function Profile() {

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users?username=${username}`);
      setUser(response.data)
    };
    fetchUser();
  }, [username]);

  return (
    <div>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profile-right">
            <div className="profile-right-top">
                <div className="profile-cover">
                    <img className="profile-cover-img" src={user.coverPicture || PUBLIC_FOLDER + "person/noCover.png"} alt="" />
                    <img className="profile-user-img" src={user.profilePicture || PUBLIC_FOLDER + "person/noAvatar.png"} alt="" />
                </div>
                <div className="profile-info">
                    <h4 className="profile-info-name">{user.username}</h4>
                    <span className="profile-info-description">{user.description}</span>
                </div>
            </div>

            <div className="profile-right-bottom">
                <Feed username={username} />
                <Rightbar user={user} />
            </div>
            
        </div>
        
      </div>
      
    </div>
  )
}
