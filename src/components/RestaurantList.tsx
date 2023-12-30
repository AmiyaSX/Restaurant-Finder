// src/components/RestaurantList.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchNearbyRestaurants } from '../redux/actions';

const RestaurantList: React.FC = () => {
  const dispatch = useDispatch();
  const { restaurants } = useSelector((state: RootState) => state.places);

  useEffect(() => {
    // Replace with actual coordinates
    dispatch(fetchNearbyRestaurants(37.7749, -122.4194) as any);
  }, [dispatch]);

  return (
    <div>
      <h2>Nearby Restaurants</h2>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.place_id}>
            {restaurant.name} - {restaurant.vicinity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
