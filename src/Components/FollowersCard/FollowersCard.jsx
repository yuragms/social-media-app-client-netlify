import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import User from "../User/User";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../actions/userAction";

const FollowersCard = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const { allUsers, loading } = useSelector((state) => state.allUsersReducer);
  const [listPeople, setListPeople] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPersons = async () => {
      dispatch(getAllUsers());
    };
    fetchPersons();
  }, [dispatch]);

  const handleclick = () => {
    setListPeople((prev) => !prev);
    console.log(listPeople);
  };

  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>
      <button
        className={
          listPeople ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleclick}
      >
        {listPeople ? "Close list people" : "Open list people"}
      </button>
      {loading
        ? "Fetching Users..."
        : listPeople &&
          allUsers.map((person, id) => {
            if (person._id !== user._id) {
              return <User person={person} key={id} />;
            }
          })}
    </div>
  );
};

export default FollowersCard;
