import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {darkBlue, defaultBackground, gray, green, orange, primary, red} from '../../component/common/LMStyle';
import LMButton from '../../component/common/LMButton';
import {Root} from 'popup-ui';
import LMTextInput from '../../component/common/LMTextInput';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import LMBackButton from '../../component/common/LMBackButton';
import {BigNumber, utils} from 'ethers';
import {parseEther} from 'ethers/lib.esm/utils';
import {WalletAction} from '../../persistent/wallet/WalletAction';
import LMLoading from '../../component/common/LMLoading';
import {WalletService} from '../../persistent/wallet/WalletService';
import LMCrypto from '../../component/common/LMCrypto';
import LMFiat from '../../component/common/LMFiat';
import _ from 'lodash';
import LMToast from '../../component/common/LMToast';

yup.addMethod(yup.string, "isAddress", function (errorMessage) {
    return this.test(`test-address`, errorMessage, function (value) {
        const { path, createError } = this;
        return (
            utils.isAddress(value) ||
            createError({ path, message: errorMessage })
        );
    });
});

export default function ERC20TransferScreen({navigation, route,lang}) {
    let qrCodeAddress = '';
    if (route.params) {
        qrCodeAddress = route.params.qrCodeAddress;
    }
    const dispatch = useDispatch();
    const {activeWallet, rawActiveWallet} = useSelector(state => state.WalletReducer);
	const {selectedToken} = useSelector(state => state.TokenReducer);

    const schema = yup.object().shape({
        recipientAddress: yup.string().required(lang.pleaseInputRecipientAddress).isAddress(lang.addressIsIncorrect),
        amount: yup.number().positive(lang.shouldBePositiveNumber).typeError(lang.shouldBeANumber),
    });
    const {control, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });
    const [gasLimit,setGasLimit] = useState(21000);
    const [gasTracker,setGasTracker] = useState({});
    const [selectedGas,setSelectedGas] = useState({});

   useEffect(async () => {
       const gasTracker = await WalletService.getFeeSuggestions(gasLimit);
       setGasTracker(gasTracker);
       setSelectedGas(gasTracker.proposeGasPrice);
   },[])

    const onSubmit = async ({recipientAddress, amount}) => {
        LMLoading.show();
        dispatch(WalletAction.sendTokens(recipientAddress, amount, selectedToken, rawActiveWallet, activeWallet.address)).then(()=>{
            LMLoading.hide();
            LMToast.popupSuccess({
                title : lang.complete,
                message : lang.yourTransactionHasBeenSent,
                buttontext: lang.ok,
                callback: () => {
                    navigation.navigate("MainScreen", {
						screenName: "MainScreen"
					});
                },
            })

        }).catch(e => {
			console.log('catch error here', e);
			LMLoading.hide();
			LMToast.popupError({
				title: lang.error,
				message : lang.tokenHasAlreadyBeenAdded,
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
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 'bold'}}>{selectedToken.symbol} {lang.transfer}</Text>
                    </View>
                    <TouchableOpacity style={[styles.logo,{alignItems : 'flex-end', justifyContent : 'center'}]} onPress={()=>{
                        navigation.navigate("ScannerScreen",{
                            screenName : "TransferScreen"
                        });
                    }}>
                        <Image source={require('../../../assets/qr-code.png')} style={styles.icon} resizeMode={'stretch'}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.block}>
                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <LMTextInput
                                    label={lang.yourAddress}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    error={errors['senderAddress']}
                                    placeholder={lang.yourAddress}
                                    editable={false}
                                />
                            )}
                            name="senderAddress"
                            defaultValue={activeWallet.address}
                        />
                    </View>
                    <View style={styles.block}>
                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <LMTextInput
                                    label={lang.yourBalance}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    error={errors['senderBalance']}
                                    placeholder={lang.yourBalance}
                                    editable={false}
                                />
                            )}
                            name="senderBalance"
                            defaultValue={selectedToken.balance.val}
                        />
                    </View>
                    <View style={styles.block}>
                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <LMTextInput
                                    label={lang.recipientAddress}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    error={errors['recipientAddress']}
                                    placeholder={lang.recipientAddress}
                                />
                            )}
                            name="recipientAddress"
                            defaultValue={qrCodeAddress}
                        />
                    </View>
                    <View style={styles.block}>
                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <LMTextInput
                                    label={lang.amount}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    error={errors['amount']}
                                    placeholder={lang.amount}
                                    keyboardType="numeric"
                                />
                            )}
                            name="amount"
                            defaultValue=""
                        />
                    </View>
                    <Text style={{fontWeight: 'bold'}}>{lang.transactionFee}</Text>
                    {
                        !_.isEmpty(gasTracker) &&
                        <>
                            <View style={styles.operationContainer}>
                                <TouchableOpacity style={[styles.operationItem]} onPress={() => {
                                    setSelectedGas(gasTracker.safeGasPrice);
                                }}>
                                    {
                                        selectedGas.key == 1 && <View style={[styles.selected,{backgroundColor : red}]}></View>
                                    }
                                    <View style={styles.itemContent}>
                                        <Text style={{fontWeight: 'bold'}}>{lang.slow}</Text>
                                        <View style={{alignItems : 'flex-end'}}>
                                            <LMCrypto value={gasTracker.safeGasPrice.ether}/>
                                            <LMFiat value={gasTracker.safeGasPrice.ether}/>
                                        </View>
                                    </View>


                                </TouchableOpacity>
                            </View>
                            <View style={styles.operationContainer}>
                                <TouchableOpacity style={[styles.operationItem]} onPress={() => {
                                    setSelectedGas(gasTracker.proposeGasPrice);
                                }}>
                                    {
                                        selectedGas.key == 2 && <View style={[styles.selected,{backgroundColor : orange}]}></View>
                                    }

                                    <View style={styles.itemContent}>
                                        <Text style={{fontWeight: 'bold'}}>{lang.average}</Text>
                                        <View style={{alignItems : 'flex-end'}}>
                                            <LMCrypto value={gasTracker.proposeGasPrice.ether}/>
                                            <LMFiat value={gasTracker.proposeGasPrice.ether}/>
                                        </View>
                                    </View>


                                </TouchableOpacity>
                            </View>
                            <View style={styles.operationContainer}>
                                <TouchableOpacity style={[styles.operationItem]} onPress={() => {
                                    setSelectedGas(gasTracker.fastGasPrice);
                                }}>
                                    {
                                        selectedGas.key == 3 &&   <View style={styles.selected}></View>
                                    }
                                    <View style={styles.itemContent}>
                                        <Text style={{fontWeight: 'bold'}}>{lang.fast}</Text>
                                        <View style={{alignItems : 'flex-end'}}>
                                            <LMCrypto value={gasTracker.fastGasPrice.ether}/>
                                            <LMFiat value={gasTracker.fastGasPrice.ether}/>
                                        </View>
                                    </View>


                                </TouchableOpacity>
                            </View>
                        </>
                    }
                </View>
                <View style={[styles.buttonsContainer, {marginBottom: 5}]}>
                    <LMButton
                        label={lang.confirm}
                        onPress={handleSubmit(onSubmit)}
                    />
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
        paddingRight : 10
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
    operationContainer: {
        height: 50,
        borderRadius: 5,
        padding: 8,
        borderWidth: 0.5,
        borderColor: '#d7d7d7',
        marginBottom : 10
    },
    operationItem: {
        flex: 1,
        height : 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    operationIcon: {
        width: 32,
        height: 32,
    },
    div: {
        width: 1,
        height: 57,
    },
    logo : {
        width : 70,
        height : 50,
    },
    icon : {width : 32, height:32, backgroundColor : darkBlue, borderRadius : 5},
    selected :{width: 16, height: 16, backgroundColor: green, borderColor: gray, borderRadius: 32},
    itemContent : {
        flex:1,
        paddingLeft : 5,
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});
