import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';

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

            <View style={{ width: '100%', marginLeft: 10, marginBottom: 20, marginTop: 30 }}>
                <Text style={{ color: '#C7BABA' }}>Add bird 5/6</Text>
                <Text style={styles.headerAndButtonText}>Add sex and quantity</Text>
                <TouchableOpacity onPress={() => navigation.navigate('home')}>
                    <Text style={styles.cancelButton}>Back to Home</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.center}>
                <View style={{ width: 300 }}>
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
                        rightButtonBackgroundColor='#C7BABA'
                        leftButtonBackgroundColor='#C7BABA'></NumericInput>
                </View>
            </View>
            <Button buttonStyle={styles.nextbutton} titleStyle={{ color: 'white' }} titleStyle={styles.headerAndButtonText} title="Next" onPress={navigateToAddWeather}></Button>

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
    center: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 100,
        marginBottom: 20
    },
    nextbutton: {
        width: 150,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#C7BABA'
    },
    button: {
        width: 70,
        margin: 10,
        borderRadius: 10,
        backgroundColor: 'black'
    },
    headerAndButtonText: {
        letterSpacing: 1.5,
        fontSize: 15
    },
    cancelButton: {
        color: 'red',
        letterSpacing: 1
    },
    text: {
        letterSpacing: 1.5,
        margin: 6
    }
});