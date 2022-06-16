import "./share.css"
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
    const { user } = useContext(AuthContext);
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const description = useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
          userId: user._id,
          description: description.current.value,
        };
        if (file) {
          const data = new FormData();
          const fileName = Date.now() + file.name;
          data.append("file", file);
          data.append("name", fileName);
          newPost.images = fileName;
          console.log(newPost);
          try {
            await axios.post("/upload", data);
            console.log("Successfully uploaded");
          } catch (err) {
            console.log("Couldn't upload the image or file");
          }
        }
        try {
          await axios.post("/posts", newPost);
          window.location.reload();
        } catch (err) {}
      };

  return (
    <div className="share">
        <div className="share-wrapper">
            <div className="share-top">
                <img className="share-profile-img"
                src={user.profilePicture
                  ? PUBLIC_FOLDER + user.profilePicture
                  : PUBLIC_FOLDER + "person/noAvatar.png" } alt="" />
                <input
                    placeholder={"Whats in your mind " + user.username + "?"}
                    className="share-input"
                    ref={description}
                />
            </div>
            <hr className="share-hr"/>
            <form className="share-bottom" onSubmit={submitHandler}>
                <div className="share-options">
                    <label htmlFor="file" className="share-option">
                        <PermMediaIcon htmlColor="tomato" className="share-icon"/>
                        <span className="share-option-text">Photo or Video</span>
                        <input className="upload-button" type="file" id="file" accept=".png, .jpeg, .jpg" onChange={(e) => setFile(e.target.files[0])} />
                    </label>

                    <div className="share-option">
                        <LabelIcon htmlColor="blue" className="share-icon"/>
                        <span className="share-option-text">Tag</span>
                    </div>

                    <div className="share-option">
                        <RoomIcon htmlColor="green" className="share-icon"/>
                        <span className="share-option-text">Location</span>
                    </div>

                    <div className="share-option">
                        <EmojiEmotionsIcon htmlColor="goldenrod" className="share-icon"/>
                        <span className="share-option-text">Feelings</span>
                    </div>
                </div>
                <button className="share-button" type="submit">Share</button>
            </form>
        </div>
    </div>
  )
}
