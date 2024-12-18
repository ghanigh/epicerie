import { Application } from '@nativescript/core';
import { Geolocation } from '@nativescript/geolocation';
import { formatDistance, formatTime } from './utils/format.utils';

// Enregistrement des filtres globaux
Application.setResources({
    formatDistance,
    formatTime
});

// Demander la permission de géolocalisation au démarrage
Geolocation.enableLocationRequest();

Application.run({ moduleName: 'app-root' });