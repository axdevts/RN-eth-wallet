import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LMSelect from './LMSelect';
import LMIcon from './LMIcon';
import { useDispatch, useSelector } from 'react-redux';
import { WalletAction } from '../../persistent/wallet/WalletAction';
import CommonAPI from '../../module/api/CommonAPI';
import { TransactionAction } from '../../persistent/transaction/TransactionAction';
import LMLoading from './LMLoading';
import { NetworkAction } from '../../persistent/network/NetworkAction';
import { ProviderModule } from '../../module/etherjs/ProviderModule';

export default function LMNetworkSelector({ ...rest }) {
	const { activeNetwork, networks } = useSelector(state => state.NetworkReducer);
	useEffect(async () => {

	}, [])
	const dispatch = useDispatch();
	return (
		<TouchableOpacity style={styles.container} onPress={() => {
			LMSelect.show({
				data: networks,
				onPress: async (item) => {
					LMLoading.show();
					dispatch(NetworkAction.setActiveNetwork(item));
				},
				key: 'name',
				label: 'displayName',
				selected: activeNetwork
			});
		}}>
			<LMIcon hash={activeNetwork.displayName} size={18} />
			<Text style={{ fontSize: 12 }}>{activeNetwork.displayName}</Text>
		</TouchableOpacity>
	);
}
const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	textInput: {
		paddingLeft: 5,
		width: '100%',
		height: 50,
		borderWidth: 0.5,
		borderRadius: 5,
		borderColor: '#d5d5d5',
		backgroundColor: 'white',
	},
	label: { color: 'white', fontWeight: 'bold' },
	error: { color: 'red', fontWeight: 'bold' }
});
