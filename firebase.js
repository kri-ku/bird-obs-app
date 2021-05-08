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
  messagingSenderId: passwordfile.messagingSenderId,
};

firebase.initializeApp(firebaseConfig)
const database = firebase.database().ref()
const storage = firebase.storage().ref()
const authentication = firebase.auth()

const saveObservation = async (Observation) => {
  const ref = database.child(`observations/${authentication.currentUser.uid}`)
  const key = (await ref.push()).key
  await ref.child(key).set(
    {
      "id": key,
      'photoname': Observation.photoname || "",
      'species': Observation.species || "",
      'place': Observation.place || "",
      'time': Observation.time || "",
      'sex': Observation.sex || "",
      'quantity': Observation.quantity || "",
      'weather': Observation.weather || "",
      "user": authentication.currentUser.uid,
      "timestamp": Date.now()
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

const getObservations = async () => {
  let obs = ''
  let ref = database.child(`observations/${authentication.currentUser.uid}`)
  await ref.once('value', async (snapshot) => {
    const data = await snapshot.val()
    obs = Object.values(data)
  })
  return obs
}

const getUserData = async () => {
  let userdata = ''
  let ref = database.child(`users/${authentication.currentUser.uid}`)
  await ref.once('value', async (snapshot) => {
    const data = await snapshot.val()
    userdata = Object.values(data)
  })
  return userdata
}

const removeItem = (id) => {
  database.child(`observations/${authentication.currentUser.uid}/${id}`).set(null)
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

const signOut = async () => await authentication.signOut()
// not used anywhere atm
const doPasswordReset = async (email) => await authentication.sendPasswordResetEmail(email)
const doPasswordUpdate = async (password) => await authentication.currentUser.updatePassword(password)

module.exports = {
  database,
  saveObservation, getObservations, savePicture, getImageDownloadUri, signUp, signIn, authentication, writeUserData, getUserData,
  signOut, removeItem
}
