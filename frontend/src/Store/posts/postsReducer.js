import { CREATE_NEW_POST, CLOSE_CREATE_NEW_POST } from "./postsReducer.types";

const INITIAL_STATE = {
    isCreateNewPostOpen: false
};

function postsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CREATE_NEW_POST:
            return {
                ...state,
               isCreateNewPostOpen: action.payload
            };
        case CLOSE_CREATE_NEW_POST:
            return INITIAL_STATE;
        default:
            return INITIAL_STATE;
    }
}

export default postsReducer;