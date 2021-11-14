import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { defaultBackground, primary } from '../../component/common/LMStyle';
import LMTextInput from '../../component/common/LMTextInput';
import { useSelector } from 'react-redux';
import LMBackButton from '../../component/common/LMBackButton';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-community/clipboard';

export default function TopUpScreen({ navigation, lang }) {
	const { activeWallet } = useSelector(state => state.WalletReducer);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<LMBackButton color={'black'} onPress={() => {
					navigation.goBack();
				}} />
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>{lang.topUp}</Text>
				</View>
				<View style={{ width: 40 }}>

				</View>
			</View>
			<View style={styles.contentContainer}>
				<View style={styles.block}>
					<LMTextInput
						label={lang.walletAddress}
						value={activeWallet.address}
						placeholder={lang.walletAddress}
						labelStyle={{ color: primary }}
						editable={false}
						hint={lang.clickHereToCopy}
						onHintPress={() => {
							Clipboard.setString(activeWallet.address);
						}}
					/>
				</View>
				<View style={styles.qrCode}>
					<QRCode
						value={activeWallet.address}
						logo={require('../../../assets/logo.png')}
						size={300}
					/>
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
	block: {
		width: '100%',
		marginBottom: 10,
	},
	qrCode: {
		alignItems: 'center'
	}
});
