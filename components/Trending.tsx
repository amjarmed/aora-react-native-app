import { icons } from "@/constants";
import React, { memo, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import VideoPlayerApp from "@/components/VideoPlayerApp";
import * as Animatable from "react-native-animatable";
// Props for the `TrendingItem` component
interface TrendingItemProps {
  activeItem: string | undefined;
  item: Post;
}

// Props for the `Trending` component
interface TrendingProps {
  posts: Post[];
}

interface VideosList {
  videos: Post[];
}

// single list Item component
// memo to prevent unnecessary re-renders.
const TrendingItem = memo(({ item, activeItem }: TrendingItemProps) => {
  const [play, setPlay] = useState(false);
  const animation = activeItem === item.$id ? "zoomIn" : "zoomOut";
  return (
    <Animatable.View className="mr-5" animation={animation} duration={500}>
      {play ? (
        <VideoPlayerApp
          videoUrl={item.video}
          playerStyle="w-52 h-72 rounded-[35px] mt-3 bg-white/10  "
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri:
                item.thumbnail ||
                "../assets/images/video_player_placeholder.gif",
            }}
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
});

// trending videos
const Trending = ({ videos }: VideosList) => {
  const [activeItem, setActiveItem] = useState<string | undefined>(
    videos[0]?.$id
  );
  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<{ item: Post }>;
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item.$id); // Use the first visible item's ID
    }
  };
  // Memoized viewability config
  const viewabilityConfig = useMemo(
    () => ({
      itemVisiblePercentThreshold: 51,
    }),
    []
  );
  // Memoized key extractor
  const keyExtractor = useMemo(() => (item: Post) => item.$id, []);

  return (
    <FlatList
      className="mb-10"
      centerContent
      data={videos}
      keyExtractor={keyExtractor}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      horizontal
    />
  );
};

export default Trending;
