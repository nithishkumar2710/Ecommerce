import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "../features/userSlice";
import productsSlice from "../store/slice/productsSlice"
import addtocartSlice from "../store/slice/addtocartSlice";


export default configureStore ({
    reducer:{
        user: userReducer,
        products: productsSlice,
        cart:addtocartSlice,
    }
})