import React from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import DefaultImage from "../assets/image.jpg";

interface MapProps {
  userLocation: { latitude: number; longitude: number };
  restaurants: {
    id: string;
    name: string;
    vicinity: string;
    distance: number;
    geometry: { location: { lat: number; lng: number } };
    photoUrl: string | null;
  }[];
  selectedRestaurantId: string | null; // Track the selected restaurant ID
  onSelectRestaurant: (restaurantId: string | null) => void; // Callback to handle restaurant selection
}

const Map: React.FC<MapProps> = ({ userLocation, restaurants, selectedRestaurantId, onSelectRestaurant }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: userLocation.latitude,
    lng: userLocation.longitude,
  };

  const options = {
    disableDefaultUI: true, // Disable default UI for simplicity
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={15}
      options={options}
    >
      {restaurants.map((restaurant) => (
        <Marker
          key={restaurant.id}
          position={{
            lat: restaurant.geometry.location.lat,
            lng: restaurant.geometry.location.lng,
          }}
          onClick={() => onSelectRestaurant(restaurant.id)} // Handle marker click
        >
          {selectedRestaurantId === restaurant.id && ( // Show InfoWindow for the selected restaurant
            <InfoWindow>
              <div>
                <img
                  src={restaurant.photoUrl ?? DefaultImage}
                  alt={restaurant.name}
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
                <h3>{restaurant.name}</h3>
                <p>{restaurant.vicinity}</p>
                <p>Distance: {restaurant.distance.toFixed(2)} km</p>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  );
};

export default Map;
