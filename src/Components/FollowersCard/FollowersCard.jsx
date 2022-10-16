import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import User from "../User/User";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../actions/userAction";

const FollowersCard = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const { allUsers, loading } = useSelector((state) => state.allUsersReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPersons = async () => {
      dispatch(getAllUsers());
    };
    fetchPersons();
  }, []);

  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>
      {loading
        ? "Fetching Users..."
        : allUsers.map((person, id) => {
            if (person._id !== user._id) {
              return <User person={person} key={id} />;
            }
          })}
    </div>
  );
};

export default FollowersCard;
