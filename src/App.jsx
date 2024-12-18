import React from 'react';
import { StoresProvider } from './contexts/StoresContext';
import Layout from './components/Layout';
import Map from './components/Map';
import StoreList from './components/StoreList';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  return (
    <StoresProvider>
      <Layout>
        <div className="h-screen flex flex-col">
          <Map className="flex-1" />
          <StoreList className="h-1/3" />
          <LoadingSpinner />
        </div>
      </Layout>
    </StoresProvider>
  );
}

export default App;