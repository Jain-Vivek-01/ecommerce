import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCard: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => action.payload.id == item.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        action.payload.quantity = +1;
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => action.payload.id == item.id
      );

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (item) => item.id != existingItem.id
        );
      }
    },
    removeProduct:(state,action)=>{
      state.cartItems= state.cartItems.filter(items=> items.id!= action.payload);
    }
  },
});

export const { addToCard, removeFromCart ,removeProduct} = cartSlice.actions;
export default cartSlice.reducer;
