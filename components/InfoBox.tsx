import React from "react";
import { Text, View } from "react-native";

interface InfoBoxProps {
  title: string | number | any;
  subTitle?: string;
  containerStyle: string;
  titleStyle: string;
}
const InfoBox = ({
  title,
  subTitle,
  containerStyle,
  titleStyle,
}: InfoBoxProps) => {
  return (
    <View className={` ${containerStyle}`}>
      <Text className={` text-white text-center font-semibold ${titleStyle}`}>
        {title}
      </Text>
      {subTitle && (
        <Text className="text-sm text-gray-100  text-center font-pregular">
          {subTitle}
        </Text>
      )}
    </View>
  );
};

export default InfoBox;
