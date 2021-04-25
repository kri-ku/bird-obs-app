import React from 'react';
import { Image } from 'react-native';

export default function Logo() {
    return(
        <Image resizeMode='contain' style={{height:150, width:150}} source={require('../pictures/circle-cropped.png')}></Image>
    )

}