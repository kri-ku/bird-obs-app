import * as firebase from 'firebase';
import "firebase/auth"
import "firebase/database"
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

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
const database = firebase.database().ref('/observations')
const storage = firebase.storage().ref()

const saveObservation = (Observation) => {
  database.push(
    {
      'photoname': Observation.photoname || "",
      'species': Observation.species,
      'place': Observation.place,
      'time': Observation.time,
      'sex': Observation.sex,
      'quantity': Observation.quantity,
      'weather': Observation.weather
    }
  )
}

const savePicture = async (imageFilePath) => {

  const filename = imageFilePath.substring(imageFilePath.lastIndexOf('/') + 1);
  const response = await fetch(imageFilePath)
  var blob = await response.blob()
  var ref = storage.child(`images/${filename}`)
  return ref.put(blob)
}

const getObservations = () => {
  let obs = ''
  database.on('value', snapshot => {
    const data = snapshot.val()
    obs = Object.values(data)
  })
  return obs
}

const getImageDownloadUri = async (imageName) => {
  var ref = storage.child(`images/${imageName}`)
  var url = await ref.getDownloadURL()
  console.log("URLI FIREBASE TIEDOSTOSSA", url)
  return url
}

module.exports = { saveObservation, getObservations, savePicture, getImageDownloadUri }
