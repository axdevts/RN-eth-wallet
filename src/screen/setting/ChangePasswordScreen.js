import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { defaultBackground, green, primary } from '../../component/common/LMStyle';
import LMButton from '../../component/common/LMButton';
import { Root } from 'popup-ui';
import LMTextInput from '../../component/common/LMTextInput';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import LMBackButton from '../../component/common/LMBackButton';
import { UserAction } from '../../persistent/user/UserAction';
import LMToast from '../../component/common/LMToast';

export default function ChangePasswordScreen({ navigation, route, lang }) {
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.UserReducer);
	const [securePassword, setSecurePassword] = useState(true);
	const schema = yup.object().shape({
		currentPassword: yup.string().required(lang.pleaseCurrentPassword).min(8, lang.passwordMustBeAtLeast8Characters),
		password: yup.string().required(lang.pleaseInputPassword).min(8, lang.passwordMustBeAtLeast8Characters),
		confirmPassword: yup.string().required(lang.pleaseInputConfirmPassword).oneOf([yup.ref('password'), null], lang.passwordMustMatch)
	});
	const { control, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = async ({ currentPassword, password, confirmPassword }) => {
		if (user.password != currentPassword) {
			LMToast.error({
				title: lang.error,
				text: lang.yourCurrentPasswordIsIncorrect,
			})

		} else {
			dispatch(UserAction.updateProfile({ currentPassword, password, confirmPassword })).then(() => {
				LMToast.popupSuccess({
					title: lang.complete,
					message: lang.yourPasswordHasBeenChanged,
					buttontext: lang.ok,
					callback: () => {
						navigation.goBack();
					},
				})

			})
		}

	};
	const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
	return (
		<Root>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<LMBackButton color={'black'} onPress={() => {
						navigation.goBack();
					}} />
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 10 }}>
						<Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>{lang.changePassword}</Text>
					</View>
				</View>
				<View style={styles.contentContainer}>
					<View style={styles.block}>
						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<LMTextInput
									label={lang.currentPassword}
									onBlur={onBlur}
									onChangeText={value => onChange(value)}
									value={value}
									error={errors['currentPassword']}
									placeholder={lang.currentPassword}

									secureTextEntry={securePassword}
									hint={lang.clickHereToShowYourPassword}
									onHintPress={async () => {
										setSecurePassword(false);
										await sleep(5000);
										setSecurePassword(true);
									}}
								/>
							)}
							name="currentPassword"
							defaultValue=""
						/>
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
									placeholder={lang.password}

									secureTextEntry={securePassword}
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
					<View style={styles.block}>
						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<LMTextInput
									label={lang.confirmPassword}
									onBlur={onBlur}
									onChangeText={value => onChange(value)}
									value={value}
									error={errors['confirmPassword']}
									placeholder={lang.confirmPassword}

									secureTextEntry={securePassword}
									hint={lang.clickHereToShowYourPassword}
									onHintPress={async () => {
										setSecurePassword(false);
										await sleep(5000);
										setSecurePassword(true);
									}}
								/>
							)}
							name="confirmPassword"
							defaultValue=""
						/>
					</View>
				</View>
				<View style={[styles.buttonsContainer, { marginBottom: 5 }]}>
					<LMButton
						label={lang.save}
						onPress={handleSubmit(onSubmit)}
					/>
				</View>
			</SafeAreaView>
		</Root>
	)
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
	},
	header: {
		height: 50,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		paddingRight: 10
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
	logo: {
		width: 70,
		height: 50,
	},
	icon: { width: 32, height: 32, backgroundColor: 'green', borderRadius: 5 }
});
