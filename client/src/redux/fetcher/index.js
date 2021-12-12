import axios from "axios";
import { setAlert } from "../actions/alert";
import { v4 as uuidv4 } from "uuid";

export const fetcher = ({
  successType,
  errorType,
  headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withReload = true,
  withAlert = true,
  startReload,
  finishedReload,
  url,
  data,
  method = "get",
}) => {
  return async dispatch => {
    const onSuccess = success => {
      dispatch({
        type: successType,
        payload: success.data,
      });

      withAlert &&
        dispatch(
          setAlert(
            success.data.message,
            success.data.status,
            success.data.priority
          )
        );
      !withReload && dispatch(finishedReload);
      return success;
    };
    const onError = error => {
      dispatch({
        type: errorType,
        payload: {
          ...error.response.data,
          type: successType,
          date: new Date(),
          id: uuidv4(),
        },
      });
      withAlert &&
        dispatch(
          setAlert(
            error.response.data.message,
            error.response.data.status,
            error.response.data.priority
          )
        );

      withReload && dispatch(finishedReload);
      return error;
    };
    try {
      withReload && dispatch(startReload);
      const success =
        method === "get" || method === "delete"
          ? await axios[method](url, {
              headers: headers,
            })
          : await axios[method](url, data, {
              headers: headers,
            });

      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
};
