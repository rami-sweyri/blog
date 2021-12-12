import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "../types/alert";

export const setAlert =
  (message, status, priority, timeout = 11000) =>
  dispatch => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { message, status, id, timeout, priority },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
export const removeAlert = payload => dispatch => {
  dispatch({ type: REMOVE_ALERT, payload });
};
