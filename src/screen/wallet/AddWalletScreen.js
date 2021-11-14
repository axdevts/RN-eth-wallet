import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { defaultBackground, primary } from '../../component/common/LMStyle';
import LMButton from '../../component/common/LMButton';
import { Root } from 'popup-ui';
import LMTextInput from '../../component/common/LMTextInput';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import LMBackButton from '../../component/common/LMBackButton';
import { WalletAction } from '../../persistent/wallet/WalletAction';
import _ from 'lodash';
import LMToast from '../../component/common/LMToast';

export default function AddWalletScreen({ navigation, lang }) {
	const dispatch = useDispatch();
	const { wallets } = useSelector(state => state.WalletReducer);
	const [privateKeySecure, setPrivateKeySecure] = useState(true);
	const schema = yup.object().shape({
		privateKey: yup.string().required(lang.pleaseInputYourPrivateKey),
		name: yup.string().required(lang.pleaseInputWalletName)
	});
	const { control, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = async ({ privateKey, name }) => {
		const isExits = await _.find(wallets, function (wallet) {
			return wallet.privateKey.includes(privateKey);
		});
		if (isExits) {
			LMToast.error({
				title: lang.error,
				text: lang.yourPrivateKeyHasAlreadyImported
			})
			return;
		}
		dispatch(WalletAction.addFromPrivateKey({ privateKey, name })).then(({ success, data }) => {
			if (success) {
				LMToast.popupSuccess({
					title: lang.complete,
					message: lang.aNewWalletHasBeenAdded,
					buttonText: lang.ok,
					callback: () => {
						navigation.goBack();
					},
				});
			} else {
				LMToast.error({
					title: lang.error,
					text: lang.yourPrivateKeyIsIncorrect
				})
			}
		});
	};
	return (
		<Root>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<LMBackButton color={'black'} onPress={() => {
						navigation.goBack();
					}} />
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>{lang.addYourWallet}</Text>
					</View>
					<View style={{ width: 40 }}>

					</View>
				</View>
				<View style={styles.contentContainer}>
					<View style={styles.block}>
						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<LMTextInput
									label={lang.walletName}
									onBlur={onBlur}
									onChangeText={value => onChange(value)}
									value={value}
									error={errors['name']}
									placeholder={lang.enterYourWallet}
									labelStyle={{ color: primary }}
								/>
							)}
							name="name"
							defaultValue=""
						/>
					</View>
					<View style={styles.block}>
						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<LMTextInput
									label={lang.privateKey}
									onBlur={onBlur}
									onChangeText={value => onChange(value)}
									value={value}
									error={errors['privateKey']}
									placeholder={lang.enterOrPasteYourPrivateKey}
									labelStyle={{ color: primary }}
									secureTextEntry={privateKeySecure}
									hint={lang.clickToShow}
									onHintPress={() => {
										setPrivateKeySecure(false);
										setTimeout(function () {
											setPrivateKeySecure(true);
										}, 5000);
									}}
								/>
							)}
							name="privateKey"
							defaultValue=""
						/>
					</View>
				</View>
				<View style={[styles.buttonsContainer, { marginBottom: 5 }]}>
					<LMButton
						label={lang.confirm}
						onPress={handleSubmit(onSubmit)}
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
