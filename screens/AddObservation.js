import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { Slider, Input, CheckBox, Button, Icon, ButtonGroup } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { color } from 'react-native-reanimated';
import shouldUseActivityState from 'react-native-screens'


const SetSexButtons = ({ observation }) => {
  const buttons = ['uros', 'naaras', 'lauma']
  let selectedIndex = 0
  return (
    <View></View>
  )
}

// date observer weather
export default function AddObservation({navigation}) {
  const [observation, setObservation] = useState({ species: '', place: '', datetime: {}, sex: '', amount: 0 })
  const [datePickerVisibility, setDatePickerVisibility] = useState(false)
  const [dateToPrint, setDateToPrint] = useState('')
  const buttons = ['uros', 'naaras', 'lauma']
  const [selectedIndex, setSelectedIndex] = useState(2)


  const handleConfirm = (date) => {
    console.log('DATE', typeof (date))
    makePrintableDate()
    setObservation({ ...observation, datetime: date })
    hideDatePicker()

  }

  const makePrintableDate = () => {
    if (observation.datetime === {}) {
      setDateToPrint('')
    } else {
      setDateToPrint(`${observation.datetime.getHours}:${observation.datetime.getMinutes},  ${observation.datetime.getDate}.${observation.datetime.getMonth + 1}.${observation.datetime.getFullYear}`)
      // <Text>{observation.datetime.getHours}:{observation.datetime.getMinutes},  {observation.datetime.getDate}.{observation.datetime.getMonth + 1}.{observation.datetime.getFullYear}</Text>
    }
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const updateIndex = (index) => {
    setSelectedIndex({ index })
    console.log("INDEKSIII", index)

  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>

        <Input label="laji" name="species"
          onChangeText={text => setObservation({ ...observation, species: text })}></Input>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Input label="paikka" name="place"
            onChangeText={text => setObservation({ ...observation, place: text })}></Input>
          <Icon reverse name='map' iconStyle={{ padding: 10, borderRadius: 1, color: '#C7BABA' }} raised={true}
          onPress={()=>console.log("MOI")}></Icon>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Input label="aika" name="aika"
            onFocus={showDatePicker}
            placeholder={dateToPrint}></Input>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Button buttonStyle={styles.timebutton} titleStyle={{ color: 'white' }} title=" aseta aika" onPress={showDatePicker}></Button>
          <Text>{dateToPrint}</Text>
        </View>

        <DateTimePickerModal
          isVisible={datePickerVisibility} mode='datetime'
          onConfirm={handleConfirm} onCancel={hideDatePicker}></DateTimePickerModal>

        <ButtonGroup
          buttons={buttons}
          containerStyle={styles.button}
          selectedIndex={selectedIndex}
          onPress={() => updateIndex(selectedIndex)}
          buttonContainerStyle={{ backgroundColor: '#C7BABA' }}
          textStyle={{ color: 'white' }}
          selectedButtonStyle={{ backgroundColor: 'black' }}>
        </ButtonGroup>

        <View style={{ width: '100%', alignItems: 'flex-start' }}>
          <View style={{ flexDirection: 'row', alignContent: 'center' }}>
            <CheckBox title='aurinkoinen' size={10} checkedColor={'blue'}></CheckBox>
            <CheckBox title='lämmin' size={10}></CheckBox>
            <CheckBox title='kuuma' size={10}></CheckBox>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <CheckBox title='sadetta' size={14}></CheckBox>
            <CheckBox title='rankkasade' size={14}></CheckBox>
            <CheckBox title='lunta' size={14}></CheckBox>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <CheckBox title='kylmä' size={14}></CheckBox>
            <CheckBox title='loskaa' size={14}></CheckBox>
          </View>
        </View>

        <Slider value={observation.amount}
          maximumValue={9000000}
          minimumValue={1}
          trackStyle={{ height: 10, backgroundColor: 'red' }}
          thumbTouchSize={{ height: 20, width: 20 }}
          thumbProps={{
            Component: Animated.Image,
            source: {
              uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            },
          }}
          step={1}></Slider>
      </View>

      <Button buttonStyle={styles.button} titleStyle={{ color: 'white' }} title="TALLENNA" onPress={() => console.log(observation) || setObservation({})}></Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  button: {
    width: 300,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#C7BABA'
  },
  timebutton: {
    width: 150,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#C7BABA'

  },
  form: {
    width: '80%',
    alignItems: 'flex-start',
    padding: 20,
    marginTop: 20
  }
});