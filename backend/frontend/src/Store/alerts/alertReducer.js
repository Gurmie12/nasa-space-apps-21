import { ADD_ALERT, CLEAR_ALERT } from "./alertReducer.types";

const INITIAL_STATE = {
    showAlert: false,
    alertType: null,
    alertMessage: null,
};

function alertReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_ALERT:
            return {
                ...state,
                showAlert: true,
                alertType: action.payload.alertType,
                alertMessage: action.payload.alertMessage,
            };
        case CLEAR_ALERT:
            return INITIAL_STATE;
        default:
            return INITIAL_STATE;
    }
}

export default alertReducer;