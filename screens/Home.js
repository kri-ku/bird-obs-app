import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Header } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { getUserData, signOut } from '../firebase'
import { useIsFocused } from '@react-navigation/native'
import { Icon } from 'react-native-elements';

// showing name not working when first loading screen
export default function Home({ navigation }) {
  const [uname, setUname] = useState('')
  const isFocused = useIsFocused()

  useEffect(() => {
    setData() // fix this
  }, [isFocused])

  const setData = async () => {
    const udata = await getUserData()
    console.log("UUDATA", udata)
    setUname(await udata[0].username)
  }

  const Observation = {
    photoName: '',
    species: '',
    place: '',
    time: '',
    sex: '',
    quantity: 0,
    weather: []
  }

  const askIfLogOut = () => {
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

  //  {/*rightComponent={<Image resizeMode='contain' style={{ height: 80, width: 80 }} source={require('../pictures/circle-cropped.png')}></Image>}
  return (
    <View style={styles.container}>
      <Header placement="left" style={{ alignItems: 'center', justifyContent: 'center' }}
        containerStyle={{ backgroundColor: '#C7BABA', height: 120 }}
        centerComponent={{ text: `Hello ${uname}!`, style: { width: 150, color: 'white', fontSize: 20, letterSpacing: 1.5 } }}
        leftComponent={<Icon type="font-awesome-5" color="white" name="caret-square-down" onPress={() => askIfLogOut()} ></Icon>}></Header>


      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Button buttonStyle={styles.button} titleStyle={styles.buttonText} title="Add observation" onPress={() => navigation.navigate('AddPicture', { observation: Observation })}></Button>
        <Button buttonStyle={styles.button} titleStyle={styles.buttonText} title="See observations" onPress={() => navigation.navigate('Added Observations')}></Button>
        <StatusBar style="auto" />
      </View>
    </View>
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
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 0.3,
    marginTop: 50
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
  }
});