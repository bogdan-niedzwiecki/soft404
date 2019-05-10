export const GET_POSTS = "GET_POSTS";

export function getPosts(posts) {
  return {
    type: GET_POSTS,
    payload: posts.sort((a, b) => (a.PublishDate > b.PublishDate ? -1 : 1))
  };
}

export function getPostsMiddleware(url, token) {
  return dispatch => {
    fetch(url, {
      method: "GET",
      headers: {
        "X-ZUMO-AUTH": token
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response;
      })
      .then(response => response.json())
      .then(r => dispatch(getPosts(r)));
  };
}
