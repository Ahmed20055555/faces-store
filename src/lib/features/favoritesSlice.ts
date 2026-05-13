import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteItem {
  id: string;
  brand: string;
  name: string;
  price: string;
  image: string;
}

interface FavoritesState {
  items: FavoriteItem[];
  lastAdded: FavoriteItem | null;
  lastAction: 'added' | 'removed' | null;
}

const initialState: FavoritesState = {
  items: [],
  lastAdded: null,
  lastAction: null,
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
        state.lastAdded = action.payload;
        state.lastAction = 'removed';
      } else {
        state.items.push(action.payload);
        state.lastAdded = action.payload;
        state.lastAction = 'added';
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { toggleFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
