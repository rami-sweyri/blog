import {
  READ_COMMENTS,
  READ_ONE_COMMENT,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  CLEAR_COMMENT,
  START_COMMENTS_RELOAD,
  FINISHED_COMMENTS_RELOAD,
  COMMENT_ERROR,
} from "../types/comments";

const initialState = {
  comments: [],
  comment: {},
  error: {},
  loading: false,
  readable: false,
};

export default function commentsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case READ_COMMENTS:
      return {
        ...state,
        comments: [...payload.data],
        readable: true,
      };
    case READ_ONE_COMMENT:
      return {
        ...state,
        comment: payload.data,
      };
    case CREATE_COMMENT:
      return {
        ...state,
        comments: [payload.data, ...state.comments],
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: [
          ...state.comments.map(comment =>
            comment.id === payload.data.id ? payload.data : comment
          ),
        ],
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: [
          ...state.comments.filter(comment => comment.id !== payload.data.id),
        ],
      };
    case CLEAR_COMMENT:
      return {
        ...state,
        comment: {},
      };

    case START_COMMENTS_RELOAD:
      return {
        ...state,
        loading: true,
      };
    case FINISHED_COMMENTS_RELOAD:
      return {
        ...state,
        loading: false,
      };

    case COMMENT_ERROR:
      return {
        ...state,
        errors: [...state.errors, payload],
      };
    default:
      return state;
  }
}
