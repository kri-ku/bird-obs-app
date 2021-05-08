import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

export default function NextButton({ title, onPress }) {
    return (
        <View style={{ marginTop: 5 }}>
            <Button
                buttonStyle={styles.nextbutton}
                titleStyle={styles.title}
                title={title} onPress={onPress}
            ></Button>
        </View>
    )
}
const styles = StyleSheet.create({
    nextbutton: {
        width: 150,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#C7BABA',
    },
    title: {
        color: 'white',
        letterSpacing: 2,
        fontSize: 16
    }
})