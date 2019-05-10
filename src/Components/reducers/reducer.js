import { ADD_POST, DELETE_POST } from "../actions/postActions";
import { DELETE_USER} from "../actions/userActions";
const reducer = (state = { usertoken: null, posts: [] }, action) => {
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

    case DELETE_USER:
      return {
        state: null
      }; 

    default:
      return state;
  }
};
export default reducer;
