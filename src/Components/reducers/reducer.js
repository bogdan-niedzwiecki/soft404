import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  FILTER_POSTS
} from "../actions/postActions";
import { DELETE_USER, ADD_USER } from "../actions/userActions";
import { GET_FRIENDS } from "../actions/friendsAction";

const initialState = {
  posts: [],
  user: {},
  filterText: "",
  friends: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        user: action.payload
      };

    case DELETE_USER:
      return {
        state: initialState
      };

    case GET_POSTS:
      return {
        ...state,
        posts: action.payload
      };

    case ADD_POST:
      return {
        ...state,
        posts: [action.payload.newPost, ...state.posts]
      };

    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map(item =>
          item.Id === action.payload.editedPost.Id
            ? action.payload.editedPost
            : item
        )
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(item => item.Id !== action.payload)
      };

    case FILTER_POSTS:
      return {
        ...state,
        filterText: action.payload
      };

    case GET_FRIENDS:
      return {
        ...state,
        friends: action.payload
      };

    default:
      return state;
  }
};
export default reducer;
