import { Models } from "react-native-appwrite";
import Toast from "react-native-toast-message";
import { z } from "zod";

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

const ShowToast = (
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
export { ShowToast, Toast };

const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must not exceed 20 characters" })
    .optional(),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/\d/, { message: "Password must contain at least one number" }),
});
const logInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});
type UserInput = z.infer<typeof userSchema>;

export { logInSchema, UserInput, userSchema };
