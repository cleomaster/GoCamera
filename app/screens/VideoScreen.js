import * as React from "react";
import { View, StyleSheet, Button, Dimensions, Text, TouchableOpacity, Alert } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as MediaLibrary from 'expo-media-library';

export default function VideoScreen({ route }) {
  const { videoURI } = route.params;
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  async function saveToGallery() {
    try {
      await MediaLibrary.saveToLibraryAsync(videoURI);
      Alert.alert("Saved to gallery.");
    } catch(ex) {
      console.log(ex);
    }
  }

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: videoURI,
        }}
        useNativeControls
        resizeMode="cover"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      >
      </Video>
      
      <TouchableOpacity onPress={saveToGallery}>
      <View style={{alignItems: "center", justifyContent: "center", height: 50, backgroundColor: "aqua"}}>
      <Text style={{fontWeight: "bold", color: "purple"}}>SAVE VIDEO</Text>
      </View>
      </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    flex: 1,
    flexDirection: "row"
  },
});
