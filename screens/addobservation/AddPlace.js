import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import { Button, Input } from 'react-native-elements';
//import Mapview from '../../components/Mapview';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import API_KEY from '../../apikey'

export default function AddPlace({ route, navigation }) {
    const { observation } = route.params
    //console.log("PROPSIT ADDPLACESSA", observation) //toimii
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
        //console.log(e.nativeEvent)
        setLocation({ ...location, latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })
        await fetchAddress()
    }

    const fetchAddress = async () => {
        try {
            //console.log("OLLAAN FETCHISSÖ")
            const url = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${API_KEY.API_KEY}&location=${location.latitude},${location.longitude}&includeRoadMetadata=true&includeNearestIntersection=true`
            //console.log(url)
            let response = await fetch(url)
            let jsondata = await response.json()
            //console.log(jsondata)
            setAddress(jsondata.results[0].locations[0].street +', '+ jsondata.results[0].locations[0].postalCode + ' ' + jsondata.results[0].locations[0].adminArea5)
            //console.log("SETADDRESSIN JÄLKEEN", JSON.stringify(address))
            //let data = await response.json()
            //console.log("LOCATION FETCHISSÄ", data.locations)
        } catch (e) {
            console.error("ERROR", e)
        }

        //return data.locations

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
            <View style={{ width: '100%', marginLeft: 10, marginBottom: 20 }}>
                <Text style={{ color: '#C7BABA' }}>Add bird 3/7</Text>
                <Text style={{ fontSize: 20 }}>Lisää paikka</Text>
                <Text>Käytä nykyistä sijaintia tai raahaa sijaintiasi</Text>
            </View>
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
                            onDragEnd={(e) => onDragEvent(e)}>
                        </Marker>

                    </MapView>
                )}
            <Button buttonStyle={styles.nextbutton} titleStyle={{ color: 'white' }} title="Seuraava" onPress={navigateToAddTime}></Button>
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
    nextbutton: {
        width: 150,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#C7BABA'
    },
    map: {
        flex: 1,
        height: 400,
        width: '100%'
    }
});