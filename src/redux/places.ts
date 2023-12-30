// src/redux/places.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlacesState {
  restaurants: any[]; // Define the structure based on the API response
}

const initialState: PlacesState = {
  restaurants: [],
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setRestaurants(state, action: PayloadAction<any[]>) {
      state.restaurants = action.payload;

    },
  },
});

export const { setRestaurants } = placesSlice.actions;
export default placesSlice.reducer;
