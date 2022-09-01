export const FOUND_USER = "FOUND_USER";
export const CLEAR_USER = "CLEAR_USER";
export const GET_FRIENDS = "GET_FRIENDS";
export const SET_ASIDE_SEARCH = "SET_ASIDE_SEARCH";

export function searchUserMiddleware(name) {
  return dispatch => {
    if (name) {
      fetch(`/.netlify/functions/user?friend_name=${name}`, {
        method: "GET",
        headers: { "X-ZUMO-AUTH": localStorage.getItem("access_token") },
      })
        .then(response => {
          if (!response.ok) { throw Error(response.statusText); }
          return response;
        })
        .then(response => response.json())
        .then(r => dispatch(foundUser(r)));
    } else {
      dispatch(foundUser([]));
    }
  };
}

export function foundUser(payload) {
  return { type: FOUND_USER, payload };
}

export function clearUser() {
  return { type: CLEAR_USER };
}

export function getFriendsMiddleware() {
  return dispatch => {
    return fetch("/.netlify/functions/friends",
      {
        method: "GET",
        headers: { "X-ZUMO-AUTH": localStorage.getItem("access_token") }
      }
    )
      .then(response => {
        if (!response.ok) { throw Error(response.statusText); }
        return response;
      })
      .then(response => response.json())
      .then(r => dispatch(getFriends(r)));
  };
}

export function getFriends(payload) {
  return { type: GET_FRIENDS, payload };
}

export const addToFriendsMiddleware = _id => {
  return dispatch => {
    return fetch("/.netlify/functions/friends", {
      method: "POST",
      headers: { "X-ZUMO-AUTH": localStorage.getItem("access_token") },
      body: JSON.stringify({ _id })
    })
      .then(response => {
        if (!response.ok) { throw Error(response.statusText); }
        return response;
      })
      .then(response => response.json())
      .then(() => dispatch(getFriendsMiddleware()));
  };
};

export const removeFromFriendsMiddleware = _id => {
  return dispatch => {
    fetch("/.netlify/functions/friends", {
      method: "DELETE",
      headers: { "X-ZUMO-AUTH": localStorage.getItem("access_token") },
      body: JSON.stringify({ _id })
    })
      .then(response => {
        if (!response.ok) { throw Error(response.statusText); }
        return response;
      })
      .then(response => response.json())
      .then(() => dispatch(getFriendsMiddleware()));
  };
};

export function toggleVisibilityMiddleware(_id, visibility) {
  return dispatch => {
    fetch(
      "/.netlify/functions/friends",
      {
        method: "PUT",
        headers: { "X-ZUMO-AUTH": localStorage.getItem("access_token") },
        body: JSON.stringify({ _id, visibility })
      }
    )
      .then(response => response.json())
      .then(() => dispatch(getFriendsMiddleware()));
  };
}

export function setAsideSearch(payload) {
  return { type: SET_ASIDE_SEARCH, payload }
}
