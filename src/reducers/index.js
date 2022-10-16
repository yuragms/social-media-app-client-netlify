import { combineReducers } from "redux";

import authReducer from "./authReducer";
import postReducer from "./postReducer";
import allUsersReducer from "./allUsersReducer";

export const reducers = combineReducers({
  authReducer,
  postReducer,
  allUsersReducer,
});
