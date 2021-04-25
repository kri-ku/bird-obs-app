import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import AddObservation from './screens/AddObservation';
import Login from './screens/LogIn'
import Map from './components/Mapview'
import CreateAccount from './screens/CreateAccount'

import AddPicture from './screens/addobservation/AddPicture';
import ConfirmPicture from './screens/addobservation/ConfirmPicture';
import AddName from './screens/addobservation/AddName';
import AddPlace from './screens/addobservation/AddPlace'
import AddTime from './screens/addobservation/AddTime';
import AddSexAndQuantity from './screens/addobservation/AddSexAndQuantity';
import AddWeather from './screens/addobservation/AddWeather';
import AddedObservations from './screens/AddedObservations'



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home}></Stack.Screen>
      <Stack.Screen name="AddPicture" component={AddPicture} ></Stack.Screen>
      <Stack.Screen name="ConfirmPicture" component={ConfirmPicture} ></Stack.Screen>
      <Stack.Screen name="AddName" component={AddName} ></Stack.Screen>
      <Stack.Screen name="AddPlace" component={AddPlace} ></Stack.Screen>
      <Stack.Screen name="AddTime" component={AddTime} ></Stack.Screen>
      <Stack.Screen name="AddSexAndQuantity" component={AddSexAndQuantity} ></Stack.Screen>
      <Stack.Screen name="AddWeather" component={AddWeather} ></Stack.Screen>
      <Stack.Screen name="Added Observations" component={AddedObservations}></Stack.Screen>
    </Stack.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="login" component={Login}></Tab.Screen>
        <Tab.Screen name="home" component={HomeNavigator}></Tab.Screen>
        <Tab.Screen name="add obs" component={AddObservation}></Tab.Screen>
        <Tab.Screen name="map" component={Map}></Tab.Screen>
        <Tab.Screen name="createAccount" component={CreateAccount}></Tab.Screen>

      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
