import { getAllVideos, getLatestVideos } from "@/app/api/appwrite";
import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import Tranding from "@/components/Tranding";
import VideoCard from "@/components/VideoCard";
import { images } from "@/constants";
import useAppwrite from "@/lib/useAppwrite";
import { ThemeColors } from "@/types/theme";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { data: videos, refetch } = useAppwrite(getAllVideos);
  const { data: latestVideos } = useAppwrite(getLatestVideos);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <>
      {/* todo: not takes the ful height  */}
      <SafeAreaView className="bg-primary  h-full">
        <FlatList
          data={videos}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <VideoCard
              avatar={item.avatar}
              title={item.title}
              username={item.users.username}
              video={item.video}
              thumbnail={item.thumbnail}
            />
          )}
          ListHeaderComponent={() => (
            <View className="my-6 px-4 space-y-6  ">
              <View className="justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Welcome Back
                  </Text>
                  <Text className="text-2xl font-psemibold text-white">
                    John
                  </Text>
                </View>
                <View>
                  <View className="mt-1.5">
                    <Image
                      source={images.logoSmall}
                      className="w-9 h-10"
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </View>
              <View>
                <SearchInput
                  title="Search"
                  placeholder="Search for a video topic"
                  value=""
                  onChangeText={(text) => console.log(text)}
                />
              </View>
              <View className="w-full flex-1 pt-5 pb-8 ">
                <Text className="text-gray-100 text-lg font-pregular">
                  Lates Videos
                </Text>

                <Tranding videos={latestVideos ?? []} />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No videos found"
              subTitle="Be the first one to upload a video"
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeAreaView>

      <StatusBar style="light" backgroundColor={ThemeColors.primary} />
    </>
  );
};

export default Home;
