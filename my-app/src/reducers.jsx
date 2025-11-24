import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null, 
    token: localStorage.getItem("token") ||null,
};

const rootReducer = createSlice({
    name:"appReducer",
     initialState,
     reducers:{
  /*  login: (state = {}, action) => state,
    logout: (state = {}, action) => state,*/
     }
});

export default rootReducer;

