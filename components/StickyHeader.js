import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'


export default function StickyHeader({ heading }) {
    const navigation = useNavigation()
    return (
        <View style={styles.header}>
            <Text style={styles.headerAndButtonText}>{heading}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('home')}>
                <Text style={styles.cancelButton}>Back to Home</Text>
            </TouchableOpacity>
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
    }
})