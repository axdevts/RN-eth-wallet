import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { defaultBackground, green, red } from '../../component/common/LMStyle';
import { useDispatch, useSelector } from 'react-redux';
import Down from '../../component/icon/Down';
import LMTouchableOpacity from '../../component/common/LMTouchableOpacity';
import UniswapModule from '../../module/uniswap/UniswapModule';
import _ from 'lodash';
import Exchange from '../../component/icon/Exchange';
import NumberFormat from 'react-number-format';
import LMButton from '../../component/common/LMButton';
import LMLoading from '../../component/common/LMLoading';
import { WalletAction } from '../../persistent/wallet/WalletAction';
import LMTokenIcon from '../../component/common/LMTokenIcon';
import { AssetAction } from '../../persistent/asset/AssetAction';

export default function UniswapScreen({ navigation }) {
	const dispatch = useDispatch();
	const { language } = useSelector(state => state.LanguageReducer)
	const { activeNetwork } = useSelector(state => state.NetworkReducer);
	const { activeWallet, rawActiveWallet } = useSelector(state => state.WalletReducer);
	const [fromToken, setFromToken] = useState({ balance: {} });
	const [toToken, setToToken] = useState({ balance: {} });
	const [fromValue, setFromValue] = useState('');
	const [toValue, setToValue] = useState('');
	const [trade, setTrade] = useState([]);
	const [rate, setRate] = useState(1);
	const [error, setError] = useState('Enter an amount')
	const isValidTrade = (value) => {
		const finalValue = value;
		return !_.isEmpty(toToken.balance) && finalValue > 0 && finalValue != '';
	}
	const init = async () => {
		setFromToken(await UniswapModule.commonToken(activeWallet.address));
	}
	const reset = async () => {
		//reset fromToken
		const token = { ...fromToken };
		token.balance = await UniswapModule.tokenBalance(activeWallet.address, fromToken.address);
		setFromToken(token);
		setFromValue('');
		//reset toToken
		const token2 = { ...toToken };
		token2.balance = await UniswapModule.tokenBalance(activeWallet.address, token2.address);
		setToToken(token2);
		setToValue('');
		//reset Trade
		setTrade([]);
		//reset Error
		setError('Enter an amount')
		//reset Balance
		dispatch(WalletAction.getWallets());
		dispatch(WalletAction.getActiveWallet());
		dispatch(WalletAction.getTransactions(activeWallet.address));
		dispatch(AssetAction.list(activeWallet.address));
	}

	const exchange = async (from, to, value) => {
		if (isValidTrade(value)) {
			setError('Loading...')
			const finalValue = value;
			const exchange = await UniswapModule.trade(activeWallet.address, from, to, finalValue);
			if (typeof exchange !== 'string') {
				setToValue(exchange.expectedConvertQuote);
				setTrade(exchange);
				setRate(_.toNumber(exchange.expectedConvertQuote) / _.toNumber(finalValue));
				setError('Swap');
			} else {
				setError(exchange);
			}
		}
	}
	const min = (a, b) => {
		return Math.min(a, b).toString();
	}
	const swapPosition = async () => {
		const fromTokenTemp = toToken;
		const fromValueTemp = toValue;
		setToValue(fromValue);
		setToToken(fromToken);
		setFromValue(fromValueTemp);
		setFromToken(fromTokenTemp);
		await exchange(fromTokenTemp.address, fromToken.address, fromValueTemp);
	}
	const swap = async () => {
		LMLoading.show();
		const result = await UniswapModule.swap(rawActiveWallet, trade);
		if (typeof result == 'string') {
			setError(result);
		} else {
			await reset();
		}

		LMLoading.hide();
	}
	useEffect(async () => {
		await init();
	}, [activeNetwork.chainId]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.contentContainer}>
				<View>
					<View style={styles.row}>
						<View style={[styles.half, { flex: 2 }]}>
							<LMTouchableOpacity style={styles.coin} onPress={() => {
								navigation.navigate("TokenScreen", {
									onSelect: async (token) => {
										const balance = await UniswapModule.tokenBalance(activeWallet.address, token.address);
										setFromToken({ ...token, balance: balance });
										setFromValue('');
										setToValue('');
										setTrade([]);
									},
									search: fromToken.symbol
								});
							}}>
								<LMTokenIcon uri={fromToken.logoURI} />
								<Text style={styles.label}>{fromToken.symbol}</Text>
								<Down />
							</LMTouchableOpacity>
							<View style={styles.amount}>
								<TextInput
									style={styles.textInput}
									placeholder={'0.0'}
									value={fromValue}
									onChangeText={async (text) => {
										setFromValue(text);
									}}
									onEndEditing={async () => {
										const finalValue = min(fromValue, fromToken.balance.val);
										setFromValue(finalValue);
										await exchange(fromToken.address, toToken.address, finalValue);
									}}
								/>
							</View>
						</View>
						<View style={styles.half}>
							<View style={[styles.amount, { flex: 2, flexDirection: 'row', alignItems: 'center' }]}>
								<View>
									<NumberFormat
										value={fromToken.balance.val}
										displayType={'text'}
										thousandSeparator={true}
										decimalScale={4}
										renderText={value => (
											<Text>{language.balance}: {value}</Text>
										)}
									/>
								</View>
								<View style={[styles.half, { paddingLeft: 5 }]}>
									<Text>{fromToken.symbol}</Text>
									<LMTouchableOpacity onPress={async () => {
										const finalValue = fromToken.balance.val;
										setFromValue(finalValue);
										await exchange(fromToken.address, toToken.address, finalValue);
									}}>
										<Text style={{ color: `rgb(232, 0, 111)`, fontWeight: 'bold' }}> ({language.maximum})</Text>
									</LMTouchableOpacity>
								</View>
							</View>
						</View>
					</View>
					<View style={styles.row}>
						<View style={[styles.half, { flex: 2 }]}>
							<LMTouchableOpacity style={styles.coin} onPress={() => {
								navigation.navigate("TokenScreen", {
									onSelect: async (token) => {
										const balance = await UniswapModule.tokenBalance(activeWallet.address, token.address);
										setToToken({ ...token, balance: balance });
										await exchange(fromToken.address, token.address, fromValue);
									},
									search: toToken.symbol
								});
							}}>
								<LMTokenIcon uri={toToken.logoURI} />
								<Text style={styles.label}>{toToken.symbol}</Text>
								<Down />
							</LMTouchableOpacity>
							<View style={styles.amount}>
								<TextInput
									style={styles.textInput}
									placeholder={'0.0'}
									value={toValue}
									onChangeText={(text) => {
										setToValue(text);
									}}
									onEndEditing={async () => {
										let finalValue = toValue / rate;
										finalValue = min(finalValue, fromToken.balance.val);
										setFromValue(finalValue);
										await exchange(fromToken.address, toToken.address, finalValue);
									}}
								/>
							</View>
						</View>
						<View style={styles.half}>
							<View style={[styles.amount, { flex: 2, flexDirection: 'row', alignItems: 'center' }]}>
								<View>
									<NumberFormat
										value={toToken.balance.val}
										displayType={'text'}
										thousandSeparator={true}
										decimalScale={4}
										renderText={value => (
											<Text>Balance: {value}</Text>
										)}
									/>
								</View>
								<View style={[styles.half, { paddingLeft: 5 }]}>
									<Text>{toToken.symbol}</Text>
								</View>
							</View>
						</View>
					</View>
					<LMTouchableOpacity style={styles.exchangeButton} onPress={async () => {
						await swapPosition();
					}}>
						<Exchange />
					</LMTouchableOpacity>
				</View>
				<View style={styles.exchangeRate}>
					<Text>Uniswap {trade.uniswapVersion}</Text>
					<View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
						<NumberFormat
							value={rate}
							displayType={'text'}
							thousandSeparator={true}
							decimalScale={4}
							renderText={value => (
								<Text>1 {fromToken.symbol} ~ {value} {toToken.symbol}</Text>
							)}
						/>
					</View>
				</View>
				<View style={{ marginTop: 0 }}>
					<LMButton
						label={error}
						style={{ backgroundColor: error == 'Swap' ? green : red }}
						onPress={async () => {
							if (error == 'Swap') {
								await swap();
							}
						}} />
				</View>
				<View style={styles.transaction}>
					<View style={styles.transactionRow}>
						<Text>{language.liquidityProviderFee}</Text>
						<NumberFormat
							value={trade.liquidityProviderFeePercent || ''}
							displayType={'text'}
							thousandSeparator={true}
							decimalScale={4}
							renderText={value => (
								<Text>{value}%</Text>
							)}
						/>
					</View>
					<View style={styles.transactionRow}>
						<Text>{language.route}</Text>
						<Text>{trade.routeText}</Text>
					</View>
					<View style={styles.transactionRow}>
						<Text>{language.minimumedReceived}</Text>
						<NumberFormat
							value={trade.minAmountConvertQuote || ''}
							displayType={'text'}
							thousandSeparator={true}
							decimalScale={4}
							renderText={value => (
								<Text>{value}</Text>
							)}
						/>
					</View>
					<View style={styles.transactionRow}>
						<Text>{language.slippageTolerance}</Text>
						<Text>0.05%</Text>
					</View>
				</View>

			</View>
		</SafeAreaView>
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
		flexDirection: 'row',
		alignItems: 'center'
	},
	contentContainer: {
		flex: 1,
		paddingLeft: 10,
		paddingRight: 10,
	},
	row: {
		width: '100%',
		height: 100,
		backgroundColor: '#f7f8fa',
		borderRadius: 10,
		padding: 10,
		marginBottom: 5
	},
	half: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	coin: {
		minWidth: 50,
		height: '80%',
		flexDirection: 'row',
		backgroundColor: 'white',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 10,
		shadowColor: '#b1b1b1',
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.24,
		shadowRadius: 10.32,
		elevation: 5,
		padding: 5
	},
	label: {
		fontWeight: 'bold',
		marginLeft: 3,
		marginRight: 3
	},
	icon: {
		width: 24,
		height: 24
	},
	amount: {
		justifyContent: 'center',
		flex: 1,
	},
	textInput: { width: '100%', height: '80%', textAlign: 'right', fontSize: 20 },
	exchangeRate: {
		height: 50,
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#f7f8fa',
		borderRadius: 10,
		padding: 10,
		marginBottom: 5
	},
	exchangeRow: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 10,

	},
	exchangeButton: {
		width: 32,
		height: 32,
		backgroundColor: '#f7f8fa',
		borderColor: '#fff',
		borderWidth: 3,
		borderRadius: 5,
		zIndex: 99999,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		top: '43%',
		left: '45%'
	},
	transaction: {
		width: '100%',
		minHeight: 100,
		backgroundColor: '#f7f8fa',
		borderRadius: 10,
		padding: 10,
		marginTop: 5
	},
	transactionRow: {
		width: '100%',
		height: 30,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
});
