import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { ExternalPathString, RelativePathString, router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface EmptyStateProps {
  title: string;
  subTitle: string;
  buttonTitle: string;
  buttonHref: RelativePathString | ExternalPathString;
}
const EmptyState = ({
  title,
  subTitle,
  buttonTitle,
  buttonHref,
}: EmptyStateProps) => {
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
        title={buttonTitle}
        containerStyle=" w-full my-5"
        handlePress={() => router.push(buttonHref)}
      />
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({});
