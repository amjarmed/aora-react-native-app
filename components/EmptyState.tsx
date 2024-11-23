import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface EmptyStateProps {
  title: string;
  subTitle: string;
}
const EmptyState = ({ title, subTitle }: EmptyStateProps) => {
  return (
    <View className=" justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-gray-100 text-sm font-pmedium">{subTitle}</Text>
      <Text className="text-gray-100 text-xl text-center font-psemibold mt-2">
        {title}
      </Text>

      <CustomButton
        title="upload a video"
        containerStyle=" w-full my-5"
        handlePress={() => router.push("/create")}
      />
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({});
