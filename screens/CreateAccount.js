import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Alert } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
//import auth from '@react-native-firebase/auth'
import { Input, Button } from 'react-native-elements'
import { set } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CreateAccount() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')

  const createAccount = () => {
    console.log("HÄPPÄÄ")
    console.log(email)
    console.log(password)
    console.log(passwordAgain)

    if(password === passwordAgain) {
      console.log("SAMAT")
    } else {
      Alert.alert("Your passwords didn't match! Try again.")
      setPassword('')
      setPasswordAgain('')
    }
    /*auth()
      .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      }); */
  }
  return (
// make possibility to see password when writing

    <View style={styles.container}>
      <View style={styles.inputs}>
        <Text>Create account:</Text>
        <Input
          placeholder='Email'
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
        />
        <Input placeholder="Password" leftIcon={
          <Icon
            name='lock'
            size={24}
            color='black'
          />}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true} />

        <Input placeholder="Rewrite Password" leftIcon={
          <Icon
            name='lock'
            size={24}
            color='black'
          />}
          value={passwordAgain}
          onChangeText={text => setPasswordAgain(text)}
          secureTextEntry={true} />
      </View>
      <Button buttonStyle={styles.button}
        titleStyle={{ color: 'white' }} title="Create account"
        onPress={() => createAccount()}></Button>
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