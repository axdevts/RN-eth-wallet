import React, {useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {green, primary, secondBackground} from '../../component/common/LMStyle';
import LMButton from '../../component/common/LMButton';
import {Root} from 'popup-ui';
import LMTextInput from '../../component/common/LMTextInput';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {UserAction} from '../../persistent/user/UserAction';
import LMBackButton from '../../component/common/LMBackButton';
import {WalletAction} from '../../persistent/wallet/WalletAction';
import LMLoading from '../../component/common/LMLoading';
import LMToast from '../../component/common/LMToast';

export default function ImportWalletScreen({navigation,lang}){
    const dispatch = useDispatch();
    const schema = yup.object().shape({
        recoveryPhrase : yup.string().required(lang.walletSecretRecoveryPhrase),
        password: yup.string().required(lang.pleaseInputPassword).min(8,lang.passwordMustBeAtLeast8Characters),
        confirmPassword: yup.string().required(lang.pleaseInputConfirmPassword).oneOf([yup.ref('password'), null],lang.passwordMustMatch)
    });
    const {control, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });
    const [securePhrase,setSecurePhrase] = useState(true);
    const [securePassword,setSecurePassword] = useState(true);
    const onSubmit = async ({recoveryPhrase, password}) => {
        const mnemonics = recoveryPhrase.split(' ');
        LMLoading.show();
        await sleep(1000);
        dispatch(WalletAction.addFromMnemonic({mnemonics, name: lang.defaultWalletName, isMain: true})).then(response => {
            const {success, data} = response;
            if (success) {
                LMLoading.hide();
                dispatch(UserAction.signUp({
                    password: password,
                    walletAddress : data.address,
                    secretRecoveryPhrase : mnemonics.join(' ')
                }));
            } else {
                LMLoading.hide();
                LMToast.error({
                    title: lang.error,
                    text: lang.yourWalletSecretRecoveryPhraseIsIncorrect,
                })
            }
        });
    };
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    return (
        <Root>
            <SafeAreaView style={styles.container}>
                <Image source={require('../../../assets/circle.png')} style={styles.image} resizeMode={'stretch'}/>
                <View style={styles.header}>
                    <LMBackButton color={'white'} onPress={() => {
                        navigation.pop();
                        navigation.navigate("CreateWalletScreen");
                    }}/>
                    <View style={{flex:1, justifyContent : 'center', alignItems : 'center'}}>
                        <Image source={require('../../../assets/logo.png')} style={styles.logo} resizeMode={'stretch'}/>
                    </View>
                    <View style={{width : 40}}>

                    </View>
                </View>
                <View style={styles.contentContainer}>

                </View>
                <View style={{flex:1}}>
                    <View style={styles.bottomContainer}>
                        <View style={styles.infoContainer}>
                            <View style={styles.block}>
                                <Text style={[styles.message, {fontSize: 32, textAlign: 'center'}]}>{lang.restoreYourWallet}</Text>
                            </View>
                            <View style={styles.block}>
                                <Controller
                                    control={control}
                                    render={({onChange, onBlur, value}) => (
                                        <LMTextInput
                                            label={lang.walletSecretRecoveryPhrase}
                                            onBlur={onBlur}
                                            onChangeText={value => onChange(value)}
                                            value={value}
                                            error={errors['recoveryPhrase']}
                                            placeholder={lang.enterOrPasteYourWalletSecretRecoveryPhrase}
                                            labelStyle={{color : primary}}
                                            secureTextEntry={securePhrase}
                                            hint={lang.clickToShow}
                                            onHintPress={async () => {
                                                setSecurePhrase(false);
                                                await sleep(5000);
                                                setSecurePhrase(true);
                                            }}
                                        />
                                    )}
                                    name="recoveryPhrase"
                                    defaultValue=""//man comfort firm depend crowd when tuna soon license mass heart extra
                                />
                            </View>
                            <View style={styles.block}>
                                <Controller
                                    control={control}
                                    render={({onChange, onBlur, value}) => (
                                        <LMTextInput
                                            label={lang.password}
                                            onBlur={onBlur}
                                            onChangeText={value => onChange(value)}
                                            value={value}
                                            error={errors['password']}
                                            secureTextEntry={securePassword}
                                            placeholder={lang.password}
                                            labelStyle={{color : primary}}
                                            hint={lang.clickHereToShowYourPassword}
                                            onHintPress={async () => {
                                                setSecurePassword(false);
                                                await sleep(5000);
                                                setSecurePassword(true);
                                            }}
                                        />
                                    )}
                                    name="password"
                                    defaultValue=""//12345678
                                />
                            </View>
                            <View style={styles.block}>
                                <Controller
                                    control={control}
                                    render={({onChange, onBlur, value}) => (
                                        <LMTextInput
                                            label={lang.confirmPassword}
                                            onBlur={onBlur}
                                            onChangeText={value => onChange(value)}
                                            value={value}
                                            error={errors['confirmPassword']}
                                            secureTextEntry={securePassword}
                                            placeholder={lang.confirmPassword}
                                            labelStyle={{color : primary}}
                                            hint={lang.clickHereToShowYourPassword}
                                            onHintPress={async () => {
                                                setSecurePassword(false);
                                                await sleep(5000);
                                                setSecurePassword(true);
                                            }}
                                        />
                                    )}
                                    name="confirmPassword"
                                    defaultValue="" //12345678
                                />
                            </View>
                        </View>
                        <View style={[styles.buttonsContainer, {marginBottom : 5}]}>
                            <LMButton
                                label={lang.confirm}
                                onPress={ handleSubmit(onSubmit)}
                            />
                        </View>
                    </View>
                </View>

            </SafeAreaView>
        </Root>
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
        flexDirection: 'row',
    },
    contentContainer: {
        flex: 1,
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
        height: 340,
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
        position: 'absolute',
        bottom: 0,
        left: 0,
        paddingBottom: 10,
    },
    infoContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    logo : {
        width : 70,
        height : 50,
    },
});
