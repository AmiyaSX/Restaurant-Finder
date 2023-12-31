// src/components/RestaurantList.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchNearbyRestaurants } from '../redux/actions';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DefaultImage from "../assets/image.jpg";
import "../style.css";


const RestaurantList: React.FC = () => {
  const dispatch = useDispatch();
  const { restaurants } = useSelector((state: RootState) => state.places);
  const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });
  useEffect(() => {
    // Replace with actual coordinates
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        const userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        dispatch(fetchNearbyRestaurants(userLocation.latitude, userLocation.longitude) as any);
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, [dispatch]);

  return (
    <div>
      <h2>Nearby Restaurants</h2>
      <div className='gridContainer'>
        {restaurants.slice(0, 10).map((restaurant) => (
          <Card sx={{ maxWidth: 345 }} className='card'>
          <CardHeader
            title={restaurant.name}
            subheader={restaurant.distance.toPrecision(2) + " km" } 
          />
          <CardMedia
            component="img"
            height="194"
            image={restaurant.photoUrl? restaurant.photoUrl : DefaultImage}
            alt="restaurant"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
            {restaurant.vicinity}
            </Typography>
          </CardContent>
        </Card>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
