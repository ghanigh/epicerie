import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import { fetchNearbyStores } from '../services/storesService';
import { MAPS_CONFIG } from '../config/maps.config';

const StoresContext = createContext();

export function StoresProvider({ children }) {
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { location, error: locationError } = useGeolocation();

  useEffect(() => {
    if (location) {
      loadStores();
    }
  }, [location]);

  const loadStores = async () => {
    try {
      setIsLoading(true);
      const data = await fetchNearbyStores(
        location.latitude,
        location.longitude,
        MAPS_CONFIG.maxRadius
      );
      setStores(data);
    } catch (error) {
      console.error('Erreur lors du chargement des épiceries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StoresContext.Provider value={{
      stores,
      isLoading,
      location,
      locationError,
      refreshStores: loadStores
    }}>
      {children}
    </StoresContext.Provider>
  );
}

export const useStores = () => useContext(StoresContext);