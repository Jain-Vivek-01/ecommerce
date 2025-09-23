import { configureStore } from "@reduxjs/toolkit";
import addCardSlice from './slice/addCardSlice.js'
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import wishlistSlice from './slice/wishlistSlice.js'

const rootReducer = combineReducers({
    addToCart: addCardSlice,
    wishlist:wishlistSlice,

})

const persistConfig = {
    key: "root",
    storage,
    whiteList: ["addToCart","wishlist"]
}
const persistededucer = persistReducer(persistConfig,rootReducer);


export const store = configureStore({
    reducer:persistededucer,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false,
    })
});

export const persistor = persistStore(store);
