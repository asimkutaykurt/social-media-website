import "./online.css"

export default function Online({ users }) {

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
            <li className="rightbar-friend">
                <div className="rightbar-profile-img-container">
                <img src={PUBLIC_FOLDER + users.profilePicture} alt="" className="rightbar-profile-img" />
                <span className="rightbar-online"></span>
                </div>
                <span className="rightbar-username">{users.username}</span>
            </li>
            
  )
}
