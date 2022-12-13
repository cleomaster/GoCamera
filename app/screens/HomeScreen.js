import React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={require("../assets/background.jpg")}
      >
        <View style={styles.section}>
          <Text style={styles.heading}>
            Take Pictures and Videos That People Love!
          </Text>
        </View>
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CameraScreen");
            }}
          >
            <MaterialCommunityIcons name="camera" size={250} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
  section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionUnderline: {
    borderWidth: 5,
    borderBottomColor: "white",
  },
  heading: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default HomeScreen;
