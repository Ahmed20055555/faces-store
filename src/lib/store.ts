import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import favoritesReducer from './features/favoritesSlice';
import productsReducer from './features/productsSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
