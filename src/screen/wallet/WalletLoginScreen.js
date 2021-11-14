import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { blue, darkBlue, gray, green, grey, primary, secondBackground } from '../../component/common/LMStyle';
import LMButton from '../../component/common/LMButton';
import { Root } from 'popup-ui';
import LMTextInput from '../../component/common/LMTextInput';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { UserAction } from '../../persistent/user/UserAction';
import LMAlert from '../../component/common/LMAlert';
import LMToast from '../../component/common/LMToast';
import LMLoading from '../../component/common/LMLoading';

export default function WalletLoginScreen({ navigation, lang }) {
	const dispatch = useDispatch();
	const schema = yup.object().shape({
		password: yup.string().required(lang.pleaseInputPassword).min(8, lang.passwordMustBeAtLeast8Characters)
	});
	const { control, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema),
	});
	const [securePassword, setSecurePassword] = useState(true);
	const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
	const onSubmit = ({ password }) => {
		LMLoading.show();
		dispatch(UserAction.signIn({
			password: password
		})).then((data) => {
			const { success } = data;
			LMLoading.hide();
			if (!success) {
				LMToast.error({
					title: lang.error,
					text: lang.invalidCredentials,
				});
			}
		})
	};
	return (
		<Root>
			<SafeAreaView style={styles.container}>
				<Image source={require('../../../assets/circle.png')} style={styles.image} resizeMode={'stretch'} />
				<View style={styles.contentContainer}>
					<Image source={require('../../../assets/logo.png')} style={styles.loginBg} resizeMode={'stretch'} />
				</View>
				<View style={{ flex: 1 }}>
					<View style={styles.bottomContainer}>
						<View style={styles.infoContainer}>
							<View style={styles.block}>
								<Text style={[styles.message, { fontSize: 32, textAlign: 'center' }]}>{lang.welcomeBack}</Text>
							</View>
							<View style={styles.block}>
								<Text style={[styles.message, { color: grey, textAlign: 'center' }]}>{lang.theBestDecentralized}</Text>
							</View>
							<View style={styles.block}>
								<Controller
									control={control}
									render={({ onChange, onBlur, value }) => (
										<LMTextInput
											label={lang.password}
											onBlur={onBlur}
											onChangeText={value => onChange(value)}
											value={value}
											error={errors['password']}
											secureTextEntry={securePassword}
											placeholder={'Password'}
											labelStyle={{ color: darkBlue }}
											hint={lang.clickHereToShowYourPassword}
											onHintPress={async () => {
												setSecurePassword(false);
												await sleep(5000);
												setSecurePassword(true);
											}}
										/>
									)}
									name="password"
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
						<View style={styles.buttonsContainer}>
							<LMButton
								label={lang.importWallet}
								onPress={() => {
									LMAlert.show({
										message: lang.areYouSureWantToEraseYourWallet,
										content: () => {
											return (
												<>
													<View>
														<Text style={{ textAlign: 'justify' }}>{lang.yourCurrentWalletAccountsAssetsWillBe} <Text style={{ fontWeight: 'bold' }}>{lang.removedFromThisAppPermanently}</Text> {lang.thisActionCannotBeUndone}</Text>
													</View>
													<View>
														<Text style={{ textAlign: 'justify' }}>{lang.youCanOnlyRecoverThisWalletWithYour} <Text style={{ fontWeight: 'bold' }}>{lang.secretRecoveryPhrase}</Text> {lang.XPayDoesNotHaveYourSecretRecoveryPhrase}</Text>
													</View>
												</>
											)
										},
										onOkPress: async () => {
											dispatch(UserAction.clear()).then(() => {
												navigation.navigate("ImportWalletScreen");
											});

										}
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
	},
	contentContainer: {
		flex: 1,
		justifyContent: 'center',
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
	mnemonicsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap',
		marginHorizontal: 10,
		borderRadius: 10,
	},
	overlayMnemonics: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		position: 'absolute',
		width: '100%',
		height: 300,
	},
	loginBg: {
		width: 150,
		height: 200,
	},
	mnemonic: {
		margin: 14,
		width: 130,
		height: 50,
		backgroundColor: 'white',
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 0.5,
		borderColor: green,
	},
	bottomContainer: {
		width: '100%',
		minHeight: 250,
		backgroundColor: 'white',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		position: 'absolute',
		bottom: 0,
		left: 0,
		paddingBottom: 10,
	},
	infoContainer: {
		flex: 1,
		padding: 10,
		justifyContent: 'center',
	},
});
