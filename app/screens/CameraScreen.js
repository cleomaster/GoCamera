import { useState, useRef, useEffect } from "react";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View, Vibration } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as MediaLibrary from 'expo-media-library';
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export default function CameraScreen({ route, navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [flashModeClass, setFlashModeClass] = useState("on");
  const [audioPermissions, requestAudioPermission] =
    Camera.useMicrophonePermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [cameraRecordingColor, setCameraRecordingColor] = useState("white");
  const cameraRef = useRef();
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (isFocused && cameraRef.current) {
  //     cameraRef.current.resumePreview();
  //   }
  // }, [isFocused]);

  useEffect(() => {
    async function requestPermissions() {
      await Camera.requestCameraPermissionsAsync();
      await Camera.requestMicrophonePermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
    }
    requestPermissions();
  }, [])

  function toggleCameraType() {
    Vibration.vibrate(200);
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function takePicture() {
    //const camera = new Camera();
    try {
      const data = await cameraRef.current.takePictureAsync();
      cameraRef.current.pausePreview();
      navigation.navigate("ImageScreen", { imageURI: data.uri });
    } catch (ex) {
      console.log(ex);
    }
  }

  async function takeVideo() {
    try {
      setCameraRecordingColor("red");
      setIsRecording(true);
      Vibration.vibrate(200);
      const data = await cameraRef.current.recordAsync();
      navigation.navigate("VideoScreen", { videoURI: data.uri });
      //navigation.navigate("ImageScreen", { imageURI: data.uri });
    } catch (ex) {
      console.log(ex);
    }
  }

  async function stopVideo() {
    try {
      setCameraRecordingColor("white");
      setIsRecording(false);
      cameraRef.current.stopRecording();
      //navigation.navigate("ImageScreen", { imageURI: data.uri });
    } catch (ex) {
      console.log(ex);
    }
  }

  function toggleTorch() {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.torch);
      setFlashModeClass("off");
    } else if (flashMode === Camera.Constants.FlashMode.torch) {
      setFlashMode(Camera.Constants.FlashMode.off);
      setFlashModeClass("on");
    }
  }

  return (
    <View style={styles.container}>
      {isFocused && (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flashMode}
        >
          <View style={styles.buttonTopContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <TouchableOpacity onPress={toggleTorch}>
                <MaterialIcons
                  name={"flash-" + flashModeClass}
                  size={50}
                  color="white"
                />
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <MaterialCommunityIcons
                name="camera-flip-outline"
                size={50}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonBottomContainer}>
            <TouchableOpacity
              style={[styles.button, { flex: 1 }]}
              onPress={takePicture}
              onLongPress={takeVideo}
              onPressOut={() => {
                if (isRecording) {
                  stopVideo();
                }
              }}
            >
              <Feather name="circle" size={100} color={cameraRecordingColor} />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonTopContainer: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 40,
    justifyContent: "space-around",
  },
  buttonBottomContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
    alignItems: "flex-end",
  },
  button: {
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
