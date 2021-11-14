import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { defaultBackground, primary, red } from '../../component/common/LMStyle';
import LMButton from '../../component/common/LMButton';
import { Popup, Root } from 'popup-ui';
import LMTextInput from '../../component/common/LMTextInput';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import LMBackButton from '../../component/common/LMBackButton';
import { NetworkAction } from '../../persistent/network/NetworkAction';

export default function UpdateNetworkScreen({ navigation, lang, route }) {
	const { network } = route.params;
	const dispatch = useDispatch();
	const schema = yup.object().shape({
		name: yup.string().required(lang.pleaseInputRPCUrl),
		chainId: yup.string().required(lang.pleaseInputChainId),
		apiUrl: yup.string().required(lang.pleaseInputBlockExploreUrl),
		displayName: yup.string().required(lang.pleaseInputNetworkName),
		symbol: yup.string().required(lang.pleaseInputSymbol),
	});
	const { control, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = async (data) => {
		data.readonly = false;
		dispatch(NetworkAction.update(data)).then(response => {
			Popup.show({
				type: 'Success',
				title: lang.complete,
				button: true,
				textBody: lang.networkHasBeenUpdated,
				buttontext: lang.ok,
				autoClose: false,
				callback: () => {
					navigation.goBack();
				},
			})
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
						<Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>{lang.updateNetwork}</Text>
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
									label={lang.networkName}
									onBlur={onBlur}
									onChangeText={value => onChange(value)}
									value={value}
									error={errors['displayName']}
									placeholder={lang.networkName}
									labelStyle={{ color: primary }}
									editable={!network.readonly}
								/>
							)}
							name="displayName"
							defaultValue={network.displayName}
						/>
					</View>
					<View style={styles.block}>
						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<LMTextInput
									label={lang.rpcUrl}
									onBlur={onBlur}
									onChangeText={value => onChange(value)}
									value={value}
									error={errors['name']}
									placeholder={lang.rpcUrl}
									labelStyle={{ color: primary }}
									editable={!network.readonly}
									editable={!network.readonly}
								/>
							)}
							name="name"
							defaultValue={network.name}
						/>
						<View style={styles.block}>
							<Controller
								control={control}
								render={({ onChange, onBlur, value }) => (
									<LMTextInput
										label={lang.chainId}
										onBlur={onBlur}
										onChangeText={value => onChange(value)}
										value={value}
										error={errors['chainId']}
										placeholder={lang.chainId}
										labelStyle={{ color: primary }}
										editable={!network.readonly}
									/>
								)}
								name="chainId"
								defaultValue={network.chainId}
							/>
						</View>
						<View style={styles.block}>
							<Controller
								control={control}
								render={({ onChange, onBlur, value }) => (
									<LMTextInput
										label={lang.symbol}
										onBlur={onBlur}
										onChangeText={value => onChange(value)}
										value={value}
										error={errors['symbol']}
										placeholder={lang.symbol}
										labelStyle={{ color: primary }}
										editable={!network.readonly}
									/>
								)}
								name="symbol"
								defaultValue={network.symbol}
							/>
						</View>
						<View style={styles.block}>
							<Controller
								control={control}
								render={({ onChange, onBlur, value }) => (
									<LMTextInput
										label={lang.blockExploreUrl}
										onBlur={onBlur}
										onChangeText={value => onChange(value)}
										value={value}
										error={errors['apiUrl']}
										placeholder={lang.blockExploreUrl}
										labelStyle={{ color: primary }}
										editable={!network.readonly}
									/>
								)}
								name="apiUrl"
								defaultValue={network.apiUrl}
							/>
						</View>
					</View>
				</View>
				{
					!network.readonly &&
					<View style={[styles.buttonsContainer, { marginBottom: 5 }]}>
						<LMButton
							label={lang.save}
							onPress={handleSubmit(onSubmit)}
							style={{ marginBottom: 5 }}
						/>
						{
							!network.readonly && <LMButton
								label={lang.remove}
								onPress={() => {
									dispatch(NetworkAction.remove(network)).then(() => {
										Popup.show({
											type: 'Success',
											title: lang.complete,
											button: true,
											textBody: lang.networkHasBeenDeleted,
											buttontext: lang.ok,
											autoClose: false,
											callback: () => {
												navigation.goBack();
											},
										})

									});
								}}
								style={{ backgroundColor: red }}
							/>
						}
					</View>
				}


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
