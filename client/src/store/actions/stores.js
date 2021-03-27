import config from "../../config";
import axios from "axios";

export const SET_STORES = "SET_STORES";

export const getStores = () => {
    return async (dispatch) => {
        // let url = `${config.basrUrl}api/auth/signup`;
        // console.log(user);
        // try {
        //     const response = await axios.post(url, user);
        //     dispatch({ type: ON_SIGNUP, user: response.data.user });
        //     localStorage.setItem("userId", response.data.user._id);
        //     return response.data.user;
        // } catch (err) {
        //     console.log(err.message);
        //     if (err.message === "Request failed with status code 422") {
        //         throw new Error("Username already in use!");
        //     } else {
        //         throw new Error("Some unexpected error occured");
        //     }
        // }
    };
};
