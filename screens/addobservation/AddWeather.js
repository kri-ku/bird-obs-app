import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { saveObservation } from '../../firebase';
import NextButton from '../../components/NextButton';
import AddingHeader from '../../components/AddingHeader';

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
        const nameList = checkboxes.filter(box => box.isChecked === true).map(box => box.title)
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
        <ScrollView style={{ backgroundColor: '#D7ECEF' }}>
            <AddingHeader pagenumber={"6"} header={"What was the weather like?"}></AddingHeader>
            <View style={{ width: '100%', backgroundColor: '#D7ECEF' }}>
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
            <NextButton title="Next" onPress={() => saveBirdToDb()}></NextButton>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D7ECEF',
        alignItems: 'center',
        justifyContent: 'center',
    }
});