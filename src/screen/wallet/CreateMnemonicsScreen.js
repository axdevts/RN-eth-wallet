import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {green, primary, secondBackground, white} from '../../component/common/LMStyle';
import LMButton from '../../component/common/LMButton';
import {BlurView} from '@react-native-community/blur';
import LMBackButton from '../../component/common/LMBackButton';
import {Root, Toast} from 'popup-ui';
import WalletModule from '../../module/etherjs/WalletModule';

export default function CreateMnemonicsScreen({navigation, route, lang}) {
    const {password} = route.params;
    const [mnemonics, setMnemonics] = useState(null);
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        onPressReveal();
    }, []);
    const onPressReveal = () => {
        const mnemonics = WalletModule.generateMnemonics();
        setMnemonics(mnemonics);
    };

    const renderMnemonic = (mnemonic, index) => (
        <View style={styles.mnemonic} key={index}>
            <View style={{width: '80%'}}>
                <Text style={{textAlign: 'left'}}>{index + 1}. {mnemonic}</Text>
            </View>
        </View>
    );
    const renderBody = () => {
        return (
            <View style={styles.mnemonicsContainer}>
                {mnemonics && mnemonics.map(renderMnemonic)}
                {
                    visible &&
                    <BlurView
                        style={styles.overlayMnemonics}
                        blurType="light"
                        blurAmount={5}
                        reducedTransparencyFallbackColor="white"
                    >
                    </BlurView>
                }
                {
                    visible &&
                    <TouchableOpacity
                        style={{position: 'absolute', top: '50%'}}
                        onPress={() => {
                            setVisible(false);
                        }}
                    >
                        <Text style={{color: secondBackground}}>{lang.clickHereToRevealSecretWords}</Text>
                    </TouchableOpacity>
                }
            </View>
        );
    };
    return (
        <Root>
            <SafeAreaView style={styles.container}>
                <Image source={require('../../../assets/circle.png')} style={styles.image} resizeMode={'stretch'}/>
                <View style={styles.header}>
                    <LMBackButton color={'white'} onPress={() => {
                        navigation.goBack();
                    }}/>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={require('../../../assets/logo_small.png')} style={styles.logo} resizeMode={'stretch'}/>
                    </View>
                    <View style={{width: 40}}>

                    </View>
                </View>
                <View style={styles.contentContainer}>
                    {renderBody()}
                </View>
                <View style={{flex: 1}}>
                    <View style={styles.bottomContainer}>
                        <View style={styles.infoContainer}>
                            <View style={styles.block}>
                                <Text style={[styles.message, {
                                    fontSize: 32,
                                    textAlign: 'center',
                                }]}>{lang.secureYourWallet}</Text>
                            </View>
                            <View style={styles.block}>
                                <Text style={[styles.message, {textAlign: 'left'}]}>{lang.writeItSomewhereSafe}</Text>
                            </View>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <LMButton
                                label={lang.continue}
                                onPress={() => {
                                    if (visible) {
                                        Toast.show({
                                            title: lang.warning,
                                            text:
                                            lang.pleaseClickRevealToGetYourSecretBackupPhrase,
                                            color: '#f39c12',
                                            timing: 2000,
                                            icon: (
                                                <Image
                                                    source={require('../../../assets/warning.png')}
                                                    style={{width: 25, height: 25}}
                                                    resizeMode="contain"
                                                />
                                            ),
                                        });
                                    } else {
                                        navigation.navigate('ConfirmMnemonicsScreen', {mnemonics, password});
                                    }
                                }}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </Root>
    );
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
        flexDirection: 'row',
    },
    contentContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
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
    mnemonic: {
        margin: 5,
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
        position: 'absolute',
        bottom: 0,
    },
    infoContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    logo: {
        width: 50,
        height: 50,
    },
});
