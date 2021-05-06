import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import NextButton from '../../components/NextButton';
import AddingHeader from '../../components/AddingHeader';

export default function AddTime({ route, navigation }) {
    const { observation } = route.params
    const [datePickerVisibility, setDatePickerVisibility] = useState(false)
    const [dateToPrint, setDateToPrint] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => { makePrintableDate() }, [date])

    const handleConfirm = (date) => {
        setDate(date)
        makePrintableDate()
        hideDatePicker()
    }

    const makePrintableDate = () => {
        if (date === '') {
            setDateToPrint('')
        } else {
            setDateToPrint(`time: ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}, date: ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`)
        }
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

            <AddingHeader pagenumber={"4"} header={"What was the time?"}></AddingHeader>

            <View style={styles.buttonandicon}>
                <Icon type="font-awesome-5" name="calendar-alt" size={80} onPress={showDatePicker}></Icon>
                <Text style={{ color: '#C7BABA', marginTop: 10 }}>Open calendar!</Text>
            </View>
            <DateTimePickerModal
                isVisible={datePickerVisibility} mode='datetime'
                onConfirm={handleConfirm} onCancel={hideDatePicker} date={new Date()}
                locale="en_GB"></DateTimePickerModal>
            <Text style={styles.text}>{dateToPrint}</Text>
            <NextButton title="Next" onPress={navigateToAddSexAndQuantity}></NextButton>
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
    buttonandicon: {
        borderColor: '#C7BABA',
        borderWidth: 1,
        borderRadius: 10,
        width: 180,
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        marginTop: 100,
        backgroundColor: 'white'
    },
    text: {
        letterSpacing: 1.5,
        margin: 6
    },
});