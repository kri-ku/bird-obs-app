import * as firebase from 'firebase';
import "firebase/auth"
import "firebase/database"
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import { Alert } from 'react-native';

const passwordfile = require('./firebase_passwords')

const firebaseConfig = {
  apiKey: passwordfile.apiKey,
  authDomain: passwordfile.authDomain,
  databaseURL: passwordfile.databaseURL,
  projectId: passwordfile.projectId,
  storageBucket: passwordfile.storageBucket,
  // gs://bird-observation-app.appspot.com
  messagingSenderId: passwordfile.messagingSenderId,
  //appId: 'app-id',
  //measurementId: 'G-measurement-id',
};

firebase.initializeApp(firebaseConfig)
const database = firebase.database().ref()
const storage = firebase.storage().ref()
const authentication = firebase.auth()

const saveObservation = async (Observation) => {
  const ref = database.child(`observations/${authentication.currentUser.uid}`)
  await ref.push(
    {
      'photoname': Observation.photoname || "",
      'species': Observation.species || "",
      'place': Observation.place || "",
      'time': Observation.time || "",
      'sex': Observation.sex || "",
      'quantity': Observation.quantity || "",
      'weather': Observation.weather || "",
      "user": authentication.currentUser.uid
    }
  )
}

const savePicture = async (imageFilePath) => {
  const filename = imageFilePath.substring(imageFilePath.lastIndexOf('/') + 1);
  const response = await fetch(imageFilePath)
  var blob = await response.blob()
  var ref = storage.child(`images/${authentication.currentUser.uid}/${filename}`)
  return ref.put(blob)
}

const writeUserData = async (email, name) => {
  await database.child(`users/${authentication.currentUser.uid}`).push({
    'username': name,
    'email': email
  })
}

const getObservations = () => {
  let obs = ''
  database.child(`observations/${authentication.currentUser.uid}`).on('value', snapshot => {
    const data = snapshot.val()
    obs = Object.values(data)
  })
  return obs
}

const getUserData = () => {
  let userdata = ''
  database.child(`users/${authentication.currentUser.uid}`).on('value', snapshot => {
    const data = snapshot.val()
    userdata = Object.values(data)
  })
  return userdata
}

const getImageDownloadUri = async (imageName) => {
  var ref = storage.child(`images/${authentication.currentUser.uid}/${imageName}`)
  var url = await ref.getDownloadURL()
  return url
}

const signUp = async (email, password) => {
  try {
    await authentication.createUserWithEmailAndPassword(email, password)
    Alert.alert("Account was created!")
  } catch (error) {
    console.log(error)
  }
}

const signIn = async (email, password) => {
  try {
    await authentication.signInWithEmailAndPassword(email, password)
  } catch (err) {
    console.log(err)
  }
}

// not used anywhere atm
const signOut = async () => await authentication.signOut()
const doPasswordReset = async (email) => await authentication.sendPasswordResetEmail(email)
const doPasswordUpdate = async (password) => await authentication.currentUser.updatePassword(password)

module.exports = { saveObservation, getObservations, savePicture, getImageDownloadUri, signUp, signIn, authentication, writeUserData, getUserData }
