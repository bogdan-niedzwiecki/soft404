export const POSTS_FETCH_DATA_SUCCESS = "POSTS_FETCH_DATA_SUCCESS";

export function postsFetchDataSuccess(posts) {
  return {
    type: POSTS_FETCH_DATA_SUCCESS,
    payload: posts.sort((a, b) => (a.PublishDate > b.PublishDate ? -1 : 1))
  };
}

export function postsFetchData(url, token) {
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
      .then(r => dispatch(postsFetchDataSuccess(r)));
  };
}
