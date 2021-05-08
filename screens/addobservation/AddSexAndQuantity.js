import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';
import NextButton from '../../components/NextButton';
import AddingHeader from '../../components/AddingHeader';

export default function AddSexAndQuantity({ route, navigation }) {
    const { observation } = route.params
    const [sex, setSex] = useState('')
    const [quantity, setQuantity] = useState(0)
    const buttons = ['male', 'female', 'both']
    const [selectedIndex, setSelectedIndex] = useState(2)

    const updateIndex = (index) => {
        setSelectedIndex(index)
        setSex(buttons[index])
    }

    const navigateToAddWeather = () => {
        const Observation = {
            photoname: observation.photoname,
            species: observation.species,
            place: observation.place,
            time: observation.time,
            sex: `${sex}`,
            quantity: `${quantity}`,
            weather: observation.weather
        }
        navigation.navigate('AddWeather', { observation: Observation })
    }

    return (
        <View style={styles.container}>
            <AddingHeader pagenumber={"5"} header={"Add sex and quantity"}></AddingHeader>
            <View style={styles.center}>
                <View style={{ width: 300, alignItems: 'center' }}>
                    <ButtonGroup
                        buttons={buttons}
                        selectedIndex={Number(selectedIndex)}
                        onPress={index => updateIndex(index)}
                        buttonContainerStyle={{ backgroundColor: '#C7BABA' }}
                        containerStyle={styles.button}
                        textStyle={{ color: 'white' }}
                        selectedButtonStyle={{ backgroundColor: 'black' }}
                        containerStyle={{ height: 70, width: 300 }}>
                    </ButtonGroup>
                </View>

                <View style={{ width: 300, marginTop: 50 }}>
                    <NumericInput
                        onChange={value => setQuantity(value)}
                        totalHeight={70} totalWidth={300}
                        iconSize={12}
                        rounded
                        iconStyle={{ color: 'white' }}
                        containerStyle={{ backgroundColor: 'white' }}
                        rightButtonBackgroundColor='#C7BABA'
                        leftButtonBackgroundColor='#C7BABA'></NumericInput>
                </View>
            </View>
            <NextButton title="Next" onPress={navigateToAddWeather}></NextButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D7ECEF',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    center: {
        backgroundColor: '#D7ECEF',
        marginTop: 90,
        marginBottom: 20
    },
    button: {
        width: 70,
        margin: 10,
        borderRadius: 10,
        backgroundColor: 'black'
    },
    text: {
        letterSpacing: 1.5,
        margin: 6
    },

});