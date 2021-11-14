import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { green, primary, secondBackground } from '../../component/common/LMStyle';
import _ from 'lodash';
import { WalletAction } from '../../persistent/wallet/WalletAction';
import { useDispatch } from 'react-redux';
import LMButton from '../../component/common/LMButton';
import LMBackButton from '../../component/common/LMBackButton';
import { Root, Toast } from 'popup-ui';
import { UserAction } from '../../persistent/user/UserAction';
import LMLoading from '../../component/common/LMLoading';
import LMToast from '../../component/common/LMToast';

export default function ConfirmMnemonicsScreen({ navigation, route, lang }) {
	const dispatch = useDispatch();

	const { mnemonics, password } = route.params;
	const [selectable, setSelectable] = useState(_.shuffle([...mnemonics]));
	const [selected, setSelected] = useState([]);

	useEffect(() => {

	}, []);

	const onPressMnemonic = (mnemonic, isSelected) => {
		if (isSelected) {
			setSelectable(selectable.filter(m => m !== mnemonic));
			setSelected(selected.concat([mnemonic]));

		} else {
			setSelectable(selectable.concat([mnemonic]));
			setSelected(selected.filter(m => m !== mnemonic));
		}
	}
	const renderMnemonic = (mnemonic, index, selected) => (
		<TouchableOpacity style={styles.mnemonic} key={index} onPress={() => {
			onPressMnemonic(mnemonic, selected)
		}}>
			<View style={{ width: '80%' }}>
				<Text style={{ textAlign: "left" }}>{index + 1}. {mnemonic}</Text>
			</View>
		</TouchableOpacity>
	);
	const renderSelectableMnemonic = (mnemonic, index, selected) => (
		<TouchableOpacity style={styles.selectableMnemonic} key={index} onPress={() => {
			onPressMnemonic(mnemonic, selected)
		}}>
			<Text>{mnemonic}</Text>
		</TouchableOpacity>
	);
	const renderSelected = () => (
		<View style={styles.mnemonicsContainer}>
			{selected.map((mnemonic, index) => {
				return renderMnemonic(mnemonic, index, false);
			})}
		</View>
	);

	const renderSelectable = () => (
		<View style={styles.selectableMnemonicsContainer}>
			{selectable.map((mnemonic, index) => {
				return renderSelectableMnemonic(mnemonic, index, true);
			})}
		</View>
	);
	const isValidSequence = () => {
		return _.isEqual(mnemonics, selected);
	}
	const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
	return (
		<Root>
			<SafeAreaView style={styles.container}>
				<ImageBackground source={require('../../../assets/circle.png')} style={styles.image} resizeMode={'stretch'} />
				<View style={styles.header}>
					<LMBackButton color={'white'} onPress={() => {
						navigation.goBack();
					}} />
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<Image source={require('../../../assets/logo_small.png')} style={styles.logo} resizeMode={'stretch'} />
					</View>
					<View style={{ width: 40 }}>

					</View>
				</View>
				<View style={styles.contentContainer}>
					{renderSelected()}
					{renderSelectable()}
				</View>
				<View style={{ flex: 1, backgroundColor: secondBackground }}>
					<View style={styles.bottomContainer}>
						<View style={styles.infoContainer}>
							<View style={styles.block}>
								<Text style={[styles.message, { fontSize: 28, textAlign: 'center' }]} numberOfLines={1}>{lang.confirmYourSeedPhrase}</Text>
							</View>
							<View style={styles.block}>
								<Text style={[styles.message, { textAlign: 'left' }]}>{lang.writeItSomewhereSafe}</Text>
							</View>
						</View>
						<View style={styles.buttonsContainer}>
							<LMButton
								label={lang.continue}
								onPress={async () => {
									if (!isValidSequence()) {
										LMToast.error({
											title: lang.error,
											text: lang.yourSeedPhraseOrderIsIncorrect,
										})
										return;
									}
									LMLoading.show();
									await sleep(1000);
									dispatch(WalletAction.addFromMnemonic({ mnemonics, name: lang.defaultWalletName, isMain: true })).then(response => {
										const { success, data } = response;
										if (success) {
											dispatch(UserAction.signUp({
												password: password,
												walletAddress: data.address,
												secretRecoveryPhrase: mnemonics.join(' ')
											}));
										}
										LMLoading.hide();
									});
								}}
							/>
						</View>
					</View>
				</View>
			</SafeAreaView>
		</Root>
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
		flex: 2,
		justifyContent: 'center',
		paddingBottom: 10
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
		flex: 1,

	},
	image: {
		position: 'absolute',
		width: '100%',
		height: 300
	},
	mnemonic: {
		margin: 5,
		width: 130,
		height: 40,
		backgroundColor: 'white',
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 0.5
	},
	bottomContainer: {
		width: '100%',
		backgroundColor: 'white',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		position: 'absolute',
		bottom: 0,
		left: 0,
		paddingBottom: 10
	},
	infoContainer: {
		flex: 1,
		padding: 10,
		justifyContent: 'center',
	},
	selectableMnemonicsContainer: {
		width: '100%',
		borderRadius: 20,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	selectableMnemonic: {
		width: 60,
		height: 30,
		backgroundColor: 'white',
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 0.5,
		borderColor: green,
		margin: 2
	},
	logo: {
		width: 50,
		height: 50,
	},
});
