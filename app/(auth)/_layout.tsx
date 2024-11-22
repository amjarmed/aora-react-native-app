import { ThemeColors } from "@/types/theme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";

const AuthLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            paddingTop: 40,
          },
        }}
      >
        <Stack.Screen name="singIn" options={{ headerShown: false }} />
        <Stack.Screen name="singUp" options={{ headerShown: false }} />
      </Stack>

      <StatusBar style="light" backgroundColor={ThemeColors.primary} />
    </>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
