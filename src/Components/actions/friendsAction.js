export const GET_FRIENDS = "GET_FRIENDS";
export const FILTER_FRIENDS = "FILTER_FRIENDS";
export const DELETE_FRIEND = "DELETE_FRIEND";
export const SHOW_POST = "SHOW_POST";
export const HIDE_POST = "HIDE_POST";

export function getFriends(friends) {
  return {
    type: GET_FRIENDS,
    payload: friends
  };
}


export function getFriendsMiddleware() {
  return dispatch => {
    fetch(`https://delfinkitrainingapi.azurewebsites.net/api/friend`, {
      method: "GET",
      headers: {
        "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response;
      })
      .then(response => response.json())
      .then(r => dispatch(getFriends(r)));
  };
}
export function changeShow(id){
  return{
    type: SHOW_POST,
    payload: id
  }
}
export function showingMiddleware(id) {
  return dispatch => {
    fetch(
      `https://delfinkitrainingapi.azurewebsites.net/api/friend/${
      id
      }`,
      {
        method: "PUT",
        headers: {
          "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
        },
        body: JSON.stringify({
          Show:  true
        })
      }
    ).then(response => console.log(response))
      
      .then(r => dispatch(changeShow(id)));
  };
}

export function changeHide(id){
  return{
    type: HIDE_POST,
    payload: id
  }
}
export function hidingMiddleware(id) {
  return dispatch => {
    fetch(
      `https://delfinkitrainingapi.azurewebsites.net/api/friend/${
      id
      }`,
      {
        method: "PUT",
        headers: {
          "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
        },
        body: JSON.stringify({
          Show:  false
        })
      }
    ).then(response => console.log(response))
      
      .then(r => dispatch(changeHide(id)));
  };
}


export function deleteFriend(id) {
  return {
    type: DELETE_FRIEND,
    payload: id
  }
}

export function deleteFriendMiddleware(id){
  return dispatch => {
    fetch(`https://delfinkitrainingapi.azurewebsites.net/api/friend/${id}`, {
      method: "DELETE",
      headers: {
        "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
      }
    }).then(() => dispatch(deleteFriend(id)));
  };
}

export const friendsfilter = text => ({
  type: FILTER_FRIENDS,
  payload: text
});
