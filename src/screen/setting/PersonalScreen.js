import React, {useEffect, useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {defaultBackground, gray} from '../../component/common/LMStyle';
import {Root} from 'popup-ui';
import {useDispatch, useSelector} from 'react-redux';
import LMBackButton from '../../component/common/LMBackButton';
import Down from '../../component/icon/Down';
import LMSelect from '../../component/common/LMSelect';
import LMLoading from '../../component/common/LMLoading';
import Jazzicon from 'react-native-jazzicon';
import {CurrencyAction} from '../../persistent/currency/CurrencyAction';
import {Flag} from 'react-native-svg-flagkit';
import {LanguageAction} from '../../persistent/language/LanguageAction';
import CurrencyPicker from "react-native-currency-picker"
import {ApplicationProperties} from '../../ApplicationProperties';

export default function PersonalScreen({navigation,lang}) {
    const dispatch = useDispatch();
    const {currency} = useSelector(state => state.CurrencyReducer);
    const {languages, defaultLanguage,language} = useSelector(state => state.LanguageReducer);
    let currencyPickerRef = undefined;
    useEffect(()=>{
        dispatch(LanguageAction.getDefault());
    },[])
    return (
        <Root>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <LMBackButton color={'black'} onPress={() => {
                        navigation.goBack();
                    }}/>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 'bold'}}>{language.personalSetting}</Text>
                    </View>
                    <View style={{width: 40}}>

                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.block}>
                        <Text style={styles.selectTitle}>{language.currencyConversion}</Text>
                        <Text style={styles.hint}>{language.displayFiat}</Text>
                        <CurrencyPicker
                            currencyPickerRef={(ref) => {currencyPickerRef = ref}}
                            enable={true}
                            darkMode={false}
                            currencyCode={currency.key}
                            showFlag={true}
                            showCurrencyName={true}
                            showCurrencyCode={true}
                            onSelectCurrency={(data) => {
                                dispatch(CurrencyAction.getCurrency({key : data.code}));
                            }}
                            showNativeSymbol={true}
                            showSymbol={false}
                            containerStyle={{
                                container: {
                                    width: '100%',
                                    height: 50,
                                    borderWidth: 0.5,
                                    borderColor: '#e2e2e2',
                                    flexDirection: 'row',
                                    borderRadius: 5,
                                    paddingLeft : 10,
                                    justifyContent: 'space-between'
                                },
                                flagWidth: 28,
                                currencyCodeStyle: {},
                                currencyNameStyle: {},
                                symbolStyle: {},
                                symbolNativeStyle: {}
                            }}
                            modalStyle={{
                                container: {},
                                searchStyle: {},
                                tileStyle: {},
                                itemStyle: {
                                    itemContainer: {},
                                    flagWidth: 25,
                                    currencyCodeStyle: {},
                                    currencyNameStyle: {},
                                    symbolStyle: {},
                                    symbolNativeStyle: {}
                                }
                            }}
                            title={"Currency"}
                            searchPlaceholder={"Search"}
                            showCloseButton={true}
                            showModalTitle={true}
                        />
                    </View>
                    <View style={styles.block}>
                        <Text style={styles.selectTitle}>{language.currentLanguage}</Text>
                        <Text style={styles.hint}>{language.translateTo}</Text>
                        <TouchableOpacity style={styles.selectContainer} onPress={() => {
                            LMSelect.show({
                                data: languages,
                                onPress: (item) => {
                                    LMLoading.show();
                                    dispatch(LanguageAction.set(item.code)).then(() => {
                                        dispatch(LanguageAction.setDefault(item));
                                        LMLoading.hide();
                                    });
                                },
                                key: 'code',
                                label: 'name',
                                renderItem: (item) => {
                                    return (
                                        <>
                                            <View style={{width: 60, justifyContent: 'center', alignItems: 'center'}}>
                                                <Flag
                                                    id={item.icon}
                                                    size={0.13}
                                                />
                                            </View>
                                            <View style={{flex: 1, justifyContent: 'center'}}>
                                                <Text style={{fontSize: 14}}>{item.name}</Text>
                                            </View>
                                        </>
                                    );
                                },
                            });
                        }}>
                            <View style={styles.selectContent}>
                                <Flag
                                    id={defaultLanguage.icon}
                                    size={0.13}
                                />
                                <Text style={{paddingLeft: 5}}>{defaultLanguage.name}</Text>
                            </View>
                            <View style={styles.selectIcon}>
                                <Down/>
                            </View>
                        </TouchableOpacity>
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
