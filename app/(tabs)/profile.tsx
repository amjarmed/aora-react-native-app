import { getUserVideos, SignOut } from "@/app/api/appwrite";
import EmptyState from "@/components/EmptyState";
import InfoBox from "@/components/InfoBox";
import VideoCard from "@/components/VideoCard";
import { icons } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import useAppwrite from "@/lib/useAppwrite";
import { getUserName } from "@/lib/utils";
import { AppTheme } from "@/types/theme";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user, setUser, setLoggedIn } = useGlobalContext();

  const id = user != null ? user[0].$id : "";
  const avatar = user != null ? user[0].avatar : "";
  const { data: videos } = useAppwrite(() => getUserVideos(id.toString()));

  const logOut = async () => {
    await SignOut();
    setUser(null);
    setLoggedIn(false);

    router.replace("/(auth)/singIn");
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
            <View className="w-full justify-center items-center mt-6 mb-12 px-4 ">
              <TouchableOpacity
                className="w-full items-end mb-10 "
                onPress={logOut}
              >
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  className="w-6 h-6 "
                />
              </TouchableOpacity>

              <View className="w-16 h-16 border border-secondary  rounded-lg justify-center items-center">
                <Image
                  source={{
                    uri: avatar,
                  }}
                  resizeMode="cover"
                  className="w-[90%] h-[90%] rounded-lg"
                />
              </View>
              <InfoBox
                title={getUserName(user)}
                containerStyle="mt-5"
                titleStyle="text-lg "
              />
              <View className="mt-5 flex-row  \">
                <InfoBox
                  title={videos.length || 0}
                  subTitle="Videos"
                  containerStyle="mr-10   "
                  titleStyle="text-xl flex-grow"
                />
                <InfoBox
                  title="23.5k"
                  subTitle="Followers"
                  containerStyle=""
                  titleStyle="text-xl "
                />
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

export default Profile;
