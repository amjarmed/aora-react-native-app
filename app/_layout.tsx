import { GlobalProvider } from "@/context/GlobalProvider";
import { Toast } from "@/lib/utils";
import { useFonts } from "expo-font";
import {
  SplashScreen,
  Stack,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import React, { useEffect } from "react";
import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import { expo } from "../app.json";

SplashScreen.preventAutoHideAsync();
const RootLayout = () => {
  // setup fonts
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  // routes

  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <PaperProvider>
      <GlobalProvider>
        <Toast />

        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerShown: false,
            contentStyle: { flex: 1 },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="search/[query]"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </GlobalProvider>
    </PaperProvider>
  );
};
AppRegistry.registerComponent(expo.name, () => RootLayout);

export default RootLayout;
