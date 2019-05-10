export const DELETE_USER = "DELETE_USER";

export const deleteUser = () => ({
    type: DELETE_USER
   
  });

export const deleteUserFromApi = usertoken => dispatch =>{
      fetch(`https://delfinkitrainingapi.azurewebsites.net/api/user`, {
        method: "DELETE",
        headers: {
          "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
        }
      })
      return dispatch(deleteUser());
  };