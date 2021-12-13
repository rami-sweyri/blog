import {
  READ_POSTS,
  READ_ONE_POST,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  CLEAR_POST,
  START_POSTS_RELOAD,
  FINISHED_POSTS_RELOAD,
  POST_ERROR,
} from "../types/posts";

const initialState = {
  posts: [],
  post: {},
  error: {},
  loading: false,
  readable: false,
};

export default function postsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case READ_POSTS:
      return {
        ...state,
        posts: [...payload.data],
        readable: true,
      };
    case READ_ONE_POST:
      return {
        ...state,
        post: payload.data,
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [payload.data, ...state.posts],
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: [
          ...state.posts.map(post =>
            post.id === payload.data.id ? payload.data : post
          ),
        ],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: [...state.posts.filter(post => post.id !== payload.data.id)],
      };
    case CLEAR_POST:
      return {
        ...state,
        post: {},
      };

    case START_POSTS_RELOAD:
      return {
        ...state,
        loading: true,
      };
    case FINISHED_POSTS_RELOAD:
      return {
        ...state,
        loading: false,
      };

    case POST_ERROR:
      return {
        ...state,
        // errors: [...state.errors, payload],
      };
    default:
      return state;
  }
}
