import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { useSelector, useDispatch } from "react-redux";
import { likePost } from "../../api/PostsRequests";
import { deletePost } from "../../actions/postsAction";

const Post = ({ data }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const { allUsers } = useSelector((state) => state.allUsersReducer);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const delPost = () => {
    // deletePost(data._id);
    console.log({ deletePost: data._id });
    dispatch(deletePost(data._id));
  };

  const avtor = allUsers.find((person) => person._id === data.userId);
  console.log(avtor);
  return (
    <div className="Post">
      <div className="userName">
        {avtor.firstname} {avtor.lastname}
      </div>
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />
      <div className="btnLine">
        <div className="postReact">
          <img
            src={liked ? Heart : NotLike}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={handleLike}
          />
          <img src={Comment} alt="" />
          <img src={Share} alt="" />
        </div>
        <div>
          {data.userId === user._id && (
            <button className="button ps-button" onClick={delPost}>
              delete
            </button>
          )}
        </div>
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>
    </div>
  );
};

export default Post;

// import React, { useState } from "react";
// import "./Post.css";
// import Comment from "../../img/comment.png";
// import Share from "../../img/share.png";
// import Heart from "../../img/like.png";
// import NotLike from "../../img/notlike.png";
// import { useSelector } from "react-redux";
// import { likePost } from "../../api/PostsRequests";

// const Post = ({ data }) => {
//   const { user } = useSelector((state) => state.authReducer.authData);
//   const [liked, setLiked] = useState(data.likes.includes(user._id));
//   const [likes, setLikes] = useState(data.likes.length);

//   const handleLike = () => {
//     setLiked((prev) => !prev);
//     likePost(data._id, user._id);
//     liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
//   };

//   return (
//     <div className="Post">
//       <img
//         src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
//         alt=""
//       />
//       <div className="btnLine">
//         <div className="postReact">
//           <img
//             src={liked ? Heart : NotLike}
//             alt=""
//             style={{ cursor: "pointer" }}
//             onClick={handleLike}
//           />
//           <img src={Comment} alt="" />
//           <img src={Share} alt="" />
//         </div>
//         <div>
//           <button className="button ps-button">
//             delete
//           </button>
//         </div>
//       </div>

//       <span style={{ color: "var(--gray)", fontSize: "12px" }}>
//         {likes} likes
//       </span>
//       <div className="detail">
//         <span>
//           <b>{data.name}</b>
//         </span>
//         <span> {data.desc}</span>
//       </div>
//     </div>
//   );
// };

// export default Post;
