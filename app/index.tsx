import { verifyInstallation } from "nativewind";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
// Import your global CSS file
import { images } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import "../styles/global.css";
const App = () => {
  // Ensure to call inside a component, not globally
  verifyInstallation();
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with{"  "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="max-w-[136px]  h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
