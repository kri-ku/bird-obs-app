//import { firebase } from '@react-native-firebase/auth';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
//import * as firebase from 'firebase'
//import firebase from firebase;
//import {firebaseConfig} from '../firebase_config'
//firebase.initializeApp(firebaseConfig)
import { getObservations } from '../firebase_config'


export default function AddedObservations() {
    const [data, setData] = useState([])

    useEffect(() => {
        const obs = getObservations()
        setData(obs)
        console.log("DATA USEEFFECTISSÄ",data)
    }, [])


    return (
        <View>
            <Text>This is added!</Text>
            <Button title="see" onPress={() => console.log("DATAN TULOSTUS",JSON.stringify(data))}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})