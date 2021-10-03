import { CREATE_NEW_POST, CLOSE_CREATE_NEW_POST } from "./postsReducer.types";

export const openCreateNewPost = (payload) => {
    return {
        type: CREATE_NEW_POST,
        payload: payload,
    };
};

export const closeCreateNewPost = (payload) => {
    return {
        type: CLOSE_CREATE_NEW_POST,
        payload: payload,
    };
};