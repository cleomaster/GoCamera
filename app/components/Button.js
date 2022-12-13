import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import NativeHeadlessJsTaskSupport from "react-native/Libraries/ReactNative/NativeHeadlessJsTaskSupport";

function Button({ title, containerColor, textColor, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.buttonContainer]}>
        <Text style={[styles.buttonText]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "red",
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  }
});

export default Button;
