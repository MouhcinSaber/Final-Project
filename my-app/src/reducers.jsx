import { combineReducers } from "redux";
import userReducer from "./features/userSlice";

const initialState = {
    user: null, 
    token: 

};

const rootReducer = combineReducers({
    login: (state = {}, action) => state,
    logout: (state = {}, action) => state,
});

export default rootReducer;
