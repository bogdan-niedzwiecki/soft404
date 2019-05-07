import { UPDATE_USER, REMOVE_USER } from "../actions/userActions";
import { ADD_POST, DELETE_POST, EDIT_POST } from "../actions/postActions";
const reducer = (state = { authToken: null, posts: [] }, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload.post, ...state.posts]
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(
          onePost => onePost.Id !== action.payload.postToDel.Id
        )
      };
    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map(onePost =>
          onePost.Id === action.payload.editedPost.Id
            ? action.payload.editedPost
            : onePost
        )
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload.user
      };
    case REMOVE_USER:
      return {
        state: null
      };
    default:
      return state;
  }
};
export default reducer;
