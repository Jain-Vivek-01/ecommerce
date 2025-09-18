import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./slice/searchSlice.js"


export const store = configureStore({
    reducer:{
        search:searchSlice,
    }
});