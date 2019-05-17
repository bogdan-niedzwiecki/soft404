import {
  GET_MY_POSTS,
  GET_FRIENDS_POSTS,
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  FILTER_POSTS
} from "../actions/postActions";
import { DELETE_USER, ADD_USER } from "../actions/userActions";

const initialState = {
  me: {
    Friend: {},
    Posts: []
  },
  friends: [],
  filterText: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        me: { ...state.me, Friend: action.payload }
      };

    case DELETE_USER:
      return {
        state: initialState
      };

    case GET_MY_POSTS:
      return {
        ...state,
        me: { ...state.me, Posts: action.payload }
      };
    case GET_FRIENDS_POSTS:
      return {
        ...state,
        friends: action.payload
      };

    case ADD_POST:
      return {
        ...state,
        me: { ...state.me, Posts: [action.payload, ...state.me.Posts] }
      };

    case EDIT_POST:
      return {
        ...state,
        me: {
          ...state.me,
          Posts: state.me.Posts.map(post =>
            post.Id === action.payload.Id ? action.payload : post
          )
        }
      };

    case DELETE_POST:
      return {
        ...state,
        me: {
          ...state.me,
          Posts: state.me.Posts.filter(post => post.Id !== action.payload)
        }
      };

    case FILTER_POSTS:
      return {
        ...state,
        filterText: action.payload
      };

    default:
      return state;
  }
};
export default reducer;
