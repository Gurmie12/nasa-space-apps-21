import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import postsReducer from "./posts/postsReducer";
import alertReducer from "./alerts/alertReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    alerts: alertReducer,
    posts: postsReducer
});

export default rootReducer;