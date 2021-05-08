import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { removeItem } from '../firebase'
import StickyHeader from '../components/StickyHeader'

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

    const confirmRemove = () => {
        Alert.alert("Are you sure you want to remove this observation?",
        "Observation will be permanently deleted.",
            [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Confirm',
                    onPress: () => removeItemAndGoBack()
                }
            ])
    }

    const removeItemAndGoBack = () => {
        removeItem(observation.id)
        goBack()
    }

    return (

        <ScrollView
            stickyHeaderIndices={[0]}>
            <StickyHeader heading={observation.species}></StickyHeader>
            <View style={{ alignItems: 'center' }}>

                {observation.photoname !== "" ?
                    (<Image transition={false} resizeMode='contain' style={styles.image} source={{ uri: observation.photoname }}></Image>)
                    : (<Image transition={false} resizeMode='contain' style={styles.image} source={require('../pictures/avatar3.png')}></Image>)}

                <Text style={styles.text}>{splitdate(observation.time)}</Text>
                <Text style={styles.text}>{observation.place}</Text>
                <Text style={styles.text}>{observation.quantity}, {observation.sex}</Text>
                <Text style={styles.text}>Weather was:</Text>
                {returnweather(observation.weather)}

                <TouchableOpacity onPress={() => confirmRemove()} style={{ marginTop: 30, marginBottom: 20 }}>
                    <Text style={styles.cancelButton}>remove</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
    text: {
        letterSpacing: 2,
        margin: 5
    },
    text: {
        letterSpacing: 2
    }
});