import { combineReducers } from "redux";
import postsReducer from "./posts";
import alertReducer from "./alert";
import commentsReducer from "./comments";

export default combineReducers({
  postsReducer,
  commentsReducer,
  alertReducer,
});
