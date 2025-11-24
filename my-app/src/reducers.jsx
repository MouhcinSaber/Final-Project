import { combineReducers } from "redux";
import userReducer from "./features/userSlice";

const initialState = {
    user: null, 
    token: null
};

const rootReducer = combineReducers({
    user: userReducer
});

export default rootReducer;
