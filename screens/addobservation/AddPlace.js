import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Button, Input } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import API_KEY from '../../apikey'
import NextButton from '../../components/NextButton'
import AddingHeader from '../../components/AddingHeader'

// loading map is slow

export default function AddPlace({ route, navigation }) {
    const { observation } = route.params
    const [address, setAddress] = useState('')
    const [location, setLocation] = useState({ latitude: 60.200692, longitude: 24.934302 })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getLocation()
    }, [])

    const getLocation = async () => {
        let { status } = await Location.requestPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert('No permission to access location')
        } else {
            setIsLoading(true)
            let location = await Location.getCurrentPositionAsync({})
            setLocation({ ...location, latitude: location.coords.latitude, longitude: location.coords.longitude })
            await fetchAddress()
            setIsLoading(false)
        }
    }

    const onDragEvent = async (e) => {
        setLocation({ ...location, latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })
        await fetchAddress()
    }
    const fetchAddress = async () => {
        try {
            const url = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${API_KEY.API_KEY}&location=${location.latitude},${location.longitude}&includeRoadMetadata=true&includeNearestIntersection=true`
            let response = await fetch(url)
            let jsondata = await response.json()
            setAddress(jsondata.results[0].locations[0].street + ', ' + jsondata.results[0].locations[0].postalCode + ' ' + jsondata.results[0].locations[0].adminArea5)
        } catch (e) {
            console.error("ERROR", e)
        }
    }

    const navigateToAddTime = () => {
        const Observation = {
            photoname: observation.photoname,
            species: observation.species,
            place: `${address}`,
            time: observation.time,
            sex: observation.sex,
            quantity: observation.quantity,
            weather: observation.weather
        }
        navigation.navigate('AddTime', { observation: Observation })
    }

    return (
        <View style={styles.container}>
            <AddingHeader pagenumber={"3"} header={"Add place"}></AddingHeader>
            <Input
                value={address}
                onChangeText={text => setAddress(text)}
                returnKeyType="done"></Input>
            {isLoading ? (<ActivityIndicator size="large" color="black"></ActivityIndicator>)
                : (
                    <MapView
                        style={styles.map}
                        region={{
                            latitude: parseFloat(location.latitude),
                            longitude: parseFloat(location.longitude),
                            latitudeDelta: 0.0030,
                            longitudeDelta: 0.00500
                        }}
                    >
                        <Marker
                            draggable
                            coordinate={{
                                latitude: parseFloat(location.latitude),
                                longitude: parseFloat(location.longitude)
                            }}
                            onDragEnd={(e) => onDragEvent(e)}
                            tracksViewChanges={false}>
                        </Marker>

                    </MapView>
                )}
            <NextButton title="Next" onPress={navigateToAddTime}></NextButton>
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
    map: {
        flex: 1,
        height: 400,
        width: '100%'
    }

});