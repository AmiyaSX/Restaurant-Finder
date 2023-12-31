// src/components/Map.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


interface MapProps {
  userLocation: { latitude: number; longitude: number };
  restaurants: {
    name: string;
    vicinity: string;
    distance: number;
    geometry: { location: { lat: number; lng: number } };
    photoUrl: string | null;
  }[];
}

const Map: React.FC<MapProps> = ({ userLocation, restaurants }) => {
  return (
    <div>
 
    </div>
    
  );
};

export default Map;
