import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useStores } from '../contexts/StoresContext';
import { MAPS_CONFIG } from '../config/maps.config';

export default function Map({ className }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const { stores, location } = useStores();

  if (!isLoaded) return <div className={`${className} bg-gray-100`}>Chargement de la carte...</div>;

  return (
    <GoogleMap
      zoom={MAPS_CONFIG.defaultZoom}
      center={location || MAPS_CONFIG.defaultLocation}
      mapContainerClassName={className}
    >
      {stores.map(store => (
        <Marker
          key={store.id}
          position={{ lat: store.latitude, lng: store.longitude }}
          title={store.name}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: store.isOpen ? MAPS_CONFIG.markerColors.open : MAPS_CONFIG.markerColors.closed,
            fillOpacity: 1,
            strokeWeight: 1,
            scale: 8
          }}
        />
      ))}
    </GoogleMap>
  );
}