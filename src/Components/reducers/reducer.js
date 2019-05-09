import { ADD_POST, DELETE_POST } from "../actions/postActions";
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

    default:
      return state;
  }
};
export default reducer;
