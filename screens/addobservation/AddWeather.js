import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { saveObservation } from '../../firebase'

const initialCheckboxes = [
    { id: 1, title: 'sunny', isChecked: false },
    { id: 2, title: 'cloudy', isChecked: false },
    { id: 3, title: 'warm', isChecked: false },
    { id: 4, title: 'hot', isChecked: false },
    { id: 5, title: 'gentle', isChecked: false },
    { id: 6, title: 'rainy', isChecked: false },
    { id: 7, title: 'rainstorm', isChecked: false },
    { id: 8, title: 'cold', isChecked: false },
    { id: 9, title: 'slush', isChecked: false },
    { id: 10, title: 'snowy', isChecked: false },
    { id: 11, title: 'foggy', isChecked: false }
]

export default function AddWeather({ route, navigation }) {
    const { observation } = route.params
    const [checkboxes, setCheckBoxes] = useState(initialCheckboxes)

    const handleChecked = (boxId) => {
        const newList = checkboxes.map((box) => {
            if (box.id === boxId) {
                const updatedBox = {
                    ...box, isChecked: !box.isChecked
                }
                return updatedBox
            }
            return box
        })
        setCheckBoxes(newList)
    }

    const saveBirdToDb = () => {
        const weatherList = checkboxes.filter(box => box.isChecked === true)
        const nameList = weatherList.map(box => box.title) //works, combine?

        const Observation = {
            photoname: observation.photoname,
            species: observation.species,
            place: observation.place,
            time: observation.time,
            sex: observation.sex,
            quantity: observation.quantity,
            weather: nameList
        }
        saveObservation(Observation)
        Alert.alert(`You added ${observation.species} to your observations!`)
        navigation.navigate('home')
    }
    return (
        <ScrollView>
            <View style={{ width: '100%', marginLeft: 10, marginBottom: 20, marginTop: 30 }}>
                <Text style={{ color: '#C7BABA' }}>Add bird 6/6</Text>
                <Text style={styles.headerAndButtonText}>What was the weather like?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('home')}>
                    <Text style={styles.cancelButton}>Back to Home</Text>
                </TouchableOpacity>
            </View>

            <View style={{ width: '100%', marginLeft: 10, marginBottom: 20, marginTop: 10 }}>
                {checkboxes.map((box, index) => {
                    return (
                        <CheckBox
                            key={index}
                            title={box.title}
                            checked={box.isChecked}
                            checkedIcon='dot-circle-o'
                            onPress={() => handleChecked(box.id)}
                        >
                        </CheckBox>
                    )
                })}
            </View>
            <Button buttonStyle={styles.nextbutton} titleStyle={{ color: 'white' }} title="Tallenna" onPress={() => saveBirdToDb()}></Button>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextbutton: {
        width: 150,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#C7BABA'
    },
    map: {
        flex: 1,
        height: 400,
        width: '100%'
    },
    headerAndButtonText: {
        letterSpacing: 1.5,
        fontSize: 15
    },
    cancelButton: {
        color: 'red',
        letterSpacing: 1
    },
});