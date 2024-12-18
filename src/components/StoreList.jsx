import React from 'react';
import { useStores } from '../contexts/StoresContext';
import StoreCard from './StoreCard';

export default function StoreList({ className }) {
  const { stores } = useStores();

  return (
    <div className={`${className} bg-white overflow-y-auto shadow-lg rounded-t-xl`}>
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">
          Épiceries à proximité ({stores.length})
        </h2>
      </div>
      <div className="divide-y divide-gray-200">
        {stores.map(store => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
}