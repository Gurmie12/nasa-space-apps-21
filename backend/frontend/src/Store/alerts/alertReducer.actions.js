import { ADD_ALERT, CLEAR_ALERT } from "./alertReducer.types";

export const addAlert = (payload) => {
    return {
        type: ADD_ALERT,
        payload: payload,
    };
};

export const clearAlert = () => {
    return {
        type: CLEAR_ALERT,
    };
};