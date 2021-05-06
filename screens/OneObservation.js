import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Alert, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { removeItem } from '../firebase'

export default function OneObservation({ route, navigation: { goBack } }) {
    const { observation } = route.params

    const splitdate = (date) => {
        return date.substr(0, 25)
    }

    const returnweather = (weather) => {
        if (weather === undefined) {
            return <Text></Text>
        } else {
            return weather.map(weather => <Text style={styles.text} key={weather}>{weather}</Text>)
        }
    }

    const removeItemAndGoBack = () => {
        removeItem(observation.timestamp)
        console.log(observation.timestamp)
        goBack()
    }


    return (
        <View styles={styles.container}>
            <View style={{ width: '100%', marginLeft: 10, marginBottom: 20, marginTop: 40 }}>
                <Text style={styles.headerAndButtonText}>{observation.species}</Text>
                <TouchableOpacity onPress={() => goBack()}>
                    <Text style={styles.cancelButton}>Back to List</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.ScrollView}>
                {observation.photoname !== "" ? (<Image transition={false} resizeMode='contain' style={styles.image} source={{ uri: observation.photoname }}></Image>) : (<Image transition={false} resizeMode='contain' style={styles.image} source={require('../pictures/avatar3.png')}></Image>)}
                <Text style={styles.text}>{splitdate(observation.time)}</Text>
                <Text style={styles.text}>{observation.place}</Text>
                <Text style={styles.text}>{observation.quantity}, {observation.sex}</Text>
                <Text style={styles.text}>Weather was:</Text>
                {returnweather(observation.weather)}

                <TouchableOpacity onPress={() => removeItemAndGoBack()} style={{ marginTop: 30 }}>
                    <Text style={styles.cancelButton}>remove</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    cancelButton: {
        color: 'red',
        letterSpacing: 1
    },
    headerAndButtonText: {
        letterSpacing: 2,
        fontSize: 25
    },
    image: {
        height: 350,
        width: 450,
        margin: 10,
        marginBottom: 20

    },
    ScrollView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        letterSpacing: 2,
        margin: 5

    },
    text: {
        letterSpacing: 2
    },

});