import { REMOVE_AUTH, UPDATE_AUTH } from "./authReducer.types";

export const logInUser = (payload) => {
    return {
        type: UPDATE_AUTH,
        payload: payload,
    };
};

export const logoutUser = () => {
    return {
        type: REMOVE_AUTH,
    };
};