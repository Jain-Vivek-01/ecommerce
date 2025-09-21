import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name:"wishlist",
    initialState:{
        wishlistItems: [],
        isWishlisted:false,
    },
    reducers: {
        addToWishlist: (state,action)=>{
            const isExisted = state.wishlistItems?.find((items)=> items.id==action.payload.id)
             if(isExisted){return;}
           state.wishlistItems.push(action.payload);
           state.isWishlisted= true;
        },

        removeFromWishlist:(state,action)=>{
          state.wishlistItems=  state.wishlistItems.filter(items=> items.id!= action.payload)
          state.isWishlisted= false;
        },

       
    }
})

export const {addToWishlist,removeFromWishlist}= wishlistSlice.actions;
export default  wishlistSlice.reducer;