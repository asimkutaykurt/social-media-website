import "./post.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
    
  return (
    <div className="post">
        <div className="post-wrapper">
            <div className="post-top">
                <div className="post-top-left">
                    <Link to={`/profile/${user.username}`}>
                        <img
                            className="post-profile-img"
                            src={
                            user.profilePicture
                                ? PUBLIC_FOLDER + user.profilePicture
                                : PUBLIC_FOLDER + "person/noAvatar.png"
                            }
                            alt=""
                        />
                    </Link>
                        <span className="post-username">
                            {user.username}
                        </span>
                    <span className="post-date">{format(post.createdAt)}</span>
                </div>
                <div className="post-top-right">
                    <MoreVertIcon />
                </div>
            </div>
            <div className="post-center">
                <span className="post-text">{post?.description}</span>
                <img className="post-img" src={PUBLIC_FOLDER + post.images} alt="" />
            </div>
            <div className="post-bottom">
                <div className="post-bottom-left">
                    <img className="like-icon" src={`${PUBLIC_FOLDER}/like.png`} onClick={likeHandler} alt="" />
                    <img className="like-icon" src={`${PUBLIC_FOLDER}/heart.png`} onClick={likeHandler} alt="" />
                    <span className="post-like-counter">{like} people like it</span>
                </div>
                <div className="post-bottom-right">
                    <span className="post-comment-text">{post.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}
