import "./closeFriends.css"

export default function CloseFriends({users}) {

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div>
      <li className="sidebar-friend">
        <img src={PUBLIC_FOLDER + users.profilePicture} alt="" className="sidebar-friend-img" />
        <span className="sidebar-friend-name">{users.username}</span>
      </li>
    </div>
  )
}
