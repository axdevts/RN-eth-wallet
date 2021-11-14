import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSelector } from "react-redux";
import NumberFormat from 'react-number-format';

export default function LMFiat({ ...rest }) {
	const { value } = { ...rest };
	const { currency } = useSelector(state => state.CurrencyReducer);
	let fiat = value * currency.value;
	let fiatSymbol = currency.key;
	return (
		<NumberFormat
			value={fiat}
			displayType={'text'}
			thousandSeparator={true}
			decimalScale={2}
			renderText={value => (
				<Text>{value} {fiatSymbol}</Text>
			)}
		/>

	);
}
const styles = StyleSheet.create({
	main: {
		fontSize: 14
	},
	convert: {
		fontSize: 14, color: 'gray'
	}
});

