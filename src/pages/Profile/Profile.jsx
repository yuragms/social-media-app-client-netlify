import React from "react";
import "./Profile.css";
import ProfileLeft from "../../Components/ProfileLeft/ProfileLeft";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import PostSide from "../../Components/PostSide/PostSide";
import RightSide from "../../Components/RightSide/RightSide";
import { useMediaQuery } from "react-responsive";
import Navlinks from "../../Components/NavLinks/Navlinks";

const Profile = () => {
  const isMin500 = useMediaQuery({
    query: "(min-width: 500px)",
  });
  const isMin800 = useMediaQuery({
    query: "(min-width: 800px)",
  });
  return (
    <div className="Profile">
      {isMin500 && <ProfileLeft />}
      <div className="Profile-center">
        <ProfileCard location="profilePage" />
        {!isMin800 && <Navlinks />}
        {!isMin500 && <ProfileLeft />}
        <PostSide />
      </div>
      {isMin800 && <RightSide />}
    </div>
  );
};

export default Profile;
