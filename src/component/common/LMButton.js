import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {darkBlue} from './LMStyle';

export default function LMButton({...rest}) {
    const {label,labelStyle, style} = {...rest};
    return (
        <TouchableOpacity {...rest} style={[styles.container,style]}>
            <Text style={[styles.label,labelStyle]}>{label}</Text>
        </TouchableOpacity>

    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems : 'center',
        backgroundColor : darkBlue,
        borderRadius : 5
    },
    label : {
        color : 'white',
        fontSize : 16,
        lineHeight : 22
    }
});
