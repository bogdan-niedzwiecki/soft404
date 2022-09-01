import {
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  SET_HEADER_SEARCH
} from "../actions/postActions";
import { DELETE_USER, ADD_USER, EDIT_USER } from "../actions/userActions";
import {
  FOUND_USER,
  CLEAR_USER,
  GET_FRIENDS,
  SET_ASIDE_SEARCH
} from "../actions/friendActions";

const initialState = {
  user: {
    family_name: "",
    given_name: "",
    picture: "",
    email: "",
    google_user_data: false,
    posts: [],
    friends: [],
    friends_visible: []
  },
  headerSearch: "",
  foundUser: [],
  asideSearch: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_USER:
      return { ...state, user: { ...action.payload, friends: state.user.friends } };

    case EDIT_USER:
      return { ...state, user: { ...action.payload, friends: state.user.friends } };

    case DELETE_USER:
      return { ...initialState };

    case GET_FRIENDS:
      return { ...state, user: { ...state.user, friends: action.payload } };

    case ADD_POST:
      return { ...state, user: { ...state.user, ...action.payload } };

    case EDIT_POST:
      return { ...state, user: { ...state.user, ...action.payload } };

    case DELETE_POST:
      return { ...state, user: { ...state.user, ...action.payload } };

    case SET_HEADER_SEARCH:
      return { ...state, headerSearch: action.payload };

    case FOUND_USER:
      return { ...state, foundUser: action.payload };

    case CLEAR_USER:
      return { ...state, foundUser: [] };

    case SET_ASIDE_SEARCH:
      return { ...state, asideSearch: action.payload };

    default:
      return state;
  }
};
export default reducer;
