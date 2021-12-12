import { combineReducers } from "redux";
import postsReducer from "./posts";
import alertReducer from "./alert";

export default combineReducers({
  postsReducer,
  alertReducer,
});
