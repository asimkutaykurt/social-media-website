import "./rightbar.css"
import { Users } from "../../data";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Rightbar({ user }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err, "Fehler in useEffect");
      }
    };
    getFriends(followed);
  }, [user]);

  const handleClick = () => {
    try {
      if (followed) {
        axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        console.log("Was geht");
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err, "Fehler in handleClick Funktion!");
    }
  };


  const HomeRightbar = () => {
    return (
      <div>
        <div className="birthday-container">
          <img className="birthday-img" src="assets/gift.png" alt="" />
          <span className="birthday-text"><span className="birthday-name">Pola Foster</span> and<span className="birthday-name">3 others friends</span>  have birthday today.</span>
        </div>
        <img className="rightbar-ad" src="/assets/ad.png" alt="" />
        <h4 className="rightbar-title">Online Friends</h4>

        <ul className="rightbar-friend-list">
          {Users.map((u) => {
            return (
              <Online key={u.id} users={u} />
            )
          })}
        </ul>
      </div>
    )
  }

  const ProfileRightbar = () => {
    return (
      <div>
        {user.username !== currentUser.username && (
          <button className="rightbar-follow-button" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
        <h4 className="rightbar-title">User information</h4>
        <div className="rightbar-info">
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">City:</span>
            <span className="rightbar-info-value">{user.city}</span>
          </div>

          <div className="rightbar-info-item">
            <span className="rightbar-info-key">From:</span>
            <span className="rightbar-info-value">{user.from}</span>
          </div>

          <div className="rightbar-info-item">
            <span className="rightbar-info-key">Relationship:</span>
            <span className="rightbar-info-value">{user.relationship === 1
              ? "Single"
              : user.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbar-title">User friends</h4>

        <div className="rightbar-followings">
          {friends.map((friend) => {
            return (
              <Link to={"/profile/" + friend.username} className="link-to-friend-profile">
                <div className="rightbar-following">
                  <img src={friend.profilePicture ? PUBLIC_FOLDER + friend.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"} alt="" className="rightbar-following-img" />
                  <span className="rightbar-following-name">{friend.username}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }
  return (
    <div className="rightbar">
      <div className="rightbar-wrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}
