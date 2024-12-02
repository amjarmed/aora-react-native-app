import { icons } from "@/constants";
import { AppTheme } from "@/types/theme";
import { router, usePathname } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, TextInput, TouchableOpacity, View } from "react-native";

interface SearchProps {
  initialQuery?: string;
}
const SearchInput = ({ initialQuery }: SearchProps) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View
      className={`w-full h-16 px-4 mt-4 bg-black-100 rounded-2xl border-2 border-black-200  flex flex-row items-center gap-x-4   `}
    >
      <TextInput
        className="text-base mt-1.5 text-white flex-1 font-pregular"
        placeholder="Search"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
        value={query}
        keyboardType="web-search"
        clearButtonMode="while-editing"
        clearTextOnFocus={true}
        cursorColor={AppTheme.secondary}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing Query",
              "Please input  something to searh results across database"
            );
          }

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
