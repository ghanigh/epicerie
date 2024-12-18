import { Store } from '../models/store.model';
import { LocationService } from './location.service';

export class StoresService {
    // Simulation de données d'épiceries
    private static mockStores: Store[] = [
        {
            id: '1',
            name: 'Super Épicerie Bio',
            address: '123 Rue de Paris',
            latitude: 48.8566,
            longitude: 2.3522,
            openingHours: { open: '08:00', close: '20:00' },
            isOpen: true
        },
        {
            id: '2',
            name: 'Marché Frais',
            address: '456 Avenue des Champs',
            latitude: 48.8584,
            longitude: 2.3536,
            openingHours: { open: '07:00', close: '22:00' },
            isOpen: true
        }
    ];

    static async getNearbyStores(userLat: number, userLon: number, radius: number = 10): Promise<Store[]> {
        return this.mockStores
            .map(store => ({
                ...store,
                distance: LocationService.calculateDistance(
                    userLat,
                    userLon,
                    store.latitude,
                    store.longitude
                )
            }))
            .filter(store => store.distance <= radius)
            .sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }
}