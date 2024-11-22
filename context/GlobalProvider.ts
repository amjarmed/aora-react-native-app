import React, { createContext, useContext, useState } from "react";

// Define the global state interface
interface GlobalState {
  user?: string;
  isAuthenticated: boolean;
  setUser: (user: string) => void;
}

// Create context with default undefined
const GlobalContext = createContext<GlobalState | undefined>(undefined);

// Custom hook for consuming the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

// GlobalProvider implementation
interface GlobalProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | undefined>();

  const value: GlobalState = {
    user,
    isAuthenticated: !!user,
    setUser,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
