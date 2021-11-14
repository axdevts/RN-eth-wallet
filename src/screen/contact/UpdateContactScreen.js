import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { darkBlue, defaultBackground, green, primary } from '../../component/common/LMStyle';
import LMButton from '../../component/common/LMButton';
import { Root } from 'popup-ui';
import LMTextInput from '../../component/common/LMTextInput';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import LMBackButton from '../../component/common/LMBackButton';
import { ContactAction } from '../../persistent/contact/ContactAction';
import Clipboard from '@react-native-community/clipboard';
import QRCode from 'react-native-qrcode-svg';
import LMToast from '../../component/common/LMToast';

export default function UpdateContactScreen({ navigation, route, lang }) {
	const { contact } = route.params;
	let qrCodeAddress = null;
	if (route.params) {
		qrCodeAddress = route.params.qrCodeAddress;
	}
	const { contacts } = useSelector(state => state.ContactReducer);
	const dispatch = useDispatch();
	const schema = yup.object().shape({
		address: yup.string().required(lang.pleaseInputWalletName).isAddress(lang.addressIsIncorrect),
		name: yup.string().required(lang.pleaseInputContactName),
	});
	const { control, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = async ({ address, name }) => {
		dispatch(ContactAction.update({ address, name })).then(() => {
			LMToast.popupSuccess({
				title: lang.complete,
				message: lang.contactHasBeenUpdated,
				buttontext: lang.ok,
				callback: () => {
					navigation.goBack();
				},
			});
		});

	};
	return (
		<Root>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<LMBackButton color={'black'} onPress={() => {
						navigation.goBack();
					}} />
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 10 }}>
						<Text
							style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>{lang.updateContact}</Text>
					</View>
					<TouchableOpacity style={[styles.logo, { alignItems: 'flex-end', justifyContent: 'center' }]}
						onPress={() => {
							navigation.navigate('ScannerScreen', {
								screenName: 'AddContactScreen',
							});
						}}>
						<Image source={require('../../../assets/qr-code.png')} style={styles.icon}
							resizeMode={'stretch'} />
					</TouchableOpacity>
				</View>
				<View style={styles.contentContainer}>
					<View style={styles.block}>
						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<LMTextInput
									label={lang.contactName}
									onBlur={onBlur}
									onChangeText={value => onChange(value)}
									value={value}
									error={errors['name']}
									placeholder={lang.enterContactName}

								/>
							)}
							name="name"
							defaultValue={contact.name}
						/>
					</View>
					<View style={styles.block}>
						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<LMTextInput
									label={lang.walletAddress}
									onBlur={onBlur}
									onChangeText={value => onChange(value)}
									value={value}
									error={errors['address']}
									placeholder={lang.enterOrPasteWalletAddress}

									hint={lang.clickHereToCopy}
									onHintPress={() => {
										Clipboard.setString(qrCodeAddress || contact.address);
									}}
								/>
							)}
							name="address"
							defaultValue={qrCodeAddress || contact.address}
						/>
					</View>
					<QRCode
						value={qrCodeAddress || contact.address}
						logo={require('../../../assets/logo_small.png')}
						size={300}
					/>
				</View>
				<View style={[styles.buttonsContainer, { marginBottom: 5 }]}>
					<LMButton
						label={lang.save}
						onPress={handleSubmit(onSubmit)}
						style={{ marginBottom: 5 }}
					/>
					<LMButton
						label={lang.remove}
						onPress={() => {
							dispatch(ContactAction.remove(contact)).then(() => {
								LMToast.popupSuccess({
									title: lang.complete,
									message: lang.contactHasBeenRemoved,
									buttontext: lang.ok,
									callback: () => {
										navigation.goBack();
									},
								});

							});
						}}
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
		paddingRight: 10,
	},
	contentContainer: {
		flex: 1,
		paddingLeft: 10,
		paddingRight: 10,
		alignItems: 'center',
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
	logo: {
		width: 70,
		height: 50,
	},
	icon: { width: 32, height: 32, backgroundColor: darkBlue, borderRadius: 5 },
});
