import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';

export default function AddName({ route, navigation }) {
    const { observation } = route.params
    //const Observation = observation
    console.log("PROPSIT ADDNAMESSA", observation)

    const [species, setSpecies] = useState('')

    const moveToAddPlace =()=> {
        console.log("MUUTTUNUT LAJI", species)
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
            <View style={{ width: '100%', marginLeft: 10, marginBottom: 20, flex: 0.2 }}>
                <Text style={{ color: '#C7BABA' }}>Add bird 2/7</Text>
                <Text style={{ fontSize: 20 }}>Lisää laji</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: '80%', marginTop: 50 }}>
                <Input
                    label="Laji"
                    name="species"
                    value={species}
                    onChangeText={text => setSpecies(text)}
                    returnKeyType="done"></Input>
            </View>
            <Button buttonStyle={styles.nextbutton} titleStyle={{ color: 'white' }} title="Seuraava" onPress={moveToAddPlace}></Button>
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
    input: {

    }
});