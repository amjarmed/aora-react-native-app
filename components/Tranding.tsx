import { icons } from "@/constants";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";

import * as Animatable from "react-native-animatable";

const zoomIn = {
  0: {
    scale: 0.9,
  },

  1: {
    scale: 1,
  },
};
const zoomOut = {
  0: {
    scale: 1,
  },

  1: {
    scale: 0.9,
  },
};
interface TrendingItemProps {
  item: any[];
  activeItem: any[];
}
const TrendingItem = ({ item }: TrendingItemProps) => {
  const [play, setPlay] = useState(false);
  const [activeItem, setActiveItem] = useState(item[1]);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Text>playing</Text>
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 rounded-full absolute "
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};
interface VideosList {
  videos: any[];
}
const Tranding = ({ videos }: VideosList) => {
  const [activeItem, setActiveItem] = useState([videos[0]]);

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      horizontal
    />
  );
};

export default Tranding;
