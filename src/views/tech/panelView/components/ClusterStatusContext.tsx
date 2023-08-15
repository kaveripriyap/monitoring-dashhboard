// ClusterStatusContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';

type ClusterStatusContextType = {
  clusterStatusMapping: Record<string, string>;
  updateClusterStatusMapping: (newMapping: Record<string, string>) => void;
};

const ClusterStatusContext = createContext<ClusterStatusContextType | undefined>(undefined);

export const useClusterStatus = () => {
  const context = useContext(ClusterStatusContext);
  if (!context) {
    throw new Error('useClusterStatus must be used within a ClusterStatusProvider');
  }
  return context;
};

type ClusterStatusProviderProps = {
  children: React.ReactNode;
};

export const ClusterStatusProvider: React.FC<ClusterStatusProviderProps> = ({ children }) => {
    const [clusterStatusMapping, setClusterStatusMapping] = useState<Record<string, string>>({});

  // You might want to fetch and update the cluster status mapping here
  // For example, fetch data and setClusterStatusMapping in useEffect

  useEffect(() => {
    // Fetch your data and update the cluster status mapping here
  }, []);

  const updateClusterStatusMapping = (newMapping: Record<string, string>) => {
    setClusterStatusMapping(newMapping);
  };

  const contextValue: ClusterStatusContextType = {
    clusterStatusMapping,
    updateClusterStatusMapping,
  };

  return (
    <ClusterStatusContext.Provider value={contextValue}>
      {children}
    </ClusterStatusContext.Provider>
  );
};
