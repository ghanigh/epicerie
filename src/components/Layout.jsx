import React from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import { useStores } from '../contexts/StoresContext';

export default function Layout({ children }) {
  const { refreshStores, isLoading } = useStores();

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-green-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Épicerie Finder</h1>
          <button
            onClick={refreshStores}
            disabled={isLoading}
            className="p-2 hover:bg-green-700 rounded-full transition-colors disabled:opacity-50"
          >
            <FiRefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}