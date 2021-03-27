import { ON_SIGNUP } from "../actions/auth";

const initialState = {
    firstName: "",
    lastName: "",
    type: "",
    email: "",
    phone: "",
    credit: 0,
    username: "",
    userId: "",
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ON_SIGNUP:
            return {
                ...state,
                firstName: action.user.firstName,
                lastName: action.user.lastName,
                type: action.user.type,
                email: action.user.email,
                phone: action.user.phoneNumber,
                credit: action.user.credit,
                username: action.user.username,
                userId: action.user._id,
            };
        default:
            return state;
    }
};
