import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { getObservations } from '../firebase'
import { useIsFocused } from '@react-navigation/native'

export default function AddedObservations({ navigation, route }) {
    const [data, setData] = useState([])
    const isFocused = useIsFocused()

    const setObservations = async () => {
        const db = await getObservations()
        setData(db)
      }

    useEffect(() => {
        setObservations()
    }, [])


    const renderImageComponent = (address) => {
        return (
            <Image style={{ height: 200, width: 200 }} source={{ uri: `${address}` }}></Image>
        )
    }
    const splitdate = (date) => {
        return date.substr(0, 25)
    }

    const navigateToOneObservation = (index) => {
        const obs = data[index]
        navigation.navigate('OneObservation', { observation: obs })
    }

    const renderItem = (observation, index) => {
        // large xlarge
        return (
            <ListItem key={observation.id} containerStyle={{ backgroundColor: '#D7ECEF' }} onPress={() => navigateToOneObservation(index)} bottomDivider>

                {observation.photoname === "" ?
                    (<Avatar rounded size="large" source={require('../pictures/avatar3.png')}></Avatar>) :
                    (<Avatar rounded size="large" ImageComponent={() => renderImageComponent(observation.photoname)}></Avatar>)}

                <ListItem.Content>
                    <ListItem.Title style={{ letterSpacing: 2, fontWeight: 'bold' }}>{observation.species}</ListItem.Title>
                    <ListItem.Subtitle style={{ letterSpacing: 2 }}>{splitdate(observation.time)}</ListItem.Subtitle>
                </ListItem.Content>

                <ListItem.Chevron></ListItem.Chevron>
            </ListItem>

        )
    }

    const Header = () => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerAndButtonText}>Welcome to see your observations</Text>
                <TouchableOpacity onPress={() => navigation.navigate('home')}>
                    <Text style={styles.cancelButton}>Back to Home</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View>
            {data !== [] ? (<FlatList
                ListHeaderComponent={<Header></Header>}
                stickyHeaderIndices={[0]}
                data={data}
                renderItem={({ item, index }) => renderItem(item, index)}
                keyExtractor={(obs, index) => index.toString()}>
            </FlatList>) : (<Text style={{letterSpacing: 3, fontSize: 20}}>You don't have any observations yet!</Text>)}
        </View>
    )
}

const styles = StyleSheet.create({

    header: {
        width: '100%',
        height: 110,
        paddingTop: 50,
        backgroundColor: 'white',
        paddingLeft: 6
    },
    cancelButton: {
        color: 'red',
        letterSpacing: 1
    },
    headerAndButtonText: {
        letterSpacing: 1.5,
        fontSize: 15
    },
})