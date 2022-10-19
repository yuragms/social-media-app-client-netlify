import React from "react";
import { Link } from "react-router-dom";
import "./Navlinks.css";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";

const Navlinks = () => {
  return (
    <div className="Navlinks">
      <div className="navIcons">
        <Link to="../home">
          <img src={Home} alt="" />
        </Link>
        <UilSetting />
        <img src={Noti} alt="" />
        <Link to="../chat">
          <img src={Comment} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default Navlinks;
