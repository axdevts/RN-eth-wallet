import React, {useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import Identicon from 'identicon.js';
import {utils} from 'ethers';

export default function LMIcon({...rest}) {
    const {hash, size} = {...rest};
    const iconHash = utils.hashMessage(hash);
    useEffect(()=>{

    },[]);
    const options = { size: size || 32 };
    const avatar = new Identicon(iconHash, options).toString();
    const data = `data:image/png;base64,${avatar}`;
    return (
        <Image style={[styles.container, {width: size || 32, height: size || 32}]} source={{uri:data}}>

        </Image>

    );
}
const styles = StyleSheet.create({
    container: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        marginTop: 5,
        borderRadius : 9100
    }
});
