import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { saveObservation } from '../../firebase'

const initialCheckboxes = [
    { id: 1, title: 'aurinkoinen', isChecked: false },
    { id: 2, title: 'pilvinen', isChecked: false },
    { id: 3, title: 'lämmin', isChecked: false },
    { id: 4, title: 'kuuma', isChecked: false },
    { id: 5, title: 'leuto', isChecked: false },
    { id: 6, title: 'sateinen', isChecked: false },
    { id: 7, title: 'rankkasadetta', isChecked: false },
    { id: 8, title: 'kylmä', isChecked: false },
    { id: 9, title: 'loskaa', isChecked: false },
    { id: 10, title: 'lunta', isChecked: false },
    { id: 11, title: 'sumua', isChecked: false }
]

export default function AddWeather({ route, navigation }) {
    const { observation } = route.params
    console.log("PARAMSIT ADDWEATHERISSA", observation)
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
        const nameList = weatherList.map(box => box.title) //TOIMI combine?

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
        Alert.alert(`Tallensit ${observation.species} omiin havaintoihisi!`)
        navigation.navigate('home')
    }
    return (
        <ScrollView>
            <View style={{ width: '100%', marginLeft: 10, marginBottom: 20, marginTop: 10 }}>
                <Text style={{ color: '#C7BABA' }}>Add bird 5/7</Text>
                <Text style={{ fontSize: 20 }}>Milllainen sää oli?</Text>
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
});