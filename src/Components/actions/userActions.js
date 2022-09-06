import { getFriendsMiddleware } from "./friendActions"

export const ADD_TOKEN_ID = "ADD_TOKEN_ID";
export const ADD_USER = "ADD_USER";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";

export function validateTokenMiddleware(googleResponse) {
  return dispatch => {
    fetch("/.netlify/functions/auth", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        token_id: googleResponse.tokenId
      })
    })
      .then(response => {
        if (!response.ok) { throw Error(response.statusText); }
        return response;
      })
      .then(response => response.json())
      .then(resp => {
        localStorage.setItem("token_id", resp.token_id);
        dispatch(addTokenId({ token_id: resp.token_id }));
      });
  };
}

export function addUserMiddleware() {
  return dispatch => {
    fetch("/.netlify/functions/user", {
      method: "POST",
      headers: { "X-ZUMO-AUTH": localStorage.getItem("token_id") },
    })
      .then(response => {
        if (!response.ok) { localStorage.removeItem("token_id"); window.location.replace("/login"); throw Error(response.statusText); }
        return response;
      })
      .then(response => response.json())
      .then(user => dispatch(addUser(user)))
      .then(() => dispatch(getFriendsMiddleware()));
  };
}

export function addTokenId(payload) {
  return { type: ADD_TOKEN_ID, payload };
}

export function addUser(payload) {
  return { type: ADD_USER, payload };
}

export function editUserMiddleware(formData) {
  return dispatch => {
    fetch("/.netlify/functions/user", {
      method: "PUT",
      headers: { "X-ZUMO-AUTH": localStorage.getItem("token_id") },
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
      headers: { "X-ZUMO-AUTH": localStorage.getItem("token_id") }
    }).then(() => dispatch(deleteUser()));
  };
}

export function deleteUser() {
  return {
    type: DELETE_USER
  };
}
