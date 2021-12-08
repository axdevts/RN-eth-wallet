import React, {useState, useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { darkBlue, defaultBackground, gray, green, primary, white } from '../../component/common/LMStyle';
import { useDispatch, useSelector } from 'react-redux';
import { WalletAction } from '../../persistent/wallet/WalletAction';
import LMSelect from '../../component/common/LMSelect';
import LMLoading from '../../component/common/LMLoading';
import Jazzicon from 'react-native-jazzicon';
import LMButton from '../../component/common/LMButton';
import LMNetworkSelector from '../../component/common/LMNetworkSelector';
import LMCrypto from '../../component/common/LMCrypto';
import LMFiat from '../../component/common/LMFiat';
import LMTouchableOpacity from '../../component/common/LMTouchableOpacity';
import LMTokenIcon from '../../component/common/LMTokenIcon';
import LMFlatList from '../../component/common/LMFlatList';
import UniswapModule from '../../module/uniswap/UniswapModule';
import { AssetAction } from '../../persistent/asset/AssetAction';
import { TokenAction } from '../../persistent/token/TokenAction';
import { LMStorageService } from '../../persistent/storage/LMStorageService';
import NumberFormat from 'react-number-format';
global.fetch = require('node-fetch');

export default function MainScreen({ navigation, route }) {
	const dispatch = useDispatch();
	const { activeWallet, wallets } = useSelector(state => state.WalletReducer);
	const { activeNetwork } = useSelector(state => state.NetworkReducer);
	const { assets } = useSelector(state => state.AssetReducer);
	//console.log(assets);
	const { language } = useSelector(state => state.LanguageReducer)

	const [refreshInterval, setRefreshInterval] = useState(5000);
	
	const fetchMetrics = () => {
		dispatch(WalletAction.setActiveWallet({
			privateKey: activeWallet.privateKey,
			name: activeWallet.name,
			chainId: activeNetwork.chainId
		}))
		// .then(() => {
		// 	console.log("Updated")
		// });
	}
	useEffect(async () => {
		dispatch(AssetAction.list(activeWallet.address, activeNetwork.chainId));
		dispatch(TokenAction.getTokens({ chainId: activeNetwork.chainId }));
	}, []
	);
	useEffect(() => {
		if (refreshInterval && refreshInterval > 0) {
			const interval = setInterval(fetchMetrics, refreshInterval);
			return () => clearInterval(interval);
		}
	}, [refreshInterval]);
	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity style={styles.item} onPress={() => {
				dispatch(TokenAction.selectTokenTransfer({ token: item }));
				navigation.navigate('ERC20TransferScreen', {
					screenName: 'ERC20TransferScreen',
				});
			}}>
				<View style={{ width: 40, justifyContent: 'center', alignItems: 'flex-start' }}>
					<LMTokenIcon uri={item.logoURI} />
				</View>
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<Text style={{ fontSize: 14 }}>{item.symbol}</Text>
				</View>
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<Text style={{ fontSize: 14 }}>Transfer</Text>
				</View>
				<View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
					<NumberFormat
						value={item.balance.val}
						displayType={'text'}
						thousandSeparator={true}
						decimalScale={4}
						renderText={value => (
							<Text>{value}</Text>
						)}
					/>
				</View>
			</TouchableOpacity>
		)
	}
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Image source={require('../../../assets/logo_small.png')} style={styles.logo} resizeMode={'stretch'} />
				<LMNetworkSelector />
				<TouchableOpacity style={[styles.logo, { alignItems: 'flex-end', justifyContent: 'center' }]}
					onPress={() => {
						navigation.navigate('ScannerScreen', {
							screenName: 'TransferScreen',
						});
					}}>
					<Image source={require('../../../assets/qr-code.png')} style={styles.icon} resizeMode={'stretch'} />
				</TouchableOpacity>
			</View>
			<View style={styles.contentContainer}>
				<TouchableOpacity style={styles.accountContainer} onPress={() => {
					LMSelect.show({
						data: wallets,
						onPress: (item) => {
							LMLoading.show();
							dispatch(WalletAction.setActiveWallet({
								privateKey: item.privateKey,
								name: item.name,
								chainId: activeNetwork.chainId
							})).then(() => {
								LMLoading.hide();
								console.log("DONE")
							});
						},
						key: 'address',
						label: 'name',
						renderItem: (item) => {
							return (
								<>
									<View
										style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center' }}>
										<Jazzicon size={32} address={item.address} />
									</View>
									<View style={{ flex: 1, justifyContent: 'center' }}>
										<Text style={{ fontSize: 14 }}>{item.name}</Text>
										<LMCrypto value={item.balance} />
										<LMFiat value={item.balance} />
									</View>
									<View
										style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center' }}>
										{
											activeWallet.address == item.address &&
											<View style={{
												width: 16,
												height: 16,
												backgroundColor: green,
												borderColor: gray,
												borderRadius: 32,
											}}>
											</View>
										}
									</View>
								</>
							);
						},
					});

				}}>
					<View style={{ flex: 1 }}>
						<Text style={styles.title}><Jazzicon size={16}
							address={activeWallet.address} />{activeWallet.name}</Text>
						<Text numberOfLines={1}>{activeWallet.address}</Text>
					</View>
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>

						<LMCrypto value={activeWallet.balance} />
						<LMFiat value={activeWallet.balance} />
					</View>
				</TouchableOpacity>
				<View style={styles.operationContainer}>
					<TouchableOpacity style={styles.operationItem} onPress={() => {
						navigation.navigate('TransferScreen');
					}}>
						<Image source={require('../../../assets/transfer.png')} style={styles.operationIcon}
							resizeMode={'stretch'} />
						<Text style={{ color: white }}>{language.transfer}</Text>
					</TouchableOpacity>
					<Image source={require('../../../assets/div.png')} style={styles.div} resizeMode={'stretch'} />
					{/* <TouchableOpacity style={styles.operationItem} onPress={async () => {
                        navigation.navigate('TopUpScreen');
                    }}>
                        <Image source={require('../../../assets/topup.png')} style={styles.operationIcon}
                               resizeMode={'stretch'}/>
                        <Text style={{color: white}}>{language.topUp}</Text>
                    </TouchableOpacity> */}
					<Image source={require('../../../assets/div.png')} style={styles.div} resizeMode={'stretch'} />
					<TouchableOpacity style={styles.operationItem} onPress={() => {
						navigation.navigate('TransactionScreen');
					}}>
						<Image source={require('../../../assets/history.png')} style={styles.operationIcon}
							resizeMode={'stretch'} />
						<Text style={{ color: white }}>{language.history}</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.assets}>
					<View style={styles.assetTitle}>
						<Text style={styles.assetText}>{language.assets}</Text>
						<LMTouchableOpacity onPress={() => {
							navigation.navigate("TokenScreen", {
								onSelect: async (token) => {
									dispatch(AssetAction.addAsset(activeWallet.address, activeNetwork.chainId, token));
								},
							});
						}}>
							<Text style={styles.assetText}>{language.add}</Text>
						</LMTouchableOpacity>
					</View>

					<LMFlatList
						data={assets}
						keyExtractor={item => item.symbol}
						renderItem={renderItem}
					/>
				</View>

			</View>
		</SafeAreaView>
	);
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
	logo: {
		width: 50,
		height: 50,
	},
	accountContainer: {
		marginTop: 24,
		height: 50,
		flexDirection: 'row',
	},
	operationContainer: {
		marginTop: 24,
		height: 84,
		backgroundColor: primary,
		borderRadius: 10,
		padding: 8,
		flexDirection: 'row',
	},
	operationItem: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	operationIcon: {
		width: 32,
		height: 32,
	},
	div: {
		width: 1,
		height: 57,
	},
	contentContainer: {
		flex: 1,
		paddingLeft: 10,
		paddingRight: 10,
	},
	activityContainer: {
		marginTop: 24,
		height: 275,
	},
	title: {
		fontSize: 18, fontWeight: 'bold',
	},
	activityItem: {
		width: '100%',
		height: 60,
		marginTop: 1,
		flexDirection: 'row',
	},
	activityIconContainer: {
		width: 32,
		justifyContent: 'center',
		alignItems: 'center',
	},
	activityIcon: {
		width: 24,
		height: 24,
	},
	leftActivityItem: {
		flex: 4,
		justifyContent: 'center',
	},
	rightActivityItem: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	assets: {
		flex: 1,
	},
	assetTitle: {
		width: '100%',
		height: 60,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row'
	},
	assetText: {
		fontWeight: 'bold'
	},
	icon: { width: 32, height: 32, backgroundColor: darkBlue, borderRadius: 5 },
	item: {
		width: '100%',
		height: 60,
		borderBottomWidth: 0.5,
		borderBottomColor: '#e2e2e2',
		flexDirection: 'row'
	},
});
