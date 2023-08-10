// GlobalSnoozeContext.tsx

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

type ServerNode = {
  name: string;
  type: 'MC' | 'AppD';
  aaCode: string;
  error: string;
  time: string;
  status: 'Error' | 'Warning' | 'Working';
  link: string;
  snoozeTime?: number;
};

type GlobalSnoozeContextType = {
  globalSnoozedItems: ServerNode[];
  globalSnoozedItemsUpdated: boolean;
  addGlobalSnooze: (snoozedNode: ServerNode) => void;
  removeGlobalSnooze: (snoozedNode: ServerNode) => void;
  updateGlobalSnoozedItems: (updatedItems: ServerNode[]) => void;
};

const GlobalSnoozeContext = createContext<GlobalSnoozeContextType | undefined>(undefined);

export const useGlobalSnooze = () => {
  const context = useContext(GlobalSnoozeContext);
  if (!context) {
    throw new Error('useGlobalSnooze must be used within a GlobalSnoozeProvider');
  }
  return context;
};

type GlobalSnoozeProviderProps = {
  children: React.ReactNode;
};

export const GlobalSnoozeProvider: React.FC<GlobalSnoozeProviderProps> = ({ children }) => {
  const [globalSnoozedItems, setGlobalSnoozedItems] = useState<ServerNode[]>([]);
  const [globalSnoozedItemsUpdated, setGlobalSnoozedItemsUpdated] = useState(false);

  const addGlobalSnooze = (snoozedNode: ServerNode) => {
    setGlobalSnoozedItems((prevSnoozedItems) => [...prevSnoozedItems, snoozedNode]);
    setGlobalSnoozedItemsUpdated(!globalSnoozedItemsUpdated);
  };

  const removeGlobalSnooze = (snoozedNode: ServerNode) => {
    setGlobalSnoozedItems((prevSnoozedItems) =>
      prevSnoozedItems.filter((item) => item !== snoozedNode)
    );
    setGlobalSnoozedItemsUpdated(!globalSnoozedItemsUpdated);
  };

  const updateGlobalSnoozedItems = useCallback((updatedItems: ServerNode[]) => {
    setGlobalSnoozedItems(updatedItems);
  }, []);

  const removeExpiredSnoozes = () => {
    const currentTime = Date.now();
    const updatedSnoozedItems = globalSnoozedItems.filter(item => !item.snoozeTime || item.snoozeTime > currentTime);
    setGlobalSnoozedItems(updatedSnoozedItems);
  };

  // Set up an interval to periodically remove expired snoozes
  useEffect(() => {
    const interval = setInterval(removeExpiredSnoozes, 1000); // Check every second
    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, [globalSnoozedItems]);

  const contextValue: GlobalSnoozeContextType = {
    globalSnoozedItems,
    globalSnoozedItemsUpdated,
    addGlobalSnooze,
    removeGlobalSnooze,
    updateGlobalSnoozedItems,
  };

  return (
    <GlobalSnoozeContext.Provider value={contextValue}>
      {children}
    </GlobalSnoozeContext.Provider>
  );
};
