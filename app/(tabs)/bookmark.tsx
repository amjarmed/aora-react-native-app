import { getUserBookmarks } from "@/app/api/appwrite";
import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";
import useAppwrite from "@/lib/useAppwrite";
import { getUserId } from "@/lib/utils";
import { AppTheme } from "@/types/theme";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Bookmark = () => {
  const { user } = useGlobalContext();
  const { data: videos, refetch } = useAppwrite(() =>
    getUserBookmarks(getUserId(user))
  );

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
            <VideoCard video={item as unknown as Post} />
          )}
          ListHeaderComponent={() => (
            <View className="my-6 px-4 gap-y-6  ">
              <View className="justify-between items-start mb-6">
                <View>
                  <Text className="text-2xl font-psemibold text-white">
                    Saved Videos
                  </Text>
                </View>
              </View>
              <View>
                <SearchInput />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Bookmark videos found"
              subTitle="You have not saved any videos yet"
              buttonTitle="Browse videos"
              buttonHref="../(tabs)/home"
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeAreaView>

      <StatusBar style="light" backgroundColor={AppTheme.primary} />
    </>
  );
};

export default Bookmark;
