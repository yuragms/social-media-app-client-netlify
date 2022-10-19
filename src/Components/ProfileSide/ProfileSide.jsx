import React from "react";
import { useMediaQuery } from "react-responsive";
import "./ProfileSide.css";
import LogoSearch from "../LogoSearch/LogoSearch";
import ProfileCard from "../ProfileCard/ProfileCard";
import FollowersCard from "../FollowersCard/FollowersCard";
import Navlinks from "../../Components/NavLinks/Navlinks";

const ProfileSide = () => {
  const isMin500 = useMediaQuery({
    query: "(max-width: 500px)",
  });
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <ProfileCard location="homepage" />
      {isMin500 && <Navlinks />}
      <FollowersCard />
    </div>
  );
};

export default ProfileSide;
