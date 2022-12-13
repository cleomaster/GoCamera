import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './app/screens/CameraScreen';
import ImageScreen from './app/screens/ImageScreen';
import HomeScreen from './app/screens/HomeScreen';
import VideoScreen from "./app/screens/VideoScreen";


const Stack = createNativeStackNavigator();


const StackNavigator = () => (
  <Stack.Navigator screenOptions={
    {
      headerShown: false
    }
  }>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="CameraScreen" component={CameraScreen} />
    <Stack.Screen name="ImageScreen" component={ImageScreen} />
    <Stack.Screen name="VideoScreen" component={VideoScreen} /> 
  </Stack.Navigator>
)

function App(props) {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;