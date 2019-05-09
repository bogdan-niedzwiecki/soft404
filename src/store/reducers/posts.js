import { POSTS_FETCH_DATA_SUCCESS } from "../actions/posts";

const initialState = {
  posts: []
};

const posts = function(state = initialState, action) {
  switch (action.type) {
    case POSTS_FETCH_DATA_SUCCESS:
      return {
        ...state,
        posts: action.payload
      };

    default:
      return state;
  }
};

export default posts;
