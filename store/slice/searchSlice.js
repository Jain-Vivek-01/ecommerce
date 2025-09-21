import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    find:"",
}

    const searchSlice = createSlice({
        name: "search",
        initialState,
        reducers:{
            searchItem: (state,action) =>{
                state.find= action.payload;
            },
            clearItems:(state)=>{
                state.find= "";
            }
        }

    })

    export const {searchItem,clearItems} = searchSlice.actions;
    export default searchSlice.reducer;