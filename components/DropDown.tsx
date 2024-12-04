import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function DropDown() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  return (
    <View className=" ">
      <TouchableOpacity onPress={toggleMenu}>
        <Ionicons name="ellipsis-vertical" size={24} color="white" />
      </TouchableOpacity>

      {menuVisible && (
        <View className="absolute top-10 right-10 bg-white shadow-lg rounded-lg elevation-md px-2 z-50 w-[50%] h-[320px] justify-center items-center">
          <TouchableOpacity
            className="px-3 py-5"
            onPress={() => {
              console.log("Share");
              setMenuVisible(false);
            }}
          >
            <Text className="text-sm">Share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-3 py-5"
            onPress={() => {
              console.log("Send to Friend");
              setMenuVisible(false);
            }}
          >
            <Text className="text-sm">Send to Friend</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-3 py-5"
            onPress={() => {
              console.log("Bookmarks");
              setMenuVisible(false);
            }}
          >
            <Text className="text-sm">Bookmarks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="text-sm"
            onPress={() => {
              console.log("Settings");
              setMenuVisible(false);
            }}
          >
            <Text className="text-sm">Settings</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
