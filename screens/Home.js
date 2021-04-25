import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import {Divider, Header } from 'react-native-elements';
import Logo from '../components/logo';
import { Button } from 'react-native-elements';
import Name from './addobservation/AddName';

export default function Home({navigation}) {

  const Observation = {
    picture:{photoName:'', photoBase64: ''},
    species:'',
    place:'',
    time:'',
    sex: '',
    quantity: 0,
    weather: []
  }


  return (
    <View style={styles.container}>
      <Header style={{height: 80}}
      containerStyle={{backgroundColor: '#C7BABA', justifyContent:'center'}}
      leftComponent={{text:'Hello JORMA!', style:{width:150, color:'white', marginTop: 30, marginLeft: 20, fontSize: 20}}}
      rightComponent={<Image resizeMode='contain' style={{height:80, width:80}} source={require('../pictures/circle-cropped.png')}></Image>}></Header>
      <Divider style={{backgroundColor: 'black', width: '90%', height: 1}}></Divider>

      <View style={{flex:1.5}}>

      <Button buttonStyle={styles.button} titleStyle={{color:'white'}} title="Add observation" onPress={()=> navigation.navigate('AddPicture', {observation: Observation})}></Button>
      <Button buttonStyle={styles.button} titleStyle={{color:'white'}} title="See observations" onPress={()=> navigation.navigate('Added Observations')}></Button>
      <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 0.3,
    marginTop:50
  },
  button:{
    width: 300,
    margin: 10,
    borderRadius:10,
    backgroundColor:'#C7BABA',
    
}
});