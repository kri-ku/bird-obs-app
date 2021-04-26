//import { firebase } from '@react-native-firebase/auth';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button, Icon, ListItem, Avatar } from 'react-native-elements';

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

    const renderItem =(observation)=> {
        return(
            <ListItem key={observation.id} bottomDivider>
                <Avatar rounded size="large" source={require('../pictures/avatar2.png')}></Avatar>
                <ListItem.Content>
                <ListItem.Title>{observation.species}</ListItem.Title>
                <ListItem.Subtitle>{observation.time}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron></ListItem.Chevron>
            </ListItem>

        )
    }

    return (
        <View>
            <FlatList
            data={data}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={obs => obs.id}>
            </FlatList>
            <Button title="see" onPress={() => console.log("DATAN TULOSTUS",typeof(data))}></Button>
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