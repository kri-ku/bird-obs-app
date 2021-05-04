import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker'
import { savePicture, getImageDownloadUri } from '../../firebase'

export default function AddPicture({ route, navigation }) {

    const [hasCameraPermission, setCameraPermission] = useState(null)
    const [photoName, setPhotoname] = useState(null)
    const { observation } = route.params
    const Observation = observation
    const [photoTaken, setPhotoTaken] = useState(false)

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

    const snap = async () => {
        if (camera) {
            const photo = await camera.current.takePictureAsync({ base64: true })
            const uri = await photo.uri
            setPhotoname(await uri)
            setPhotoTaken(true)
            setCameraVisible(false)
        }
    }

    const uploadImageFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3], //editing photo
            quality: 1  //max quality, 0 = small size
        })

        if (!result.cancelled) {
            setPhotoname(result.uri)
            setPhotoTaken(true)
        }
    }

    const savePictureToDatabase = async () => {
        const filename = photoName.substring(photoName.lastIndexOf('/') + 1);
        const picturesaving = await savePicture(photoName)
        const downloadUri = await getImageDownloadUri(filename)

        const Observation = {
            photoname: downloadUri,
            species: observation.species,
            place: observation.place,
            time: observation.time,
            sex: observation.sex,
            quantity: observation.quantity,
            weather: observation.weather
        }
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
                <View style={{ marginBottom: 50 }}>
                    <View style={styles.buttonandicon}>
                        <Icon type="font-awesome-5" name="camera-retro" size={80} onPress={() => setCameraVisible(true)}></Icon>
                        <Text style={{ color: '#C7BABA' }}>Take picture!</Text>
                    </View>

                    <View style={styles.buttonandicon}>
                        <Icon type="font-awesome-5" name="cloud-upload-alt" size={80} onPress={() => uploadImageFromGallery()}></Icon>
                        <Text style={{ color: '#C7BABA' }}>Upload picture!</Text>
                    </View>
                </View>
                <Button buttonStyle={styles.nextbutton} titleStyle={{ color: 'white' }} title="No photo" onPress={() => navigation.navigate('AddName', { observation: Observation })}></Button>
            </View>
        )
    }

    const renderPicture = () => {
        return (
            <View style={{ alignItems: 'center' }}>
                <View>
                    <Text style={styles.text}>Are you happy with this picture?</Text>
                </View>
                <Image resizeMode='contain' style={{ height: 450, width: 450 }} source={{ uri: photoName }}></Image>
                <View style={{ flexDirection: 'row' }}>
                    <Button title="Take new" buttonStyle={styles.nextbutton} titleStyle={styles.headerAndButtonText} onPress={() => handlePictureCancel()}></Button>
                    <Button title="Confirm" buttonStyle={styles.nextbutton} titleStyle={styles.headerAndButtonText} onPress={() => savePictureToDatabase()}></Button>
                </View>
            </View>
        )
    }

    if (isCameraVisible) {
        return (renderCamera())

    } else {
        return (
            <View style={styles.container}>

                <View style={{ width: '100%', marginLeft: 10, marginBottom: 20, marginTop: 30 }}>
                    <Text style={{ color: '#C7BABA' }}>Add bird 1/6</Text>
                    <Text style={styles.headerAndButtonText}>Do you have a picture of your observation?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('home')}>
                        <Text style={styles.cancelButton}>Back to Home</Text>
                    </TouchableOpacity>
                </View>

                {photoTaken ? renderPicture()
                    : (
                        <View>
                            {hasCameraPermission ? (renderFrontPage()) : (<Text>No permission to use camera!</Text>)}
                        </View >
                    )
                }
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
    },
    cancelButton: {
        color: 'red',
        letterSpacing: 1
    },
    text: {
        letterSpacing: 2,
        marginBottom: 6
    },

});