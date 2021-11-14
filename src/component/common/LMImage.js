import React from 'react';
import FastImage from 'react-native-fast-image';

export default function LMImage({...rest}) {
    return (
        <FastImage resizeMode={'cover'}  {...rest}/>
    );
}
