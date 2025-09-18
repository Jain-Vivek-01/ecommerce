import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    find:""}

    const searchSlice = createSlice({
        name: "search",
        initialState,
        reducers:{
            searchItem: (state,action) =>{
                state.find= action.payload;
            }
        }

    })

    export const {searchItem} = searchSlice.actions;
    export default searchSlice.reducer;