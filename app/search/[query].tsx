import { searchPosts } from "@/app/api/appwrite";
import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import VideoCard from "@/components/VideoCard";
import useAppwrite from "@/lib/useAppwrite";
import { AppTheme } from "@/types/theme";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const { query } = useLocalSearchParams();

  const { data: videos, refetch } = useAppwrite(() =>
    searchPosts(query.toString())
  );

  useEffect(() => {
    refetch();
  }, []);

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
            <View className="my-6 px-4  ">
              <View className="justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Search Result
                  </Text>
                  <Text className="text-2xl font-psemibold text-white">
                    {query}
                  </Text>
                  <View className="flex-row gap-3 items-start">
                    <SearchInput initialQuery={query as string} />
                  </View>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No videos found"
              subTitle="No videos found for the search query"
            />
          )}
        />
      </SafeAreaView>
      <StatusBar style="light" backgroundColor={AppTheme.primary} />
    </>
  );
};

export default Search;
