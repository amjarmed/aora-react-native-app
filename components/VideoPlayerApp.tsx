import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import React from "react";
import { View } from "react-native";

interface VideoPlayerProps {
  videoUrl: string;
  playerStyle: string;
}
function VideoPlayerApp({ videoUrl, playerStyle }: VideoPlayerProps) {
  // video setting
  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
    player.play();
    player.status;
  });

  // listen to event
  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View className="">
      <VideoView
        style={{ width: "100%", height: "100%" }}
        className={` ${playerStyle}`}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        allowsVideoFrameAnalysis
        contentFit="contain"
        nativeControls={true}
      />
    </View>
  );
}

export default VideoPlayerApp;
