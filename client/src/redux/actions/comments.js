import { fetcher } from "../fetcher";
import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  FINISHED_COMMENTS_RELOAD,
  COMMENT_ERROR,
  READ_ONE_COMMENT,
  READ_COMMENTS,
  START_COMMENTS_RELOAD,
  UPDATE_COMMENT,
} from "../types/comments";

export const creatComment = data =>
  fetcher({
    url: "http://localhost:8080/api/comments",
    method: "comment",
    data: data,
    successType: CREATE_COMMENT,
    errorType: COMMENT_ERROR,
    startReload: START_COMMENTS_RELOAD,
    finishedReload: FINISHED_COMMENTS_RELOAD,
  });

export const readComments = () =>
  fetcher({
    url: "http://localhost:8080/api/comments",
    method: "get",
    successType: READ_COMMENTS,
    errorType: COMMENT_ERROR,
    startReload: START_COMMENTS_RELOAD,
    finishedReload: FINISHED_COMMENTS_RELOAD,
  });

export const readOneComment = id =>
  fetcher({
    url: `http://localhost:8080/api/comments/${id}`,
    method: "get",
    successType: READ_ONE_COMMENT,
    errorType: COMMENT_ERROR,
    startReload: START_COMMENTS_RELOAD,
    finishedReload: FINISHED_COMMENTS_RELOAD,
  });

export const updateComment = id =>
  fetcher({
    url: `http://localhost:8080/api/comments/${id}`,
    method: "update",
    successType: UPDATE_COMMENT,
    errorType: COMMENT_ERROR,
    startReload: START_COMMENTS_RELOAD,
    finishedReload: FINISHED_COMMENTS_RELOAD,
  });

export const deleteComment = id =>
  fetcher({
    url: `http://localhost:8080/api/comments/${id}`,
    method: "update",
    successType: DELETE_COMMENT,
    errorType: COMMENT_ERROR,
    startReload: START_COMMENTS_RELOAD,
    finishedReload: FINISHED_COMMENTS_RELOAD,
  });
