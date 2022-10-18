import React, { useState, useRef } from "react";
import "./PostShare.css";
// import ProfileImage from "../../img/profileImg.jpg";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useSelector, useDispatch } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/uploadAction";
import toast from "react-hot-toast";

const PostShare = () => {
  const upLoading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const dispatch = useDispatch();
  const desc = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };

  const reset = () => {
    setImage(null);
    desc.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc.current.value) {
      toast.error("Please fill input field and select your picture");
    } else {
      const newPost = {
        userId: user._id,
        desc: desc.current.value,
      };
      if (image) {
        const data = new FormData();
        const filename = "posts/" + Date.now() + image.name;
        data.append("name", filename);
        data.append("file", image);
        newPost.image = filename;
        console.log(newPost);
        try {
          dispatch(uploadImage(data));
        } catch (error) {
          console.log(error);
        }
      }

      const uploadPostt = () => {
        dispatch(uploadPost(newPost));
      };
      setTimeout(uploadPostt, 1500);

      clearTimeout(uploadPostt);

      reset();
    }
  };
  return (
    <div className="PostShare">
      <img
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "avatar/defaultProfile.png"
        }
        alt=""
      />
      <div>
        <input ref={desc} required type="text" placeholder="What's happening" />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div>
          <button
            className="button ps-button"
            onClick={handleSubmit}
            disabled={upLoading}
          >
            {upLoading ? "upLoading..." : "Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
