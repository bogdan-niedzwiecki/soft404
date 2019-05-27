import {
  GET_MY_POSTS,
  GET_FRIENDS_POSTS,
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  FILTER_POSTS
} from "../actions/postActions";
import { DELETE_USER, ADD_USER } from "../actions/userActions";
import { GET_FRIENDS, FILTER_FRIENDS, DELETE_FRIEND, SHOW_POST, HIDE_POST } from "../actions/friendsAction";

const initialState = {
  me: {
    Friend: {},
    Posts: []
  },
  friends: [],
  friendsfilter: "",
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

    case GET_FRIENDS:
      return {
        ...state,
        friends: action.payload
      };

    case DELETE_FRIEND:
      return {
        ...state,
        friends:
          state.friends.filter(
            friend => friend.Friend.Id !== action.payload
          )


      };
    case SHOW_POST:
      return {
        ...state,
        show: action.payload
      };

    case HIDE_POST:
      return {
        ...state,
        show: action.payload
      };

    case FILTER_FRIENDS:
      return {
        ...state,
        friendsfilter: action.payload
      };

    default:
      return state;
  }
};
export default reducer;
