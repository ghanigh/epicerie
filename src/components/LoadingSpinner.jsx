import React from 'react';
import { useStores } from '../contexts/StoresContext';

function LoadingSpinner() {
  const { isLoading } = useStores();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-xl">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;