import { getUser } from "@/app/api/appwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AppState, AppStateStatus } from "react-native";
import { Models } from "react-native-appwrite";

// Define the context interface
interface GlobalContextType {
  user: Models.Document | undefined;
  setUser: (user: Models.Document | undefined) => void;
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  isLoading: boolean;
}

// Create the context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Custom hook to consume the GlobalContext
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

// GlobalProvider Props
interface GlobalProviderProps {
  children: ReactNode;
}

// GlobalProvider Component
export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<Models.Document | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const USER_STORAGE_KEY = "user";

  // Save user to AsyncStorage
  const saveUserToStorage = async (user: Models.Document | undefined) => {
    setIsLoading(true);
    try {
      if (user) {
        const saveUser = await AsyncStorage.setItem(
          USER_STORAGE_KEY,
          JSON.stringify(user)
        );

        console.log("save user to storage");
      } else {
        const removeUser = await AsyncStorage.removeItem(USER_STORAGE_KEY);

        console.log("remove user from storage");
      }
    } catch (error) {
      console.error("Error saving user to storage:", error);
    }
  };

  // Load user from AsyncStorage
  const loadUserFromStorage = async () => {
    try {
      const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (userData) {
        const parsedUser = JSON.parse(userData) as Models.Document;
        console.log("load user from storage");

        setUser(parsedUser);
        setLoggedIn(true);
      }
    } catch (error) {
      console.error("Error loading user from storage:", error);
    }
  };

  // Fetch user info
  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const res = await getUser();
      if (res) {
        console.log("fetched user info");
        setLoggedIn(true);
        setUser(res);
        saveUserToStorage(res); // Save fetched user to storage
      } else {
        setLoggedIn(false);
        setUser(undefined);
        saveUserToStorage(undefined); // Clear storage
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // React to app lifecycle changes
  useEffect(() => {
    loadUserFromStorage(); // Load user from storage on app start
    fetchUser(); // Fetch user info

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === "active") {
        fetchUser(); // Refresh user state when the app comes to the foreground
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => subscription.remove();
  }, []);

  const value: GlobalContextType = {
    isLoggedIn,
    user,
    isLoading,
    setLoggedIn,
    setUser,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
