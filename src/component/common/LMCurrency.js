import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useSelector} from "react-redux";
import _ from 'lodash'

export default function LMCurrency({...rest}) {
    const {value, symbol, main, style,precision} = {...rest};
    const {defaultCurrency, currenciesObject} = useSelector(state => state.CurrencyReducer.data);
    let convertedValue = currenciesObject[defaultCurrency.key] * value ;
    convertedValue = _.round(main ? value : convertedValue, precision? precision : 5).toFixed(precision? precision : 5);
    let symbol2 = symbol || defaultCurrency.key;
    return (
        <Text {...rest} style={main ? [styles.main,style] : [styles.convert,style]}>{convertedValue} <Text style={{fontSize:12}}>{symbol2}</Text></Text>
    );
}
const styles = StyleSheet.create({
    main: {
        fontSize : 14
    },
    convert : {
        fontSize : 14, color : 'gray'
    }
});

