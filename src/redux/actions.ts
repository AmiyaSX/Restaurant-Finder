// src/redux/actions.ts
import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';
import { Action } from '@reduxjs/toolkit';
import { setRestaurants } from './places';

// Other imports...
export const fetchNearbyRestaurants = (lat: number, lng: number):
  ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    try {
      // Replace with actual coordinates
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&type=restaurant&key=AIzaSyDWyJN1vYJrAubU_8g1_4ooaStSCmrOhd8`
      );

      const data = await response.json();
      console.log(data);
      dispatch(setRestaurants(data.results));
    } catch (error) {
      console.error('Error fetching nearby restaurants:', error);
    }
  };