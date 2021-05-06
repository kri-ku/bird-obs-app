import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'

export default function AddingHeader({ pagenumber, header }) {
    const navigation = useNavigation()
    return (
        <View style={styles.header}>
            <Text style={{ color: '#C7BABA' }}>Add bird {pagenumber}/6</Text>
            <Text style={styles.headerAndButtonText}>{header}</Text>
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
        paddingTop: 40,
        marginBottom: 20,
        backgroundColor: 'white',
        paddingLeft: 5

    },
    headerAndButtonText: {
        letterSpacing: 1.5,
        fontSize: 15
    },
    cancelButton: {
        color: 'red',
        letterSpacing: 1
    },
})