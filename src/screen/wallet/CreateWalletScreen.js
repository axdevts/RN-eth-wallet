import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {green, primary, secondBackground} from '../../component/common/LMStyle';
import LMButton from '../../component/common/LMButton';
import Swiper from 'react-native-swiper';


export default function CreateWalletScreen({navigation,lang}){
    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../../../assets/circle.png')} style={styles.image} resizeMode={'stretch'}/>
            <View style={styles.contentContainer}>
                <View style={styles.slider}>
                    <Swiper showsButtons={false}>
                        <View style={styles.sliderImage}>
                            <Image source={require('../../../assets/intro_qrcode.png')} style={{width : 401, height : 340}} resizeMode={'stretch'}/>
                        </View>
                        <View style={styles.sliderImage}>
                            <Image source={require('../../../assets/password_bg.png')} style={{width : 401, height : 340}} resizeMode={'stretch'}/>
                        </View>
                        <View style={styles.sliderImage}>
                            <Image source={require('../../../assets/merchandise.png')} style={{width : 401, height : 340}} resizeMode={'stretch'}/>
                        </View>
                    </Swiper>
                </View>
            </View>
            <View style={{flex:1}}>
                <View style={styles.bottomContainer}>
                    <View style={styles.infoContainer}>
                        <View style={styles.block}>
                            <Text style={[styles.message, {fontSize: 32, textAlign: 'center'}]}>{lang.getStarted}</Text>
                        </View>
                        <View style={styles.block}>
                            <Text style={[styles.message, {textAlign: 'center'}]}>{lang.registerYourWalletOrImportYourWallet}</Text>
                        </View>
                    </View>
                    <View style={[styles.buttonsContainer, {marginBottom : 5}]}>
                        <LMButton
                            label={lang.registerWallet}
                            onPress={() => {
                                navigation.navigate("CreatePasswordScreen");
                            }}
                        />
                    </View>
                    <View style={styles.buttonsContainer}>
                        <LMButton
                            label={lang.importWallet}
                            onPress={() => {
                                navigation.navigate("ImportWalletScreen");
                            }}
                        />
                    </View>
                </View>
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: secondBackground,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        flex: 1,
    },
    header: {
        height: 50,
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
    },
    contentContainer: {
        flex: 1.8,
    },
    block: {
        width: '100%',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        color: primary,
        marginHorizontal: 10,
    },
    buttonsContainer: {
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
    },
    mnemonicsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginHorizontal: 10,
        borderRadius: 10,
    },
    overlayMnemonics: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        position: 'absolute',
        width: '100%',
        height: 300,
    },
    loginBg: {
        width: '100%',
        height: 370,
    },
    mnemonic: {
        margin: 14,
        width: 130,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: green,
    },
    bottomContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 10,
        position : 'absolute',
        bottom : 0
    },
    infoContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    slider: {
        width : '100%',
        height : '100%',
        justifyContent: 'center',
        alignItems : 'center'
    },
    blurBackground: {
        width: '100%',
        height: 549,
        position: 'absolute',
        bottom:0,
    },
    sliderImage : {
        width : '100%',
        height : '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
