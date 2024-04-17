import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import cartReducer from './cart/cartSlice.js';
import historyReducer from './cart/historySlice.js';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import bcrypt from 'bcryptjs'; // Import bcryptjs for hashing

const persistConfig = {
  key: 'root',   //name that we are going to save in the local storage
  version: 1,
  storage,
};

const rootReducer = combineReducers({ 
  user: userReducer,
  cart: cartReducer,
  history: historyReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

// Hash sensitive data before saving to local storage
const originalLocalStorageSetItem = localStorage.setItem;
localStorage.setItem = function (key, value) {
  try {
    const hashedValue = bcrypt.hashSync(value, 10);
    originalLocalStorageSetItem.call(localStorage, key, hashedValue);
  } catch (error) {
    console.error('Error hashing data:', error);
  }
};
