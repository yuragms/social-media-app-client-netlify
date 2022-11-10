import React from "react";
import "./PostSide.css";
import PostShare from "../PostShare/PostShare";
import Posts from "../Posts/Posts";
import Navlinks from "../NavLinks/Navlinks";
import { useMediaQuery } from "react-responsive";

const PostSide = () => {
  const isMin500andMax800 = useMediaQuery({ minWidth: 501, maxWidth: 800 });
  return (
    <div className="PostSide">
      <PostShare />
      {isMin500andMax800 && <Navlinks />}
      <Posts />
    </div>
  );
};

export default PostSide;
