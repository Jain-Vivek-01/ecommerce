import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    cartItems: []
}

const addCardSlice = createSlice({
    name:"addToCart",
    initialState,
    reducers:{
        addCard: (state,action)=>{

            const existingItem = state.cartItems.find(item=> action.payload.id== item.id);


            if(existingItem){
                existingItem.quantity += 1;

            }else{action.payload.quantity = +1;
                state.cartItems.push(action.payload);

                

            }
        },
        removeFromCart:(state,action)=>{
                const existingItem = state.cartItems.find(item=> action.payload.id==item.id);

                if(existingItem && existingItem.quantity>1 ){
                    existingItem.quantity -= 1;
                }else{
           state.cartItems= state.cartItems.filter(item=>item.id!= existingItem.id);


                }


        }
    }
})

export const {addCard,removeFromCart} = addCardSlice.actions;
export default addCardSlice.reducer;