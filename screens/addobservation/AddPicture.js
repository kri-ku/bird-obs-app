import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
//import * as Permissions from 'expo-Permissions'
import { Camera } from 'expo-camera';
//import ConfirmPicture from './ConfirmPicture'

export default function AddPicture({ route, navigation, navigation: { setParams } }) {

    const [hasCameraPermission, setCameraPermission] = useState(null)
    const [photoName, setPhotoname] = useState('') //tiedostoviittaus
    const [photoBase64, setPhotoBase64] = useState('') // kuvan siältö encoded
    const { observation } = route.params
    const Observation = observation
    console.log("PROPSIT KAMERASSA", observation)

    const camera = useRef(null)
    const [isCameraVisible, setCameraVisible] = useState(false)

    useEffect(() => { askCameraPermission() }, [])

    const askCameraPermission = async () => {
        const { status } = await Camera.requestPermissionsAsync()
        setCameraPermission(status === 'granted')
    }

    /*const takePicture = async () => {
        if (camera) {
            const photo = await camera.current.takePictureAsync({ base64: true })
            setPhotoname(photo.uri)
            setPhotoBase64(photo.base64)
        }
    }*/

    const snap = async () => {
        if (camera) {
            const photo = await camera.current.takePictureAsync({ base64: true })
            setPhotoname(await photo.uri)
            setPhotoBase64(await photo.base64)
            setCameraVisible(false)
            const Observation = {
                picture: { photoName: 'PHOTONAME', photoBase64: `PHOTOBASE` },
                species: observation.species,
                place: observation.place,
                time: observation.time,
                sex: observation.sex,
                quantity: observation.quantity,
                weather: observation.weather
            }
            navigation.navigate('ConfirmPicture', { observation: Observation })
        }
    }

    /*const confirmPicture = () => {
        return (
            <View>
                <Image style={{ flex: 1 }} source={{ uri: photoName }}></Image>
                <Image style={{ flex: 1 }} source={{ uri: `data:image/gif;base64,${photoBase64}` }}></Image>
            </View>
        )
    }*/

    if (isCameraVisible) {
        return (
            <View style={{ flex: 1 }}>
                <Camera style={{ flex: 4, height: 500, width: 400 }} ref={camera}></Camera>
                <Button title="Take picture" onPress={snap}></Button>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={{ width: '100%', marginLeft: 10, marginBottom: 20 }}>
                    <Text style={{ color: '#C7BABA' }}>Add bird 1/7</Text>
                    <Text style={{ fontSize: 20 }}>Onko havainnostasi kuvaa?</Text>
                </View>
                <View>
                    {hasCameraPermission ?
                        (<View style={{ alignItems: 'center' }}>
                            <View style={styles.buttonandicon}>
                                <Icon type="font-awesome-5" name="camera-retro" size={80} onPress={() => setCameraVisible(true)}></Icon>
                                <Text style={{ color: '#C7BABA' }}>Ota kuva!</Text>
                            </View>

                            <View style={styles.buttonandicon}>
                                <Icon type="font-awesome-5" name="cloud-upload-alt" size={80}></Icon>
                                <Text style={{ color: '#C7BABA' }}>Lataa kuva!</Text>
                            </View>
                        </View>
                        ) : (<Text>No permission to use camera!</Text>)}
                </View >
                <Button buttonStyle={styles.nextbutton} titleStyle={{ color: 'white' }} title="Seuraava" onPress={()=> navigation.navigate('AddName', { observation: Observation })}></Button>
            </View>


        )
    }

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
    choicebutton: {
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