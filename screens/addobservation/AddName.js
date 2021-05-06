import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import NextButton from '../../components/NextButton';
import AddingHeader from '../../components/AddingHeader';


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
            <AddingHeader pagenumber={"2"} header={"Add species"}></AddingHeader>
            <View style={{ alignItems: 'center', width: '80%', marginTop: 100, marginBottom: 80 }}>
                <Input
                    label="Species"
                    name="species"
                    value={species}
                    onChangeText={text => setSpecies(text)}
                    returnKeyType="done"></Input>
            </View>
            <NextButton title="Next" onPress={moveToAddPlace}></NextButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D7ECEF',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
});