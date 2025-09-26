import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import cartSlice from "./slice/cart.js";
import wishlistSlice from "./slice/wishlistSlice.js";

const rootReducer = combineReducers({
  cart: cartSlice,
  wishlist: wishlistSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["cart", "wishlist"],
};
const persistededucer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistededucer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
