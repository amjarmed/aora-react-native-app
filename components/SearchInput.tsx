import { icons } from "@/constants";
import { FormFieldProps } from "@/types/constants";
import { ThemeColors } from "@/types/theme";
import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

const SearchInput = ({
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
    <View
      className={`w-full h-16 px-4 mt-4 bg-black-100 rounded-2xl border-2 border-black-200  flex flex-row items-center space-x-4 ${inputStyle}  `}
    >
      <TextInput
        className="text-base mt-1.5 text-white flex-1 font-pregular"
        placeholder={placeholder}
        placeholderTextColor="#7B7B8B"
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={title === "Password" && !showPassword}
        clearButtonMode="while-editing"
        clearTextOnFocus={true}
        cursorColor={ThemeColors.secondary}
        {...props}
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
