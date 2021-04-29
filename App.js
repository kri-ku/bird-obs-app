import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Login from './screens/LogIn';
import Map from './components/Mapview';
//import CreateAccount from './screens/CreateAccount';

import AddPicture from './screens/addobservation/AddPicture';
import AddName from './screens/addobservation/AddName';
import AddPlace from './screens/addobservation/AddPlace'
import AddTime from './screens/addobservation/AddTime';
import AddSexAndQuantity from './screens/addobservation/AddSexAndQuantity';
import AddWeather from './screens/addobservation/AddWeather';
import AddedObservations from './screens/AddedObservations';

import CreateAccount from './screens/CreateAccount';
import LogIn from './screens/LogIn';

import { authentication } from './firebase'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const user = authentication.currentUser
authentication.onAuthStateChanged(function (user) {
  if (user) {
    console.log("logged in",)
  } else {
    console.log("no user!")
  }
})

function HomeNavigator() {
  //screenOptions={{ headerShown: false }}
  return (
    <Stack.Navigator >
      {user ? (
        <>
          <Stack.Screen name="home" component={Home}></Stack.Screen>
          <Stack.Screen name="AddPicture" component={AddPicture} ></Stack.Screen>
          <Stack.Screen name="AddName" component={AddName} ></Stack.Screen>
          <Stack.Screen name="AddPlace" component={AddPlace} ></Stack.Screen>
          <Stack.Screen name="AddTime" component={AddTime} ></Stack.Screen>
          <Stack.Screen name="AddSexAndQuantity" component={AddSexAndQuantity} ></Stack.Screen>
          <Stack.Screen name="AddWeather" component={AddWeather} ></Stack.Screen>
          <Stack.Screen name="Added Observations" component={AddedObservations}></Stack.Screen>
        </>
      ) : (
        <>
          <Stack.Screen name="signin" component={LogIn}></Stack.Screen>
          <Stack.Screen name="CreateAccount" component={CreateAccount}></Stack.Screen>
        </>
      )}

    </Stack.Navigator>
  )
}

/*function LogInNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="signin" component={LogIn}></Stack.Screen>
      <Stack.Screen name="signup" component={CreateAccount}></Stack.Screen>
      <Stack.Screen></Stack.Screen>
    </Stack.Navigator>
  )
} */

const BottomNavigator = () => {
  
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="login" component={Login}></Tab.Screen>
        <Tab.Screen name="home" component={HomeNavigator}></Tab.Screen>
        <Tab.Screen name="map" component={Map}></Tab.Screen>
        <Tab.Screen name="createAccount" component={CreateAccount}></Tab.Screen>

      </Tab.Navigator>
    </NavigationContainer>
  )

}
// https://reactnavigation.org/docs/hiding-tabbar-in-screens

export default function App() {
  const [user,SetUser] = useState('')
  //const [state, setState] = useState(false)
  //const[refresh, setRefresh] = useState(1)

  /*useEffect(()=> {
    BottomNavigator.forceUpdate()
  }, [user])*/
  //useEffect(()=> {authentication.onAuthStateChanged((user)=> {SetUser(user)})})

  return (
    <BottomNavigator></BottomNavigator>
    /*
    <NavigationContainer onAuthStateChanged={()=> setRefresh(0)}>
      <Tab.Navigator>
        <Tab.Screen name="login" component={Login}></Tab.Screen>
        <Tab.Screen name="home" component={HomeNavigator}></Tab.Screen>
        <Tab.Screen name="map" component={Map}></Tab.Screen>
        <Tab.Screen name="createAccount" component={CreateAccount}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>*/
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
