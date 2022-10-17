import React, { useEffect } from "react";
import "./Posts.css";
// import { PostsData } from "../../Data/PostsData.js";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../actions/postsAction";
import { useParams } from "react-router";

const Posts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const params = useParams();

  useEffect(() => {
    console.log("useEffect-Posts.jsx");
    console.log(user._id);
    dispatch(getTimelinePosts(user._id));
  }, [dispatch, user._id]);

  // useEffect(() => {
  //   console.log("useEffect-Posts.jsx");
  //   console.log(user._id);
  //   dispatch(getTimelinePosts(user._id));
  // }, [user._id]);

  console.log(posts);
  if (!posts) return "No posts";
  console.log(params);
  if (params.id) posts = posts.filter((post) => post.userId === params.id);

  return (
    <div className="Posts">
      {loading
        ? "Fetching Posts..."
        : posts.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
    </div>
  );
};

export default Posts;
