import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { signIn } from '../firebase'

export default function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = () => {
        try {
            signIn(email, password)
        } catch (err) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Image resizeMode='contain' style={{ height: 150, width: 150 }} source={require('../pictures/circle-cropped.png')}></Image>
            <Text style={styles.headerText}>Catch the bird</Text>
            <View style={styles.inputs}>
                <Input
                    placeholder='Email'
                    value={email}
                    onChangeText={email => setEmail(email)}
                    autoCapitalize='none'
                    returnKeyType="done"
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
                    returnKeyType="done"
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
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-start",
        alignItems: 'center',
        paddingTop: 20
    },
    image: {
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
    },
    button: {
        width: 300,
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