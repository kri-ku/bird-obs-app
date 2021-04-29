import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
//import auth from '@react-native-firebase/auth'
import { Input, Button } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { signUp, signIn, writeUserData } from '../firebase'

export default function CreateAccount({ navigation: { goBack } }) {
  const [uname, setUname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')

  const createAccount = async () => {
    console.log(email)
    console.log(password)
    console.log(passwordAgain)

    if (password === passwordAgain) {
      console.log("SAMAT")
      try {
        await signUp(email, password)
        await signIn(email, password)
        await writeUserData(email, uname)
      } catch (err) {
        console.log(err)
      }

    } else {
      Alert.alert("Your passwords didn't match! Try again.")
      setPassword('')
      setPasswordAgain('')
    }
    await signIn()


  }
  return (
    // make possibility to see password when writing

    <View style={styles.container}>
      <View style={styles.inputs}>
        <Text>Sign up:</Text>

        <Input
          placeholder='Username'
          autoCapitalize='none'
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
            />
          }
          value={uname}
          onChangeText={text => setUname(text)}
          secureTextEntry={false}

        />

        <Input
          placeholder='Email'
          autoCapitalize='none'
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
            />
          }
          value={email}
          onChangeText={text => setEmail(text)}
          secureTextEntry={false}
          keyboardType='email-address'
        />
        <Input
          placeholder="Password"
          autoCapitalize='none'
          leftIcon={
            <Icon
              name='lock'
              size={24}
              color='black'
            />}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true} />

        <Input
          placeholder="Rewrite Password"
          leftIcon={
            <Icon
              name='lock'
              size={24}
              color='black'
            />}
          value={passwordAgain}
          onChangeText={text => setPasswordAgain(text)}
          secureTextEntry={true}
          keyboardType='email-address' />
      </View>

      <Button buttonStyle={styles.button}
        titleStyle={{ color: 'white' }} title="Create account"
        onPress={() => createAccount()}></Button>
      <Text>placeholder</Text>
      <TouchableOpacity onPress={() => goBack()}>
        <Text>Sign in</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: 'center',
  },
  inputs: {
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '80%',
    alignItems: 'center',
    borderRadius: 20,
    margin: 10,
    padding: 20

  },
  button: {
    width: 300,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#C7BABA',

  }
});