import { Models } from "react-native-appwrite";
import Toast from "react-native-toast-message";

/**
 * Returns the username from the given user document array.
 * If the user document array is null or empty, returns "name".
 * @param user User document array
 * @returns Username
 */
export const getUserName = (user: Models.Document[] | null): string => {
  return user?.[0]?.username || "name";
};

type ToastType = "success" | "error" | "info";

const showToast = (
  type: ToastType,
  text1: string,
  text2: string,
  visibilityTime: number = 4000,
  position: "top" | "bottom" = "top"
) => {
  Toast.show({
    type,
    text1,
    text2,
    visibilityTime,
    position,
  });
};
export { showToast, Toast };
