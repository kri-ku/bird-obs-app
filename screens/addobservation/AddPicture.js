import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
//import * as Permissions from 'expo-Permissions'
import { Camera } from 'expo-camera';
//import ConfirmPicture from './ConfirmPicture'
//import ImagePicker from 'react-native-image-picker'
//var ImagePicker = require('react-native-image-picker')
//import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker'
import { savePicture } from '../../firebase_config'

export default function AddPicture({ route, navigation, navigation: { setParams } }) {

    // TODO POISTA PHOTOBASE64?

    const [hasCameraPermission, setCameraPermission] = useState(null)
    const [photoName, setPhotoname] = useState(null) //tiedostoviittaus
    //const [photoBase64, setPhotoBase64] = useState(null) // kuvan siältö encoded
    const { observation } = route.params
    const Observation = observation
    //console.log("PROPSIT KAMERASSA", observation)
    const [photoTaken, setPhotoTaken] = useState(false)
    //const [loading, setLoading] = useState(false)

    const camera = useRef(null)
    const [isCameraVisible, setCameraVisible] = useState(false)

    useEffect(() => {
        askCameraPermission()
        askCameraRollPermission()
    }, [])

    const askCameraPermission = async () => {
        const { status } = await Camera.requestPermissionsAsync()
        setCameraPermission(status === 'granted')
    }

    const askCameraRollPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert('Sorry camera roll permission necessary!')
        }

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
            const uri = await photo.uri
            //const base64 = await photo.base64
            //console.log(uri)
            //console.log(base64)
            setPhotoname(await uri)
            //setPhotoBase64(await base64)
            setPhotoTaken(true)
            setCameraVisible(false)
            {/*const Observation = {
                picture: { photoName: { uri }, photoBase64: { base64 } },
                species: observation.species,
                place: observation.place,
                time: observation.time,
                sex: observation.sex,
                quantity: observation.quantity,
                weather: observation.weather
            }
            console.log("Observationin kuva", Observation.picture.photoNamephotoName)
            //console.log("Observationin 64", Observation.picture.photoBase64)
            navigation.navigate('ConfirmPicture', { observation: Observation }) */}
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

    const uploadImageFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3], //kuvan editoimiseen?
            quality: 1  //max quality, 0 = small size
        })
        //console.log("GALLERIAN RESULT", result)

        if (!result.cancelled) {
            setPhotoname(result.uri)
            setPhotoTaken(true)
        }
    }

    const savePictureToDatabase = async () => {
        // TODO save picture to db, save the path to params and send params to add name page
        //console.log("SNAPISSA KUVAN OSOSITE", photoName)
        //setLoading(true)
        const filename = photoName.substring(photoName.lastIndexOf('/') + 1);
        const picturesaving = await savePicture(photoName)
        //setLoading(false)
        console.log("DOWNLOAD URL", filename) // tää Observationiin?

        const Observation = {
            photoname: filename,
            species: observation.species,
            place: observation.place,
            time: observation.time,
            sex: observation.sex,
            quantity: observation.quantity,
            weather: observation.weather
        }
        //console.log("Observationin kuva", Observation.picture.photoNamephotoName)
        //console.log("Observationin 64", Observation.picture.photoBase64)
        navigation.navigate('AddName', { observation: Observation })
    }

    const handlePictureCancel = () => {
        setPhotoTaken(false)
        setCameraVisible(false)
    }

    const renderCamera = () => {
        return (
            <View style={{ flex: 1 }}>
                <Camera style={{ flex: 4, height: 500, width: 400 }} ref={camera}></Camera>
                <Button title="Take picture" onPress={snap}></Button>
            </View>
        )

    }

    const renderFrontPage = () => {
        return (
            <View style={{ alignItems: 'center' }}>
                <View style={styles.buttonandicon}>
                    <Icon type="font-awesome-5" name="camera-retro" size={80} onPress={() => setCameraVisible(true)}></Icon>
                    <Text style={{ color: '#C7BABA' }}>Take picture!</Text>
                </View>

                <View style={styles.buttonandicon}>
                    <Icon type="font-awesome-5" name="cloud-upload-alt" size={80} onPress={() => uploadImageFromGallery()}></Icon>
                    <Text style={{ color: '#C7BABA' }}>Upload picture!</Text>
                </View>
            </View>
        )
    }

    const renderPicture = () => {
        return (
            <View>
                <View>
                    <Text>Oletko tyytyväinen?</Text>
                </View>
                <Image style={{ height: 170, width: 200 }} source={{ uri: photoName }}></Image>
                <View style={{ flexDirection: 'row' }}>
                    <Button title="Take new" onPress={() => handlePictureCancel()}></Button>
                    <Button title="Confirm" onPress={() => savePictureToDatabase()}></Button>
                    {/*<Button title="Confirm" onPress={() => navigation.navigate('AddName', { observation: Observation })}></Button>*/}
                </View>
            </View>
        )

    }

    /* photoName ? renderPicture()
                    : (
                        <View>
                            {hasCameraPermission ? (renderFrontPage()) : (<Text>No permission to use camera!</Text>)}
                        </View >
                    )*/

    if (isCameraVisible) {
        return (renderCamera())

    } else {
        return (
            <View style={styles.container}>
                <View style={{ width: '100%', marginLeft: 10, marginBottom: 20 }}>
                    <Text style={{ color: '#C7BABA' }}>Add bird 1/7</Text>
                    <Text style={{ fontSize: 20 }}>Onko havainnostasi kuvaa?</Text>
                </View>
                {photoTaken ? renderPicture()
                    : (
                        <View>
                            {hasCameraPermission ? (renderFrontPage()) : (<Text>No permission to use camera!</Text>)}
                        </View >
                    )
                }
                <Button buttonStyle={styles.nextbutton} titleStyle={{ color: 'white' }} title="Seuraava" onPress={() => navigation.navigate('AddName', { observation: Observation })}></Button>
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