import { uploadNewVideo } from "@/app/api/appwrite";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { icons } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getUserId } from "@/lib/utils";
import { UploadProps } from "@/types/constants";
import { AppTheme } from "@/types/theme";
import * as ImagePicker from "expo-image-picker";

import { router } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<UploadProps>({
    title: "",
    videoUrl: null,
    thumbnail: null,
    prompt: "",
  });

  // video player setup

  const player = useVideoPlayer(form.videoUrl?.uri as string, (player) => {});

  // picker of video and image thumbnail
  const openPicker = async (selectType: string) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [selectType === "image" ? "images" : "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setForm({ ...form, videoUrl: result.assets[0] });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked ", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  // submit and publish
  const submit = async () => {
    if (!form.title || !form.prompt || !form.videoUrl || !form.thumbnail) {
      Alert.alert("Error", "Please fill all the fields");
    }
    setUploading(true);
    try {
      await uploadNewVideo(form, getUserId(user));

      Alert.alert("Success", "Video uploaded successfully");
      router.push("/home");
    } catch (error) {
      console.error(
        "Error while uploading video:",
        error instanceof Error && error.message
      );
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className={AppTheme.wrapperStyle}>
      <ScrollView className={AppTheme.containerStyle}>
        <Text className="text-[#eb8f1f] text-2xl font-psemibold my-2 text-center ">
          Upload New Video
        </Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catch title... "
          onChangeText={(value) => setForm({ ...form, title: value })}
          otherStyle="mt-10"
        />
        <View className="mt-7 gap-y-2  ">
          <Text className="text-gray-100 text-base font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.videoUrl ? (
              <VideoView
                style={{
                  width: "100%",
                  height: 275,
                  backgroundColor: "#1E1E2D",
                  borderRadius: 16,
                  paddingHorizontal: 16,
                }}
                className=" bg-black-100 "
                player={player}
                contentFit="contain"
              />
            ) : (
              <View className=" w-full h-40 px-4 bg-black-100 rounded-2xl  justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center ">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 gap-y-2 ">
          <Text className="text-gray-100 text-base font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{
                  uri: form.thumbnail.uri,
                }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className=" w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center flex-row gap-x-2  border-2 border-black-200">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View>
          <FormField
            title="AI Prompt"
            value={form.prompt}
            placeholder="The prompt you used to create this video ... "
            onChangeText={(value) => setForm({ ...form, prompt: value })}
            otherStyle="mt-7"
          />
        </View>
        <View>
          <CustomButton
            title="Submit and Publish"
            handlePress={submit}
            containerStyle="mt-7"
            isLoading={uploading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({});
