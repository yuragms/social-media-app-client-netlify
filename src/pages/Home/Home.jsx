import React from "react";
import { useMediaQuery } from "react-responsive";
import "./Home.css";
import ProfileSide from "../../Components/ProfileSide/ProfileSide";
import PostSide from "../../Components/PostSide/PostSide";
import RightSide from "../../Components/RightSide/RightSide";

const Home = () => {
  const isMin800 = useMediaQuery({
    query: "(min-width: 800px)",
  });

  return (
    <div className="Home">
      <ProfileSide />
      <PostSide />
      {/* <RightSide /> */}
      {isMin800 && <RightSide />}
    </div>
  );
};

export default Home;
