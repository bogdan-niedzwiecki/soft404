import { GET_POSTS } from "../actions/posts";
import { UPDATE_USER } from "../actions/user";

const initialState = {
  posts: [],
  user: []
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
}
