import { combineReducers, configureStore } from "@reduxjs/toolkit";
import basketReducer from '../slices/basketSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import toastMessageReducer from "../slices/toastMessageSlice";

const rootReducer = combineReducers({
  basket: basketReducer,
  toastMessage: toastMessageReducer
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['toastMessage'], // Exclude toastMessage from persistence
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store);
