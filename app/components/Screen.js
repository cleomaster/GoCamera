import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Constants from "expo-constants";

function Screen({ children }) {
    return (
        <View style={styles.container}>
            { children }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight
    }
})

export default Screen;