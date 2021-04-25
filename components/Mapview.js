import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import API_KEY from '../apikey'

export default function Map() {
    const [location, setLocation] = useState({ latitude: 60.200692, longitude: 24.934302, latitudeDelta: 0.0322, longitudeDelta: 0.0221 })
    const [isLoading, setIsLoading] = useState(false) //should i use this when dowloading?

    const api_key = API_KEY
    const url = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${API_KEY}&location=${location.latitude},${location.longitude}&includeRoadMetadata=true&includeNearestIntersection=true`
    //http://www.mapquestapi.com/geocoding/v1/reverse?key=KnHd7lruMpGlhnJTiu1uV7la1W4Q5tAQ&location=60.200692,24.934302&includeRoadMetadata=true&includeNearestIntersection=true

    // if location is not abled make something else??

    useEffect(() => {
        getLocation()
        //console.log("LOCATION ON", location)
    }, [])

    const getLocation = async () => {
        let { status } = await Location.requestPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert('No permission to access location')
        } else {
            setIsLoading(true)
            let location = await Location.getCurrentPositionAsync({})
            //setLocation(location)
            setLocation({ ...location, latitude: location.coords.latitude, longitude: location.coords.longitude })
            //console.log("LOCATION ON", location)
            setIsLoading(false)
        }
    }

    const onDragEvent = async (e) => {
        console.log(e.nativeEvent)
        setLocation({ ...location, latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })
        //tähän se osoite??
        let address = await fetchAddress()
        //Alert.alert("use this?")

        /*Alert.alert('Use this place?',
            [
                {
                    //navigate to add page
                    text: "Confirm",
                    onPress:()=> console.log("confrim pressed")

                },
                {
                    //back to map
                    text: "Cancel",
                    onPress:()=> console.log("cancel pressed")

                }
            ])*/

    }

    const fetchAddress = async () => {
        try {
            console.log("OLLAAN FETCHISSÖ")
            let response = await fetch(url)
            console.log(response)
            //let data = await response.json()
            //console.log("LOCATION FETCHISSÄ", data.locations)
        } catch (e) {
            console.error("ERROR", e)
        }

        //return data.locations

    }

    if (isLoading) {
        return (
            <ActivityIndicator size="large" color="black"></ActivityIndicator>
        )
    } else {

        return (
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
                    onDragEnd={(e) => onDragEvent(e)}>
                </Marker>

            </MapView>

        )
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        height: 400,
        width: '100%'
    }

})



