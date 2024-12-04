import { setUserBookmarks } from "@/app/api/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getUserId } from "@/lib/utils";
import React, { useState } from "react";
import { View } from "react-native";
import { IconButton, Menu } from "react-native-paper";

interface DropPaperProps {
  documentId: string;
}
export default function DropPaper({ documentId }: DropPaperProps) {
  const { user } = useGlobalContext();

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleTitlePress = async (title: string) => {
    switch (title) {
      case "saveWatch":
        try {
          await setUserBookmarks(documentId, getUserId(user));
        } catch (error) {
          console.log("Error saving bookmarks:", error);
        }
        break;
      case "savePlaylist":
        console.log("Save to Playlist");
        break;
      case "download":
        console.log("Download Video");
        break;
      case "share":
        console.log("Share");
        break;
      default:
        break;
    }
  };
  return (
    <View className="flex-1 justify-center items-center bg-primary ">
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton icon="dots-vertical" size={24} onPress={openMenu} />
        }
      >
        <Menu.Item
          onPress={() => handleTitlePress("saveWatch")}
          title="Save to Watch Later"
        />
        <Menu.Item
          onPress={() => handleTitlePress("savePlaylist")}
          title="Save to Playlist"
        />
        <Menu.Item
          onPress={() => handleTitlePress("download")}
          title="Download Video"
        />
        <Menu.Item onPress={() => handleTitlePress("share")} title="Share" />
      </Menu>
    </View>
  );
}
