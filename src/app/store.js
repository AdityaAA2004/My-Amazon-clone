import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";
import sessionReducer from '../slices/sessionSlice'
//this is the gloabl store.
export const store = configureStore({
  reducer: {
    basket: basketReducer,
    session: sessionReducer
  },
});
