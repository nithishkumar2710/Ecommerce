import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    productadd(state, action) {
      const { product, count } = action.payload;

      const exist = state.cart.findIndex(item => item.id === product.id);

      let updateCart;
      
      if (exist >= 0) {
        updateCart = state.cart.map((item, index) =>
          index === exist ? { ...item, count: item.count + count } : item
        );
      } else {
        updateCart = [...state.cart, { ...product, count }];
      }
      return {
        ...state,
        cart: updateCart,
      };
    },
    incrementQuantity(state, action) {
      const productId = action.payload;
      const product = state.cart.find(item => item.id === productId);
      if (product) {
        product.count += 1;
      }
      console.log(product.count,"pro");
    },
    decrementQuantity(state, action) {
      const productId = action.payload;
      const product = state.cart.find(item => item.id === productId);
      if (product && product.count > 1) {
        product.count -= 1;
      }
      console.log(product);
    },
    removeItem(state, action) {
      const productId = action.payload;
      state.cart = state.cart.filter(item => item.id !== productId);
    },
  },
});

export const { productadd, incrementQuantity, decrementQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
