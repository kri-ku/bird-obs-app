import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

//const image = require('../pictures/billy-huynh-sky.jpg')

export default function Login() {
    return (
        <View style={styles.container}>
            
            <ImageBackground source={require('../pictures/billy-huynh-sky.jpg')} style={styles.image}>
            <Image resizeMode='contain' style={{height:150, width:150}} source={require('../pictures/circle-cropped.png')}></Image>
                <View style={styles.inputs}>
                    <Input
                        placeholder='Email'
                        leftIcon={
                            <Icon
                                name='user'
                                size={24}
                                color='black'
                            />
                        }
                    /><Input placeholder="Password" leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                        />}
                        secureTextEntry={true} />
                </View>
                <Button buttonStyle={styles.button} titleStyle={{color:'white'}} title="Sign in"></Button>
                <Text style={styles.text} style={{ textAlign:'left' }}>Don't have an acoount? Sign  up</Text>

                <Text style={styles.text} style={{ textAlign:'left' }}>Forgot your password?</Text>

            </ImageBackground>
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
    button:{
        width: 300,
        margin: 10,
        borderRadius:10,
        backgroundColor:'#C7BABA',
        
    }
});