import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {defaultBackground, primary, red} from '../../component/common/LMStyle';
import LMButton from '../../component/common/LMButton';
import {Popup, Root} from 'popup-ui';
import LMTextInput from '../../component/common/LMTextInput';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import LMBackButton from '../../component/common/LMBackButton';
import {WalletAction} from '../../persistent/wallet/WalletAction';
import Clipboard from '@react-native-community/clipboard';
import QRCode from 'react-native-qrcode-svg';

export default function ViewWalletScreen({navigation,route,lang }){
    const dispatch = useDispatch();
    const {wallet} =  route.params;
    const {activeWallet} = useSelector(state => state.WalletReducer);
    const [privateKeySecure,setPrivateKeySecure] = useState(true);
    const schema = yup.object().shape({
        name: yup.string().required(lang.pleaseInputWalletName)
    });
    const {control, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async ({name}) => {
        const updatedWallet = {...wallet,name};
        dispatch(WalletAction.update({wallet:updatedWallet})).then(()=>{
            Popup.show({
                type: 'Success',
                title: lang.complete,
                button: true,
                textBody: lang.walletHasBeenUpdated,
                buttontext: lang.ok,
                autoClose: false,
                callback: () => {
                    navigation.goBack();
                },
            })
        });
    };
    return (
        <Root>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <LMBackButton color={'black'} onPress={() => {
                        navigation.goBack();
                    }}/>
                    <View style={{flex:1, justifyContent : 'center', alignItems : 'center'}}>
                        <Text style={{fontSize: 16, textAlign: 'center', fontWeight : 'bold'}}>{lang.walletInformation}</Text>
                    </View>
                    <View style={{width : 40}}>

                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.block}>
                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <LMTextInput
                                    label={lang.walletName}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    error={errors['name']}
                                    placeholder={lang.enterYourWallet}
                                    labelStyle={{color : primary}}
                                />
                            )}
                            name="name"
                            defaultValue={wallet.name}
                        />
                    </View>
                    <View style={styles.block}>
                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <LMTextInput
                                    label={lang.walletAddress}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    labelStyle={{color : primary}}
                                    editable={false}
                                    hint={lang.clickHereToCopy}
                                    onHintPress={()=>{
                                        Clipboard.setString(wallet.address);
                                    }}
                                />
                            )}
                            name="walletAddress"
                            defaultValue={wallet.address}
                        />
                    </View>
                    <View style={styles.block}>
                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <LMTextInput
                                    label={lang.privateKey}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    error={errors['privateKey']}
                                    placeholder={lang.enterOrPasteYourPrivateKey}
                                    labelStyle={{color : primary}}
                                    secureTextEntry={privateKeySecure}
                                    hint={lang.clickHereToShowAndCopy}
                                    onHintPress={()=>{
                                        setPrivateKeySecure(false);
                                        Clipboard.setString(wallet.privateKey);
                                        setTimeout(function(){
                                            setPrivateKeySecure(true);
                                        },5000);
                                    }}
                                    editable={false}
                                    multiline={!privateKeySecure}
                                />
                            )}
                            name="privateKey"
                            defaultValue={wallet.privateKey}
                        />
                    </View>
                    <QRCode
                        value={wallet.address}
                        logo={require('../../../assets/logo_small.png')}
                        size={300}
                    />
                </View>
                <View style={[styles.buttonsContainer, {marginBottom : 5}]}>
                    <LMButton
                        label={lang.save}
                        onPress={ handleSubmit(onSubmit)}
                        style={{marginBottom : 5}}
                    />
                    {
                        (wallet.address != activeWallet.address && (wallet.mainWallet == false)) &&
                        <LMButton
                            label={lang.remove}
                            onPress={()=>{
                                const removeWallet = {...wallet};
                                dispatch(WalletAction.remove({wallet:removeWallet})).then(()=>{
                                    Popup.show({
                                        type: 'Success',
                                        title: lang.complete,
                                        button: true,
                                        textBody: lang.walletHasBeenRemoved,
                                        buttontext: lang.ok,
                                        autoClose: false,
                                        callback: () => {
                                            navigation.goBack();
                                        },
                                    })
                                });
                            }}
                            style={{backgroundColor: red}}
                        />
                    }

                </View>
            </SafeAreaView>
        </Root>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultBackground,
        flex: 1,
    },
    header: {
        height: 50,
        width: '100%',
        flexDirection : 'row',
        alignItems:  'center'
    },
    contentContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems:  'center'
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
});
