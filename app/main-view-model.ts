import { Observable } from '@nativescript/core';
import { Store } from './models/store.model';
import { LocationService } from './services/location.service';
import { StoresService } from './services/stores.service';
import { MAPS_CONFIG } from './config/maps.config';
import { isCurrentlyOpen } from './utils/format.utils';

export class MainViewModel extends Observable {
    private _stores: Store[] = [];
    private _userLocation = MAPS_CONFIG.defaultLocation;
    private _markers: any[] = [];
    private _isLoading = false;
    private _mapConfig = MAPS_CONFIG;

    constructor() {
        super();
        this.initializeLocation();
    }

    get stores(): Store[] {
        return this._stores;
    }

    get userLocation() {
        return this._userLocation;
    }

    get markers() {
        return this._markers;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    get mapConfig() {
        return this._mapConfig;
    }

    async refreshStores() {
        await this.loadNearbyStores();
    }

    private setLoading(value: boolean) {
        this._isLoading = value;
        this.notifyPropertyChange('isLoading', value);
    }

    private async initializeLocation() {
        try {
            this.setLoading(true);
            const location = await LocationService.getCurrentLocation();
            this._userLocation = location;
            this.notifyPropertyChange('userLocation', location);
            
            await this.loadNearbyStores();
        } catch (error) {
            console.error('Erreur de géolocalisation:', error);
        } finally {
            this.setLoading(false);
        }
    }

    private async loadNearbyStores() {
        try {
            this.setLoading(true);
            const stores = await StoresService.getNearbyStores(
                this._userLocation.latitude,
                this._userLocation.longitude,
                MAPS_CONFIG.maxRadius
            );
            
            // Mise à jour du statut ouvert/fermé
            stores.forEach(store => {
                store.isOpen = isCurrentlyOpen(
                    store.openingHours.open,
                    store.openingHours.close
                );
            });
            
            this._stores = stores;
            this.notifyPropertyChange('stores', stores);
            
            this.updateMapMarkers();
        } catch (error) {
            console.error('Erreur lors du chargement des épiceries:', error);
        } finally {
            this.setLoading(false);
        }
    }

    private updateMapMarkers() {
        this._markers = this._stores.map(store => ({
            position: {
                latitude: store.latitude,
                longitude: store.longitude
            },
            title: store.name,
            snippet: `${store.openingHours.open} - ${store.openingHours.close}`,
            color: store.isOpen ? MAPS_CONFIG.markerColors.open : MAPS_CONFIG.markerColors.closed
        }));
        this.notifyPropertyChange('markers', this._markers);
    }
}