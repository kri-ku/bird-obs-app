import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, ImageBackground } from 'react-native';
import { Header } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { getUserData, signOut, getObservations } from '../firebase';
import { Icon } from 'react-native-elements';

export default function Home({ navigation }) {
  const [uname, setUname] = useState('')

  const setData = async () => {
    const data = await getUserData()
    const data_object = await data[0]
    setUname(data_object.username)
  }

  useEffect(() => {
    setData()
  }, [])

  const Observation = {
    photoName: '',
    species: '',
    place: '',
    time: '',
    sex: '',
    quantity: 0,
    weather: []
  }

  const confirmLogOut = () => {
    Alert.alert("Do you really want to log out?",
      "You will be logged out from the app but the data is saved.",
      [
        {
          text: 'Cancel'
        },
        {
          text: 'Log out',
          onPress: () => signOut()
        }

      ])
  }

  return (
    <ImageBackground source={require('../pictures/anthony-delanoix-btQt9i0Krag-unsplash.jpg')} style={styles.background}>

      <Header placement="left" style={styles.header}
        containerStyle={{ backgroundColor: '#C7BABA', height: 120 }}
        centerComponent={{ text: `Hello ${uname}!`, style: { fontWeight: 'bold', width: 300, color: 'white', fontSize: 25, letterSpacing: 3 } }}
        leftComponent={<Icon type="font-awesome-5" color="white" name="caret-square-down" onPress={() => confirmLogOut()} ></Icon>}></Header>


      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Button buttonStyle={styles.button} titleStyle={styles.buttonText} title="Add observation" onPress={() => navigation.navigate('AddPicture', { observation: Observation })}></Button>
        <Button buttonStyle={styles.button} titleStyle={styles.buttonText} title="See observations" onPress={() => navigation.navigate('Added Observations')}></Button>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    width: 300,
    height: 200,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#C7BABA',
  },
  text: {
    letterSpacing: 2
  },
  buttonText: {
    letterSpacing: 1.1,
    color: 'white'
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});