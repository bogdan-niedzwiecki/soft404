export const GET_FRIENDS = "GET_FRIENDS";
export const FILTER_FRIENDS = "FILTER_FRIENDS";
export const DELETE_FRIEND = "DELETE_FRIEND";

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

export const deleteFriend = id =>{
  return {
    type: DELETE_FRIEND,
    payload: id
  }
}

export const deleteFriendMiddleware = id =>{
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
