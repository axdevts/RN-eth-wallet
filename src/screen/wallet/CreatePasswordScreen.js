import React, {useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {green, primary, secondBackground} from '../../component/common/LMStyle';
import LMButton from '../../component/common/LMButton';
import LMTextInput from '../../component/common/LMTextInput';
import LMBackButton from '../../component/common/LMBackButton';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

export default function CreatePasswordScreen({navigation,route,lang}){
    const schema = yup.object().shape({
        password: yup.string().required(lang.password).min(8,lang.passwordMustBeAtLeast8Characters),
        confirmPassword: yup.string().required(lang.pleaseInputConfirmPassword).oneOf([yup.ref('password'), null], lang.passwordMustMatch)
    });
    const {control, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });
    const [securePassword,setSecurePassword] = useState(true);
    const onSubmit = ({password}) => {
        navigation.navigate("CreateMnemonicsScreen",{password});
    };
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../../../assets/circle.png')} style={styles.image} resizeMode={'stretch'}/>
            <View style={styles.header}>
                <LMBackButton color={'white'} onPress={() => {
                    navigation.goBack();
                }}/>
                <View style={{flex:1, justifyContent : 'center', alignItems : 'center'}}>
                    <Image source={require('../../../assets/logo_small.png')} style={styles.logo} resizeMode={'stretch'}/>
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
                            <Text style={[styles.message, {fontSize: 32, textAlign: 'center'}]}>{lang.setYourPassword}</Text>
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
                                defaultValue=""
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
                                defaultValue=""
                            />
                        </View>
                        <TouchableOpacity style={styles.block} onPress={()=>{
                            navigation.navigate("TermsAndConditionsScreen");
                        }}>
                            <Text style={{color : primary}}>{lang.byClicking} <Text style={{color : primary, fontWeight : 'bold'}}>{lang.confirm}, </Text> {lang.youHaveAgreed} <Text style={{color : primary, fontWeight : 'bold'}}>{lang.termOfUse}</Text></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <LMButton
                            label={lang.confirm}
                            onPress={handleSubmit(onSubmit)}
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
        flexDirection: 'row',
    },
    contentContainer: {
        flex: 0.65,
        justifyContent: 'center',
        alignItems: 'center',
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
        width : 50,
        height : 50,
    },
});
