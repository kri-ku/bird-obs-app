import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Alert, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements'
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
            signIn(email, password)
            //authentication.signInWithEmailAndPassword(email, password)
            //console.log("MOI")
            //const user = authentication.currentUser

            /*authentication.onAuthStateChanged(function (user) {
                if (user) {
                    navigation.navigate('home')
                    console.log("logged in",)
                }
            })*/
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
        <KeyboardAvoidingView style={styles.container}>

            {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>*/}

            {/*<ImageBackground source={require('../pictures/billy-huynh-sky.jpg')} style={styles.image}>*/}
            <Image resizeMode='contain' style={{ height: 150, width: 150 }} source={require('../pictures/circle-cropped-small.png')}></Image>
            <Text style={styles.headerText}>Catch the bird</Text>
            <View style={styles.inputs}>

                {/*<Image resizeMode='contain' style={{ height: 150, width: 150 }} source={require('../pictures/circle-cropped.png')}></Image>*/}
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



            <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title="Sign in" onPress={() => handleSignIn()}></Button>

            <TouchableOpacity style={{ color: 'red' }}>
                <Text style={styles.forgotbutton}>Forgot your password?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
                <Text style={styles.signUp}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
            {/*</ImageBackground>*/}
            {/*</TouchableWithoutFeedback>*/}

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //flexDirection: 'column',
        //backgroundColor: '#fff',
        //alignItems: 'center',
        //justifyContent: 'center',
        resizeMode: "cover",
        justifyContent: "flex-start",
        alignItems: 'center',
    },
    image: {
        //flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center',
        opacity: 2


    },
    inputs: {
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '80%',
        alignItems: 'center',
        borderRadius: 20,
        margin: 10,
        padding: 10,
        //flex: 0.9

    },
    button: {
        width: 300,
        //margin: 10,
        borderRadius: 10,
        backgroundColor: '#C7BABA',
        margin: 5
    },
    buttonTitle: {
        color: 'white',
        letterSpacing: 2,

    },
    forgotbutton: {
        height: 20,
        //marginBottom: 30,
        color: 'blue',
        letterSpacing: 2,
        textAlign: 'left',
        margin: 5

    },
    headerText: {
        letterSpacing: 2,
        fontSize: 20,
        margin: 8
    },
    signUp: {
        letterSpacing: 2,
        textAlign: 'left',
        margin: 5
    }
});