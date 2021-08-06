import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_POST,
  GET_POSTS,
  GET_SINGLE_POST,
  POST_ERROR,
  REMOVE_COMMENT,
  UPDATE_LIKES,
} from '../actions/types';

const intialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

// eslint-disable-next-line
export default function (state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_SINGLE_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment._id !== payload
          ),
        },
      };
    default:
      return state;
  }
}
