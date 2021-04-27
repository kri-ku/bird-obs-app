import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function AddTime({ route, navigation }) {
    const { observation } = route.params
    console.log("PROPSIT ADDTIMESSA", observation)
    const [datePickerVisibility, setDatePickerVisibility] = useState(false)
    const [dateToPrint, setDateToPrint] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => { makePrintableDate() }, [date])

    const handleConfirm = (date) => {
        //console.log('DATE', typeof (date), ' ', JSON.stringify(date))
        setDate(date)
        makePrintableDate()
        hideDatePicker()

    }

    const makePrintableDate = () => {
        //console.log("DATEN PVM", date.getDate)
        if (date === '') {
            setDateToPrint('')
        } else {
            //setDateToPrint(date.getHours()+ 'kissa')
            setDateToPrint(`${date.getHours()}:${date.getMinutes()},  ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`)        }
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true)
    }

    const navigateToAddSexAndQuantity = () => {
        const Observation = {
            photoname: observation.photoname,
            species: observation.species,
            place: observation.place,
            time: `${date}`,
            sex: observation.sex,
            quantity: observation.quantity,
            weather: observation.weather
        }
        navigation.navigate('AddSexAndQuantity', { observation: Observation })
    }
    return (
        <View style={styles.container}>
            <View style={{ width: '100%', marginLeft: 10, marginBottom: 20, marginTop: 10 }}>
                <Text style={{ color: '#C7BABA' }}>Add bird 4/7</Text>
                <Text style={{ fontSize: 20 }}>Lisää aika</Text>
            </View>

            <View style={styles.buttonandicon}>
                <Icon type="font-awesome-5" name="calendar-alt" size={80} onPress={showDatePicker}></Icon>
                <Text style={{ color: '#C7BABA', marginTop: 10 }}>Open calendar!</Text>
            </View>
            <DateTimePickerModal
                isVisible={datePickerVisibility} mode='datetime'
                onConfirm={handleConfirm} onCancel={hideDatePicker} date={new Date()}
                locale="en_GB"></DateTimePickerModal>
            <Text>{dateToPrint}</Text>
            <Button buttonStyle={styles.nextbutton} titleStyle={{ color: 'white' }} title="Seuraava" onPress={navigateToAddSexAndQuantity}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    nextbutton: {
        width: 150,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#C7BABA'
    },
    buttonandicon: {
        borderColor: '#C7BABA',
        borderWidth: 1,
        borderRadius: 10,
        width: 180,
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    }
});