import React, { useEffect } from 'react';
import { Linking, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { defaultBackground } from '../../component/common/LMStyle';
import LMButton from '../../component/common/LMButton';
import { useDispatch, useSelector } from 'react-redux';
import LMBackButton from '../../component/common/LMBackButton';

import LMCurrency from '../../component/common/LMFiat';
import LMCrypto from '../../component/common/LMCrypto';

export default function TransactionDetailScreen({ navigation, route, lang }) {
	const dispatch = useDispatch();
	const { activeNetwork } = useSelector(state => state.NetworkReducer);
	const { transaction } = route.params;
	useEffect(() => {

	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<LMBackButton color={'black'} onPress={() => {
					navigation.goBack();
				}} />
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>{lang.transactionDetail}</Text>
				</View>
				<View style={{ width: 40 }}>

				</View>
			</View>
			<ScrollView style={styles.contentContainer}>
				<View style={styles.block}>
					<View style={styles.row}>
						<Text style={styles.title}>{lang.block}</Text>
					</View>
					<View style={[styles.row, styles.right]}>
						<Text>{transaction.blockNumber}</Text>
					</View>
				</View>
				<View style={styles.block}>
					<View style={styles.row}>
						<Text style={styles.title}>{lang.status}</Text>
					</View>
					<View style={[styles.row, styles.right]}>
						<Text style={{ color: transaction.color }}>{transaction.status}</Text>
					</View>
				</View>
				<View style={styles.block}>
					<View style={styles.row}>
						<Text style={styles.title}>{lang.date}</Text>
					</View>
					<View style={[styles.row, styles.right]}>
						<Text>{transaction.date}</Text>
					</View>
				</View>
				<View style={styles.block}>
					<View style={styles.row}>
						<Text style={styles.title}>{lang.from}</Text>
					</View>
					<View style={[styles.row, styles.right]}>
						<Text>{transaction.from}</Text>
					</View>
				</View>
				<View style={styles.block}>
					<View style={styles.row}>
						<Text style={styles.title}>{lang.to}</Text>
					</View>
					<View style={[styles.row, styles.right]}>
						<Text>{transaction.to}</Text>
					</View>
				</View>
				<View style={styles.block}>
					<View style={styles.row}>
						<Text style={styles.title}>{lang.nonce}</Text>
					</View>
					<View style={[styles.row, styles.right]}>
						<Text>#{transaction.nonce}</Text>
					</View>
				</View>
				<View style={styles.block}>
					<View style={styles.row}>
						<Text style={styles.title}>{lang.value}</Text>
					</View>
					<View style={[styles.row, styles.right]}>
						<LMCrypto value={transaction.etherValue} />
					</View>
				</View>
				<View style={styles.block}>
					<View style={styles.row}>
						<Text style={styles.title}>{lang.transactionFee}</Text>
					</View>
					<View style={[styles.row, styles.right]}>
						<LMCrypto value={transaction.etherGasValue} />
					</View>
				</View>
				<View style={styles.block}>
					<View style={styles.row}>
						<Text style={styles.title}>{lang.gasPrice}</Text>
					</View>
					<View style={[styles.row, styles.right]}>

					</View>
				</View>
				<View style={styles.block}>
					<View style={styles.row}>
						<Text style={styles.title}>{lang.gasLimit}</Text>
					</View>
					<View style={[styles.row, styles.right]}>
						<Text>{transaction.gas}</Text>
					</View>
				</View>
				<View style={styles.block}>
					<View style={styles.row}>
						<Text style={styles.title}>{lang.gasUsedByTransaction}</Text>
					</View>
					<View style={[styles.row, styles.right]}>
						<Text>{transaction.gasUsed}</Text>
					</View>
				</View>
				<View style={styles.block}>
					<View style={styles.row}>
						<Text style={styles.title}>{lang.inputData}</Text>
					</View>
					<View style={[styles.row, styles.right]}>
						<Text>{transaction.input}</Text>
					</View>
				</View>
			</ScrollView>
			<View style={[styles.buttonsContainer, { marginBottom: 5 }]}>
				<LMButton
					label={lang.viewOnEtherScan}
					onPress={async () => {
						const url = activeNetwork.txUrl + transaction.hash;
						await Linking.openURL(url);
					}}

				/>
			</View>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: defaultBackground,
		alignItems: 'stretch',
		justifyContent: 'space-between',
		flex: 1,
	},
	header: {
		height: 50,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingRight: 10,
	},
	contentContainer: {
		flex: 1,
		paddingLeft: 10,
		paddingRight: 10,
	},
	block: {
		width: '100%',
		marginBottom: 5,
		minHeight: 60,
		borderBottomWidth: 0.5,
		borderBottomColor: '#e2e2e2',
	},
	row: {
		flex: 1
	},
	right: {
		alignItems: 'flex-end'
	},
	title: {
		fontWeight: 'bold',
		fontSize: 14
	},
	buttonsContainer: {
		justifyContent: 'space-between',
		paddingLeft: 10,
		paddingRight: 10,
	},
});
