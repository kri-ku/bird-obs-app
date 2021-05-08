import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, createContext } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';

import AddPicture from './screens/addobservation/AddPicture';
import AddName from './screens/addobservation/AddName';
import AddPlace from './screens/addobservation/AddPlace'
import AddTime from './screens/addobservation/AddTime';
import AddSexAndQuantity from './screens/addobservation/AddSexAndQuantity';
import AddWeather from './screens/addobservation/AddWeather';
import AddedObservations from './screens/AddedObservations';
import OneObservation from './screens/OneObservation';

import CreateAccount from './screens/CreateAccount';
import LogIn from './screens/LogIn';

import { authentication } from './firebase'

const Stack = createStackNavigator();

export const AuthContext = createContext(null)


// https://heartbeat.fritz.ai/how-to-manage-authentication-flows-in-react-native-with-react-navigation-v5-and-firebase-860f57ae20d3

const SignInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={Home}></Stack.Screen>
        <Stack.Screen name="AddPicture" component={AddPicture} ></Stack.Screen>
        <Stack.Screen name="AddName" component={AddName} ></Stack.Screen>
        <Stack.Screen name="AddPlace" component={AddPlace} ></Stack.Screen>
        <Stack.Screen name="AddTime" component={AddTime} ></Stack.Screen>
        <Stack.Screen name="AddSexAndQuantity" component={AddSexAndQuantity} ></Stack.Screen>
        <Stack.Screen name="AddWeather" component={AddWeather} ></Stack.Screen>
        <Stack.Screen name="Added Observations" component={AddedObservations}></Stack.Screen>
        <Stack.Screen name="OneObservation" component={OneObservation}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const SignOutStack = () => {
  return (
    <NavigationContainer screenOptions={{ headerShown: false }}>
      <Stack.Navigator>
        <Stack.Screen name="signin" component={LogIn}></Stack.Screen>
        <Stack.Screen name="CreateAccount" component={CreateAccount}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState(null)

  const onAuthStateChanged = (result) => {
    setUser(result)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const authSubscriber = authentication.onAuthStateChanged(onAuthStateChanged)
    return authSubscriber
  }, [])

  if (initializing) {
    return null
  }

  return user ? (
    <AuthContext.Provider value={user}>
      <SignInStack></SignInStack>
    </AuthContext.Provider>
  ) : (
    <SignOutStack></SignOutStack>
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
