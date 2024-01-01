import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';
import { Action } from '@reduxjs/toolkit';
import { setRestaurants } from './places';
import key from '../config';

interface Coordinates {
  lat: number;
  lng: number;
}
const BASE_URL = "https://maps.googleapis.com/maps/api/place/";

const calculateDistance = (coords1: Coordinates, coords2: Coordinates): number => {
  // Haversine formula to calculate distance between two coordinates
  const R = 6371; // Earth's radius in km
  const dLat = (coords2.lat - coords1.lat) * (Math.PI / 180);
  const dLon = (coords2.lng - coords1.lng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coords1.lat * (Math.PI / 180)) *
      Math.cos(coords2.lat * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

export const fetchNearbyRestaurants = (lat: number, lng: number):
  ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    try {
      const response = await fetch(
        `${BASE_URL}nearbysearch/json?location=${lat},${lng}&radius=1000&type=restaurant&key=${key}`
      );

      const data = await response.json();
      console.log(data);

      const restaurantsWithDetails = await Promise.all(
        data.results.map(async (restaurant: any) => {
          // Fetch details for each place, including photos
          const placeDetailsResponse = await fetch(
            `${BASE_URL}details/json?place_id=${restaurant.place_id}&fields=name,formatted_address,geometry,photo&key=${key}`
          );
          const placeDetails = await placeDetailsResponse.json();
  
          const photoReference = placeDetails.result.photos?.[0]?.photo_reference;
          const photoUrl = photoReference
            ? `${BASE_URL}photo?maxwidth=400&photoreference=${photoReference}&key=${key}`
            : null;
  
          return {
            id: restaurant.place_id,
            name: restaurant.name,
            vicinity: restaurant.vicinity,
            distance: calculateDistance(
              {lat, lng},
              restaurant.geometry.location
            ),
            geometry: restaurant.geometry,
            photoUrl,
          };
        })
      );
      dispatch(setRestaurants(restaurantsWithDetails));
    } catch (error) {
      console.error('Error fetching nearby restaurants:', error);
    }
  };