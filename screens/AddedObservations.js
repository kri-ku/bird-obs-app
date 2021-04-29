import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { Button, Icon, ListItem, Avatar } from 'react-native-elements';
import { getObservations } from '../firebase'


export default function AddedObservations() {
    const [data, setData] = useState([])

    useEffect(() => {
        const obs = getObservations()
        setData(obs)
    }, [])

    const renderImageComponent = (address) => {
        return (
            <Image style={{ height: 200, width: 200 }} source={{ uri: `${address}` }}></Image>
        )
    }

    const renderItem = (observation) => {
        // large xlarge
        return (
            <ListItem key={observation.id} bottomDivider>
                {observation.photoname === "" ? (
                    <Avatar rounded size="large" source={require('../pictures/avatar2.png')}></Avatar>
                ): (<Avatar rounded size="large" ImageComponent={() => renderImageComponent(observation.photoname)}></Avatar>)}
                
                
                <ListItem.Content>
                    <ListItem.Title>{observation.species}</ListItem.Title>
                    <ListItem.Subtitle>{observation.time}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron></ListItem.Chevron>
            </ListItem>

        )
    }

    return (
        <View>
            <Text>moi täällä ollaan</Text>
            <FlatList
                data={data}
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={obs => obs.id}>
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})