import config from "../../config";
import axios from "axios";

export const ON_USER_PROFILE = "ON_USER_PROFILE";
// export const ON_LOGIN = "ON_LOGIN";
export const signUp = (user) => {
  return async (dispatch) => {
    let url = `${config.basrUrl}api/user/users/me`;
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.post(url, user, {
        headers: headers,
      });
      dispatch({ type: ON_USER_PROFILE, user: response.data.user });
      return response.data.user;
    } catch (err) {
      console.log(err.message);
      if (err.message === "Request failed with status code 422") {
        throw new Error("Username already in use!");
      } else {
        throw new Error("Some unexpected error occured");
      }
    }
  };
};
