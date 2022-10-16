const allUsersReducer = (
  state = { allUsers: [], loading: false, error: false },
  action
) => {
  switch (action.type) {
    // belongs to FollowersCard.jsx
    case "GET_ALL_USERS_START":
      return { ...state, loading: true, error: false };
    case "GET_ALL_USERS_SUCCESS":
      return { ...state, allUsers: action.data, loading: false, error: false };
    case "GET_ALL_USERS_FAIL":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default allUsersReducer;
