import "./rightbar.css"
import { Users } from "../../data";
import Online from "../online/Online";


export default function Rightbar({ user }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const HomeRightbar = () => {
    return(
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
    return(
      <div>
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
              : user.relationship ===1
              ? "Married"
              : "-"}
              </span>
          </div>
        </div>
        <h4 className="rightbar-title">User friends</h4>
        <div className="rightbar-followings">
          <div className="rightbar-following">
            <img src={`${PUBLIC_FOLDER}person/1.jpeg`} alt="" className="rightbar-following-img" />
            <span className="rightbar-following-name">John Carter</span>
          </div>

          <div className="rightbar-following">
            <img src={`${PUBLIC_FOLDER}person/2.jpeg`} alt="" className="rightbar-following-img" />
            <span className="rightbar-following-name">John Carter</span>
          </div>

          <div className="rightbar-following">
            <img src={`${PUBLIC_FOLDER}person/3.jpeg`} alt="" className="rightbar-following-img" />
            <span className="rightbar-following-name">John Carter</span>
          </div>

          <div className="rightbar-following">
            <img src={`${PUBLIC_FOLDER}person/4.jpeg`} alt="" className="rightbar-following-img" />
            <span className="rightbar-following-name">John Carter</span>
          </div>

          <div className="rightbar-following">
            <img src={`${PUBLIC_FOLDER}person/5.jpeg`} alt="" className="rightbar-following-img" />
            <span className="rightbar-following-name">John Carter</span>
          </div>

          <div className="rightbar-following">
            <img src={`${PUBLIC_FOLDER}person/6.jpeg`} alt="" className="rightbar-following-img" />
            <span className="rightbar-following-name">John Carter</span>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="rightbar">
        <div className="rightbar-wrapper">
          {user ? <ProfileRightbar /> : <HomeRightbar /> }
        </div>
    </div>
  )
}
