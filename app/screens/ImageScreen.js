import React from "react";
import { View, ImageBackground, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as MediaLibrary from 'expo-media-library';

function ImageScreen({ route, navigation }) {
  const { imageURI } = route.params;
  async function saveToGallery() {
    try {
      await MediaLibrary.saveToLibraryAsync(imageURI);
      Alert.alert("Saved to gallery.");
    } catch(ex) {
      console.log(ex);
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: 35,
        }}
        source={{ uri: imageURI }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("CameraScreen")}>
          <MaterialIcons name="arrow-back" size={50} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={saveToGallery}>
        <MaterialCommunityIcons name="download" size={50} color="white" />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

export default ImageScreen;
