import config from "../../config";
import axios from "axios";

export const ON_SIGNUP = "ON_SIGNUP";
export const ON_LOGIN = "ON_LOGIN";

export const signUp = (user) => {
  return async (dispatch) => {
    let url = `${config.basrUrl}api/auth/signup`;
    try {
      const response = await axios.post(url, user);
      dispatch({ type: ON_SIGNUP, user: response.data.user });
      localStorage.setItem("userId", response.data.user._id);

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

export const login = (user) => {
  return async (dispatch) => {
    let url = `${config.basrUrl}api/user/login`;
    try {
      const response = await axios.post(url, user);
      console.log(response);
      // console.log(response)
      dispatch({ type: ON_SIGNUP, user: response.data.user });
      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("accessToken", response.data.token);
      return response.data.user;
    } catch (err) {
      console.log(err.message);
      if (err.message === "Request failed with status code 400") {
        throw new Error("Invalid credentials!");
      } else {
        throw new Error("Some unexpected error occured");
      }
    }
  };
};
