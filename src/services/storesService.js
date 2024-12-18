// Simulation de données d'épiceries
const mockStores = [
  {
    id: '1',
    name: 'Super Épicerie Bio',
    address: '123 Rue de Paris',
    latitude: 48.8566,
    longitude: 2.3522,
    openingHours: { open: '08:00', close: '20:00' }
  },
  {
    id: '2',
    name: 'Marché Frais',
    address: '456 Avenue des Champs',
    latitude: 48.8584,
    longitude: 2.3536,
    openingHours: { open: '07:00', close: '22:00' }
  }
];

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function isCurrentlyOpen(openTime, closeTime) {
  const now = new Date();
  const [openHour, openMinute] = openTime.split(':').map(Number);
  const [closeHour, closeMinute] = closeTime.split(':').map(Number);
  
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  const currentTotal = currentHour * 60 + currentMinute;
  const openTotal = openHour * 60 + openMinute;
  const closeTotal = closeHour * 60 + closeMinute;
  
  return currentTotal >= openTotal && currentTotal <= closeTotal;
}

export async function fetchNearbyStores(userLat, userLon, radius = 10) {
  // Simulation d'un appel API
  return new Promise((resolve) => {
    setTimeout(() => {
      const stores = mockStores
        .map(store => ({
          ...store,
          distance: calculateDistance(userLat, userLon, store.latitude, store.longitude),
          isOpen: isCurrentlyOpen(store.openingHours.open, store.openingHours.close)
        }))
        .filter(store => store.distance <= radius)
        .sort((a, b) => a.distance - b.distance);
      
      resolve(stores);
    }, 1000);
  });
}