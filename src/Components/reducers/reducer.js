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
  GET_FRIENDS_POSTS,
  HIDE_POST,
  SHOW_POST,
  FILTER_FRIENDS
} from "../actions/friendActions";

const initialState = {
  me: {
    Friend: {},
    Posts: []
  },
  friends: [],
  allPosts: [],
  foundFriends: [],
  mainSearch: "",
  friendsfilter: ""

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
        me: { ...state.me, Posts: action.payload },
        allPosts: [...action.payload]
      };

    case GET_FRIENDS_POSTS:
      return {
        ...state,
        friends: action.payload,
        allPosts: [
          ...state.me.Posts,
          ...[].concat(
            ...action.payload
              .filter(item => item.Friend.Show)
              .map(item => item.Posts)
          )
        ]
      };

    case ADD_POST:
      return {
        ...state,
        me: { ...state.me, Posts: [action.payload, ...state.me.Posts] },
        allPosts: [...state.allPosts, action.payload]
      };

    case EDIT_POST:
      return {
        ...state,
        me: {
          ...state.me,
          Posts: state.me.Posts.map(post =>
            post.Id === action.payload.Id ? action.payload : post
          )
        },
        allPosts: state.allPosts.map(post =>
          post.Id === action.payload.Id ? action.payload : post
        )
      };

    case DELETE_POST:
      return {
        ...state,
        me: {
          ...state.me,
          Posts: state.me.Posts.filter(post => post.Id !== action.payload)
        },
        allPosts: state.allPosts.filter(post => post.Id !== action.payload)
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
        ),
        allPosts: state.allPosts.filter(post => post.UserId !== action.payload)
      };

   
    
    case SHOW_POST:
      return {
        ...state,
        friends: state.friends.map(Friend => Friend.Id === action.payload ? {...Friend, Show:true} : Friend)
      };

    case HIDE_POST:
      return {
        ...state,
        friends: state.friends.map(Friend => Friend.Id === action.payload ? {...Friend, Show:false} : Friend)
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
