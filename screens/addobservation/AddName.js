import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, Input } from 'react-native-elements';

export default function AddName({ route, navigation }) {
    const { observation } = route.params
    const [species, setSpecies] = useState('')

    const moveToAddPlace = () => {
        const Observation = {
            photoname: observation.photoname,
            species: `${species}`,
            place: observation.place,
            time: observation.time,
            sex: observation.sex,
            quantity: observation.quantity,
            weather: observation.weather
        }
        navigation.navigate('AddPlace', { observation: Observation })
    }

    return (
        <View style={styles.container}>

            <View style={{ width: '100%', marginLeft: 10, marginBottom: 20, marginTop: 30 }}>
                <Text style={{ color: '#C7BABA' }}>Add bird 2/6</Text>
                <Text style={styles.headerAndButtonText}>Add species</Text>
                <TouchableOpacity onPress={() => navigation.navigate('home')}>
                    <Text style={styles.cancelButton}>Back to Home</Text>
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', width: '80%', marginTop: 100 }}>
                <Input
                    label="Species"
                    name="species"
                    value={species}
                    onChangeText={text => setSpecies(text)}
                    returnKeyType="done"></Input>
            </View>
            <Button buttonStyle={styles.nextbutton} titleStyle={{ color: 'white', letterSpacing: 2 }} title="Next" onPress={moveToAddPlace}></Button>
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
    nextbutton: {
        width: 150,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#C7BABA',

    },
    cancelButton: {
        color: 'red',
        letterSpacing: 1
    },
    text: {
        letterSpacing: 2,
        marginBottom: 6
    },
    headerAndButtonText: {
        letterSpacing: 1.5,
        fontSize: 15
    }
});