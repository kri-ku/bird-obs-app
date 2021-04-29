import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { signIn, authentication } from '../firebase'

//const image = require('../pictures/billy-huynh-sky.jpg')

// TEE TÄHÄN FORM updeittaisko se ?

export default function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [printEmail, setPrintEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSignIn = () => {
        try {
            signIn(email,password)
            //authentication.signInWithEmailAndPassword(email, password)
            //console.log("MOI")
        } catch (err) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage) // ei toimi
        }

        /*authentication.onAuthStateChanged(function (user) {
            if (user) {
                setPrintEmail(user.email)
                console.log("USERNAME", )
            } else {
                console.log("no user!")
            }
        })*/
        //signIn(email, password)
    }

    return (
        <View style={styles.container}>

            {/*<ImageBackground source={require('../pictures/billy-huynh-sky.jpg')} style={styles.image}>*/}
            <View style={styles.inputs}>
                <Text>Catch the bird</Text>
                <Image resizeMode='contain' style={{ height: 150, width: 150 }} source={require('../pictures/circle-cropped.png')}></Image>

                <Input
                    placeholder='Email'
                    value={email}
                    onChangeText={email => setEmail(email)}
                    autoCapitalize='none'
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    }
                /><Input
                    placeholder="Password"
                    value={password}
                    onChangeText={password => setPassword(password)}
                    autoCapitalize='none'
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                        />}
                    secureTextEntry={true} />
            </View>
            <TouchableOpacity style={{ color: 'red' }}>
                <Text style={styles.forgotbutton} style={{ textAlign: 'left' }}>Forgot your password?</Text>
            </TouchableOpacity>
            <Button buttonStyle={styles.button} titleStyle={{ color: 'white' }} title="Sign in" onPress={() => handleSignIn()}></Button>
            <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
                <Text style={styles.text} style={{ textAlign: 'left' }}>Don't have an account? Sign up</Text>
            </TouchableOpacity>



            {/*</ImageBackground>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        //backgroundColor: '#fff',
        //alignItems: 'center',
        //justifyContent: 'center',
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center',
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
        padding: 10, flex: 0.9

    },
    button: {
        width: 300,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#C7BABA',

    },
    forgotbutton: {
        height: 10,
        marginBottom: 30,
        color: 'blue',

    }
});