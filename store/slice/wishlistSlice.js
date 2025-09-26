import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const isExisted = state.wishlistItems?.find(
        (items) => items.id == action.payload.id
      );
      if (isExisted) {
        return;
      }
      state.wishlistItems.push(action.payload);
    },

    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (items) => items.id != action.payload
      );
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
