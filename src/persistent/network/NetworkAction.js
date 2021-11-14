import { NetworkService } from './NetworkService';
import { addNetworkSuccess, getNetworksSuccess, setActiveNetworkSuccess } from './NetworkReducer';
import { ProviderModule } from '../../module/etherjs/ProviderModule';
import CommonAPI from '../../module/api/CommonAPI';
import { WalletAction } from '../wallet/WalletAction';
import LMLoading from '../../component/common/LMLoading';
import { TokenAction } from '../token/TokenAction';
import { AssetAction } from '../asset/AssetAction';


export const NetworkAction = {
	add,
	list,
	getActiveNetwork,
	setActiveNetwork,
	update,
	remove
};
function add(params) {
	return async dispatch => {
		const { success, data } = await NetworkService.addNetwork(params);
		if (success) {
			dispatch(addNetworkSuccess(data));
		}
		return { success, data };
	};
}
function update(params) {
	return async dispatch => {
		const { success, data } = await NetworkService.updateNetwork(params);
		if (success) {
			dispatch(addNetworkSuccess(data));
		}
		return { success, data };
	};
}

function remove(params) {
	return async dispatch => {
		const { success, data } = await NetworkService.removeNetwork(params);
		if (success) {
			dispatch(addNetworkSuccess(data));
		}
		return { success, data };
	};
}

function list() {
	return async dispatch => {
		const { success, data } = await NetworkService.list();
		if (success) {
			dispatch(getNetworksSuccess(data));
		}
		return { success, data };
	};
}
function setActiveNetwork(network) {
	return async dispatch => {
		await NetworkService.setActiveNetwork(network);
		await ProviderModule.setProvider(network);
		CommonAPI.setBaseUrl(network.apiUrl);
		dispatch(WalletAction.getActiveWallet()).then(({ success, data }) => {
			if (success) {
				dispatch(WalletAction.getTransactions(data.address));
				dispatch(WalletAction.getWallets());
				dispatch(setActiveNetworkSuccess(network));
				dispatch(TokenAction.getTokens({ chainId: network.chainId }));
				dispatch(AssetAction.list(data.address, network.chainId));
			}
			LMLoading.hide();
		});
	};
}
function getActiveNetwork() {
	return async dispatch => {
		const activeNetwork = await NetworkService.getActiveNetwork()
		dispatch(setActiveNetworkSuccess(activeNetwork));
		return activeNetwork;
	};
}
