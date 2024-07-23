import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    data:[],
}

const productsSlice = createSlice({
    name : 'products',
    initialState,
    reducers: {
        fetchProducts (state, action){
           return{ data: action.payload }
        }
    }
});

export const {fetchProducts} = productsSlice.actions;
export default productsSlice.reducer;