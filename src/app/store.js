import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";
//this is the gloabl store.
export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});
