import { UserService } from './UserService';
import { LMStorageService } from '../storage/LMStorageService';
import { clearDataSuccess, rememberMeSuccess, signInSuccess, signOutSuccess, signUpSuccess } from './UserReducer';
import { WalletAction } from '../wallet/WalletAction';
import LMLoading from '../../component/common/LMLoading';
import { NetworkAction } from '../network/NetworkAction';
import { ProviderModule } from '../../module/etherjs/ProviderModule';
import CommonAPI from '../../module/api/CommonAPI';


export const UserAction = {
	signIn,
	signUp,
	signOut,
	rememberMe,
	clear,
	updateProfile
};
function signIn(params) {
	return async dispatch => {
		const { success, data } = await UserService.signIn(params);
		if (success) {
			dispatch(NetworkAction.getActiveNetwork()).then(async activeNetwork => {
				await ProviderModule.setProvider(activeNetwork);
				CommonAPI.setBaseUrl(activeNetwork.apiUrl);
				dispatch(WalletAction.getActiveWallet()).then(() => {
					dispatch(WalletAction.getWallets());
					dispatch(signInSuccess(data));
					LMLoading.hide();
				});
			});
		}
		return { success, data };
	};
}

function signUp(params) {
	return async dispatch => {
		const { success, data } = await UserService.signUp(params);
		if (success) {
			dispatch(signUpSuccess(data));
		}
		return { success, data };
	};
}
function signOut() {
	return async dispatch => {
		dispatch(signOutSuccess());
	};
}
function rememberMe() {
	return async dispatch => {
		const { success, data } = await UserService.rememberMe();
		if (success) {
			dispatch(rememberMeSuccess(data));
		}
		return { success, data };
	};
}
function updateProfile(user) {
	return async dispatch => {
		const { success, data } = await UserService.updateProfile(user);
		if (success) {
			dispatch(updateProfile(data));
		}
		return { success, data };
	};
}
function clear() {
	return async dispatch => {
		await LMStorageService.clear();
		dispatch(clearDataSuccess());
	};
}
