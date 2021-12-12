import { fetcher } from "../fetcher";
import {
  CREATE_POST,
  DELETE_POST,
  FINISHED_POSTS_RELOAD,
  POST_ERROR,
  READ_ONE_POST,
  READ_POSTS,
  START_POSTS_RELOAD,
  UPDATE_POST,
} from "../types/posts";

export const creatPost = () =>
  fetcher({
    url: "http://localhost:8080/api/posts",
    method: "post",
    successType: CREATE_POST,
    errorType: POST_ERROR,
    startReload: START_POSTS_RELOAD,
    finishedReload: FINISHED_POSTS_RELOAD,
  });

export const readPosts = () =>
  fetcher({
    url: "http://localhost:8080/api/posts",
    method: "get",
    successType: READ_POSTS,
    errorType: POST_ERROR,
    startReload: START_POSTS_RELOAD,
    finishedReload: FINISHED_POSTS_RELOAD,
  });

export const readOnePost = id =>
  fetcher({
    url: `http://localhost:8080/api/posts/${id}`,
    method: "get",
    successType: READ_ONE_POST,
    errorType: POST_ERROR,
    startReload: START_POSTS_RELOAD,
    finishedReload: FINISHED_POSTS_RELOAD,
  });

export const updatePost = id =>
  fetcher({
    url: `http://localhost:8080/api/posts/${id}`,
    method: "update",
    successType: UPDATE_POST,
    errorType: POST_ERROR,
    startReload: START_POSTS_RELOAD,
    finishedReload: FINISHED_POSTS_RELOAD,
  });

export const deletePost = id =>
  fetcher({
    url: `http://localhost:8080/api/posts/${id}`,
    method: "update",
    successType: DELETE_POST,
    errorType: POST_ERROR,
    startReload: START_POSTS_RELOAD,
    finishedReload: FINISHED_POSTS_RELOAD,
  });
