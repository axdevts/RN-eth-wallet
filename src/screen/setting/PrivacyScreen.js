import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {defaultBackground, gray, orange, primary} from '../../component/common/LMStyle';
import {Root} from 'popup-ui';
import {useDispatch, useSelector} from 'react-redux';
import LMBackButton from '../../component/common/LMBackButton';
import LMTextInput from '../../component/common/LMTextInput';
import Clipboard from '@react-native-community/clipboard';
import LMButton from '../../component/common/LMButton';

export default function PrivacyScreen({navigation,lang}) {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.UserReducer);
    const [privateKeySecure,setPrivateKeySecure] = useState(true);
    useEffect(()=>{
    },[])
    return (
        <Root>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <LMBackButton color={'black'} onPress={() => {
                        navigation.goBack();
                    }}/>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 'bold'}}>{lang.privacyAndSecurity}</Text>
                    </View>
                    <View style={{width: 40}}>

                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.block}>
                        <Text style={styles.selectTitle}>{lang.secretRecoveryPhrase}</Text>
                        <Text style={styles.hint}>{lang.protectYourWallet}</Text>
                        <LMTextInput
                            label={lang.secretRecoveryPhrase}
                            labelStyle={{color : primary}}
                            secureTextEntry={privateKeySecure}
                            value={user.secretRecoveryPhrase}
                            hint={lang.clickHereToShowAndCopy}
                            onHintPress={()=>{
                                setPrivateKeySecure(false);
                                Clipboard.setString(user.secretRecoveryPhrase);
                                setTimeout(function(){
                                    setPrivateKeySecure(true);
                                },5000);
                            }}
                            editable={false}
                            multiline={!privateKeySecure}
                        />
                    </View>
                    <View style={styles.block}>
                        <Text style={styles.selectTitle}>{lang.password}</Text>
                        <Text style={styles.hint}>{lang.chooseAStrongPassword}</Text>
                        <LMButton
                            label={lang.changePassword}
                            style={{marginBottom : 5, backgroundColor: orange}}
                            onPress={()=>{
                                navigation.navigate('ChangePasswordScreen');
                            }}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </Root>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultBackground,
        flex: 1,
    },
    header: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    block: {
        width: '100%',
        marginBottom: 10,
    },
    selectTitle: {
        fontWeight: 'bold',
    },
    selectContainer: {
        width: '100%',
        height: 50,
        borderWidth: 0.5,
        borderColor: '#e2e2e2',
        flexDirection: 'row',
        borderRadius: 5,
    },
    selectContent: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: 10,
        flexDirection: 'row',

    },
    selectIcon: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hint : {marginTop: 10, marginBottom: 10, color : gray, fontStyle:'italic'}
});
