import { createSlice } from "@reduxjs/toolkit";
import Login from "../components/Login";

export const userSlice = createSlice ({
    name:"user",
    initialState:{
        user:{
            name:null,
            email:null,
            password:null
        }
    }, 
    reducers :{
        loginU: (state,action) =>{
            state.user = action.payload;
        },
    }
})

export const {loginU} = userSlice.actions;

export const selectUser =  (state) => state.user.user;

export default userSlice.reducer;