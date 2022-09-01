import { getFriendsMiddleware } from "./friendActions"

export const ADD_USER = "ADD_USER";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";

export function validateTokenMiddleware(googleResponse) {
  return dispatch => {
    fetch("/.netlify/functions/auth", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id_token: googleResponse.tokenId
      })
    })
      .then(response => {
        if (!response.ok) { throw Error(response.statusText); }
        return response;
      })
      .then(response => response.json())
      .then(r => {
        localStorage.setItem("access_token", r.authenticationToken);
        dispatch(addUserMiddleware());
      });
  };
}

export function addUserMiddleware() {
  return dispatch => {
    fetch("/.netlify/functions/user", {
      method: "POST",
      headers: { "X-ZUMO-AUTH": localStorage.getItem("access_token") },
    })
      .then(response => {
        if (!response.ok) { localStorage.removeItem("access_token"); throw Error(response.statusText); }
        return response;
      })
      .then(response => response.json())
      .then(user => dispatch(addUser(user)))
      .then(() => dispatch(getFriendsMiddleware()));
  };
}

export function addUser(payload) {
  return { type: ADD_USER, payload };
}

export function editUserMiddleware(formData) {
  return dispatch => {
    fetch("/.netlify/functions/user", {
      method: "PUT",
      headers: { "X-ZUMO-AUTH": localStorage.getItem("access_token") },
      body: formData
    })
      .then(response => {
        if (!response.ok) { throw Error(response.statusText); }
        return response;
      })
      .then(response => response.json())
      .then(updatedUser => dispatch(editUser(updatedUser)));
  };
}

export function editUser(payload) {
  return { type: EDIT_USER, payload };
}

export function deleteUserMiddleware() {
  return dispatch => {
    fetch("/.netlify/functions/user", {
      method: "DELETE",
      headers: { "X-ZUMO-AUTH": localStorage.getItem("access_token") }
    }).then(() => dispatch(deleteUser()));
  };
}

export function deleteUser() {
  return {
    type: DELETE_USER
  };
}
