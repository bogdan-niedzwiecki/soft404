export const GET_FRIENDS = "GET_FRIENDS";

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
