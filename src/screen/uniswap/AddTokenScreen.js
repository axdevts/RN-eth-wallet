import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {defaultBackground, gray, green, primary} from '../../component/common/LMStyle';
import LMButton from '../../component/common/LMButton';
import {Popup, Root} from 'popup-ui';
import LMTextInput from '../../component/common/LMTextInput';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import LMBackButton from '../../component/common/LMBackButton';
import UniswapModule from '../../module/uniswap/UniswapModule';
import {TokenAction} from '../../persistent/token/TokenAction';
import {TokenService} from '../../persistent/token/TokenService';
import LMToast from '../../component/common/LMToast';

export default function AddTokenScreen({navigation,lang}){
    const dispatch = useDispatch();
    const [error,setError] = useState(lang.enterCustomTokenContractAddress);
    const schema = yup.object().shape({
        contractAddress: yup.string().required(lang.tokenContractAddress + ' ' + lang.isARequiredField),
        symbol: yup.string().required(lang.symbol + ' ' + lang.isARequiredField),
        decimals: yup.string().required(lang.decimals + ' ' + lang.isARequiredField),
        name : yup.string().required(lang.name + ' ' + lang.isARequiredField),
        chainId : yup.string().required(lang.chainId + ' ' + lang.isARequiredField),
    });

    const {control, handleSubmit,setValue, errors} = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
        dispatch(TokenAction.addCustomTokens({
            ...data,
            address : data.contractAddress
        })).then(()=>{
            LMToast.popupSuccess({
                title: lang.complete,
                message : lang.addTokenSuccessfully,
            })
        })

    };
    return (
        <Root>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <LMBackButton color={'black'} onPress={() => {
                        navigation.goBack();
                    }}/>
                    <View style={{flex:1, justifyContent : 'center', alignItems : 'center'}}>
                        <Text style={{fontSize: 16, textAlign: 'center', fontWeight : 'bold'}}>{lang.addToken}</Text>
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
                                    label={lang.tokenContractAddress}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    error={errors['contractAddress']}
                                    placeholder={lang.networkName}
                                    labelStyle={{color : primary}}
                                    onEndEditing={async () => {
                                        if(!await TokenService.isExist(value)){
                                            const token = await UniswapModule.getToken(value);
                                            if(typeof token == 'string'){
                                                setError(token)
                                            }else{
                                                for (const [key, value] of Object.entries(token)) {
                                                    setValue(key,value.toString(),true);
                                                }
                                                setError('Save');
                                            }
																				}
																				// else {
                                        //     LMToast.popupError({
                                        //         title: lang.error,
                                        //         message : lang.tokenHasAlreadyBeenAdded,
                                        //     })
                                        // }

                                    }}
                                />
                            )}
                            name="contractAddress"
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.block}>
                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <LMTextInput
                                    label={lang.chainId}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    error={errors['chainId']}
                                    placeholder={lang.chainId}
                                    labelStyle={{color : primary}}
                                />
                            )}
                            name="chainId"
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.block}>
                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <LMTextInput
                                    label={lang.name}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    error={errors['name']}
                                    placeholder={lang.name}
                                    labelStyle={{color : primary}}
                                />
                            )}
                            name="name"
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.block}>
                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <LMTextInput
                                    label={lang.symbol}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    error={errors['symbol']}
                                    placeholder={lang.symbol}
                                    labelStyle={{color : primary}}
                                />
                            )}
                            name="symbol"
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.block}>
                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <LMTextInput
                                    label={lang.decimals}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    error={errors['decimals']}
                                    placeholder={lang.decimals}
                                    labelStyle={{color : primary}}
                                />
                            )}
                            name="decimals"
                            defaultValue=""
                        />
                    </View>
                </View>
                <View style={[styles.buttonsContainer, {marginBottom : 5}]}>
                    <LMButton
                        label={error}
                        onPress={handleSubmit(onSubmit)}
                        style={{backgroundColor: error != 'Save' ? gray : green }}
                    />
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
