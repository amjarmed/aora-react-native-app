import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Models } from "react-native-appwrite";

const useAppwrite = (fn: () => Promise<Models.Document[]>) => {
  const [data, setData] = useState<Models.Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fn();
      setData(response);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error ", error.message);
      } else {
        Alert.alert("Error ", "Something went wrong");
      }
    } finally {
      // fetch data from an API or any other source
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppwrite;
