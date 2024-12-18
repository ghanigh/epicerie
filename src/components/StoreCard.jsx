import React from 'react';
import { formatDistance, formatTime } from '../utils/format';
import { FiClock, FiMapPin } from 'react-icons/fi';

export default function StoreCard({ store }) {
  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{store.name}</h3>
          <div className="flex items-center text-gray-600 mt-1">
            <FiMapPin className="mr-1" />
            <span>{store.address}</span>
          </div>
          <div className="flex items-center mt-2">
            <FiClock className="mr-1" />
            <span className="text-sm text-gray-500">
              {formatTime(store.openingHours.open)} - {formatTime(store.openingHours.close)}
            </span>
            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
              store.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {store.isOpen ? 'Ouvert' : 'Fermé'}
            </span>
          </div>
        </div>
        {store.distance && (
          <span className="text-green-600 font-medium">
            {formatDistance(store.distance)}
          </span>
        )}
      </div>
    </div>
  );
}