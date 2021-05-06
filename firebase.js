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



  /*database.child(`observations/${authentication.currentUser.uid}`).on('value', snapshot => {
    const data = snapshot.val()
    obs = Object.values(data)
    //console.log("DATA FIREBASESSA", obs)
  })
  return obs*/
}

const getUserData = async () => {
  let userdata = ''
  let ref = database.child(`users/${authentication.currentUser.uid}`)
  await ref.once('value', async (snapshot) => {
    const data = await snapshot.val()
    userdata = Object.values(data)
  })
  console.log("USERDATA FIREBASESA", userdata)
  return userdata
  /*database.child(`users/${authentication.currentUser.uid}`).on('value', snapshot => {
    const data = snapshot.val()
    userdata = Object.values(data)
  })
  return userdata*/


}

/*const getObservationById = (id) => {
  let obs = ''
  database.child(`observations/${authentication.currentUser.uid}/${id}`).on('value', snapshot => {
    const data = snapshot.val()
    obs = Object.values(data)
  })
  //console.log("DATA FIREBASESSA YKS", obs)
  return obs
}
*/

const removeItem = (time) => {
  //.child("place").child(placeId).removeValue();
  let value = database.child(`observations/${authentication.currentUser.uid}`).child(`timestamp/${time}`)
  console.log("VALUE FIREBASESA", value)
  value.removeValue()

  /*applesQuery.addListenerForSingleValueEvent(new ValueEventListener() {
      @Override
      public void onDataChange(DataSnapshot dataSnapshot) {
          for (DataSnapshot appleSnapshot: dataSnapshot.getChildren()) {
              appleSnapshot.getRef().removeValue();
          }
      }
  
      @Override
      public void onCancelled(DatabaseError databaseError) {
          Log.e(TAG, "onCancelled", databaseError.toException());
      }
  });*/
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
