import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';

export default function ConfirmPicture({ route, navigation }) {
    const { observation } = route.params
    const Observation = observation
    console.log("PROPSIT CONFIRMISSA", observation)

    return (
        <View style={styles.container}>
            <View>
                <Text>Oletko tyytyväinen?</Text>
            </View>
            <Image style={{ flex: 1 }} source={{ uri: observation.photoName }}></Image>
            <Image style={{ flex: 1 }} source={{ uri: `data:image/gif;base64,${observation.photoBase64}` }}></Image>
            <View style={{ flexDirection: 'row' }}>
                <Button title="Take new" ></Button>
                <Button title="Confirm" onPress={()=> navigation.navigate('AddName', {observation: Observation})}></Button>

            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
})