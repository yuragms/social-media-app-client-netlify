const authReducer = (
  state = {
    authData: null,
    loading: false,
    error: false,
    updaateLoading: true,
  },
  action
) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: false };
    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, error: false };
    case "AUTH_FAIL":
      console.log(action.error);
      return { ...state, loading: false, error: action.error.response.status };
    case "RESET_AUTH_ERROR":
      return { ...state, loading: false, error: false };

    case "UPDATING_START":
      return { ...state, updaateLoading: true, error: false };
    case "UPDATING_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        authData: action.data,
        updaateLoading: false,
        error: false,
      };
    case "UPDATING_FAIL":
      return {
        ...state,
        updaateLoading: false,
        error: true,
      };
    case "FOLLOW_USER_START":
      return { ...state };

    case "FOLLOW_USER_SUCCESS":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [...state.authData.user.following, action.data],
          },
        },
      };
    case "FOLLOW_USER_FAIL":
      console.log("Not Update Folloving action, maybe not valid token");
      localStorage.clear();
      return { ...state, authData: null, loading: false, error: false };

    case "UNFOLLOW_USER_START":
      return { ...state };

    case "UNFOLLOW_USER_SUCCESS":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [
              ...state.authData.user.following.filter(
                (personId) => personId !== action.data
              ),
            ],
          },
        },
      };
    case "UNFOLLOW_USER_FAIL":
      console.log("Not Update Folloving action, maybe not valid token");
      localStorage.clear();
      return { ...state, authData: null, loading: false, error: false };

    case "LOG_OUT":
      localStorage.clear();
      return { ...state, authData: null, loading: false, error: false };
    default:
      return state;
  }
};

export default authReducer;
