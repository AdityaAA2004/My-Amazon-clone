import { configureStore } from "@reduxjs/toolkit";
import basketReducer from '../slices/basketSlice'
import storage from 'redux-persist/lib/storage';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  sessionStorage,
}

const persistedReducer = persistReducer(persistConfig, basketReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export const persistor = persistStore(store)
