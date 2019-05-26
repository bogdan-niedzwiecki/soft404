import {
  GET_MY_POSTS,
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  SET_MAIN_SEARCH
} from "../actions/postActions";
import { DELETE_USER, ADD_PROFILE } from "../actions/userActions";
import {
  FIND_FRIENDS,
  REMOVE_FROM_FRIENDS,
  GET_FRIENDS_POSTS
} from "../actions/friendActions";

const initialState = {
  me: {
    Friend: {},
    Posts: []
  },
  friends: [],
  mainSearch: "",
  foundFriends: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROFILE:
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

    case SET_MAIN_SEARCH:
      return {
        ...state,
        mainSearch: action.payload
      };

    case FIND_FRIENDS:
      return {
        ...state,
        foundFriends: action.payload
      };

    case REMOVE_FROM_FRIENDS:
      return {
        ...state,
        friends: state.friends.filter(
          friend => friend.Friend.Id !== action.payload
        )
      };

    default:
      return state;
  }
};
export default reducer;
