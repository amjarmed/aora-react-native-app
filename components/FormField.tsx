import { icons } from "@/constants";
import { FormFieldProps } from "@/types/constants";
import { AppTheme } from "@/types/theme";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const FormField = ({
  title,
  placeholder,
  value,
  onChangeText,
  otherStyle,
  keyboardType,
  inputStyle,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`${otherStyle} my-4 `}>
      <Text className="text-base px-4 text-gray-100 font-pmedium">{title}</Text>

      <View
        className={`w-full h-16 px-4 mt-4 bg-black-100 rounded-2xl border-2 border-black-200  flex flex-row items-center ${inputStyle}`}
      >
        <TextInput
          className={`flex-1  text-white font-psemibold text-base `}
          //   value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={title === "Password" && !showPassword}
          clearButtonMode="while-editing"
          clearTextOnFocus={true}
          cursorColor={AppTheme.secondary}
          {...props}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
