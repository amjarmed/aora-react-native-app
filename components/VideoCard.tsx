import DropPaper from "@/components/DropPaper";
import VideoPlayerApp from "@/components/VideoPlayerApp";
import { icons } from "@/constants";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
interface VideoCardProps {
  video: Post;
}
const videoSource = "https://youtu.be/DwbwuYYiBTk?si=4y4fHJclQHbDf5it";
const VideoCard = ({
  video: { title, users, thumbnail, video, $id },
}: VideoCardProps) => {
  const [play, setPlay] = useState(false);

  const handlePress = (id: string) => {
    setPlay(id === $id ? true : false);
  };

  return (
    <View className="flex-col items-center px-4 mb-14 relative">
      <View className="flex-row gap-3 items-start ">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{
                uri: users?.avatar,
              }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white  font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-gray-100  font-pregular text-xs"
              numberOfLines={1}
            >
              {users?.username}
            </Text>
          </View>
        </View>
        <View>
          <DropPaper documentId={$id} />
        </View>
      </View>

      {/* video */}
      {play ? (
        <View>
          <VideoPlayerApp
            videoUrl={videoSource}
            playerStyle="w-full h-60 rounded-xl mt-3 "
          />
        </View>
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => handlePress($id)}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
