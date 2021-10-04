import { UPDATE_AUTH, REMOVE_AUTH } from "./authReducer.types";

const INITIAL_STATE = {
    isLoggedIn: false,
    username: null,
    refreshToken: null,
    userId: null,
    email: null,
    firstName: null,
    lastName: null,
    jwtToken: null,
    isContributor: null
};

function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_AUTH:
            return {
                ...state,
                isLoggedIn: true,
                username: action.payload.username,
                email: action.payload.email,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                refreshToken: action.payload.refreshToken,
                userId: action.payload.userId,
                jwtToken: action.payload.jwtToken,
                isContributor: action.payload.isContributor
            };
        case REMOVE_AUTH:
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default authReducer;