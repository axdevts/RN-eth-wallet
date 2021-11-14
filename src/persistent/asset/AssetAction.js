import { AssetService } from './AssetService';
import { addAssetSuccess, getAssetsSuccess, removeAssetSuccess } from './AssetReducer';
import UniswapModule from '../../module/uniswap/UniswapModule';

export const AssetAction = {
	addAsset,
	removeAsset,
	list
};

function addAsset(address, chainId, token) {
	return async dispatch => {
		const balance = await UniswapModule.tokenBalance(address, token.address);
		await AssetService.addAsset(address, chainId, { ...token, balance });
		dispatch(addAssetSuccess({ ...token, balance }));
	};
}
function removeAsset(address, chainId, token) {
	return async dispatch => {
		const assets = await AssetService.removeAsset(address, chainId, token);
		dispatch(removeAssetSuccess(assets));
	};
}
function list(address, chainId) {
	return async dispatch => {
		console.log('called here after transfer', address, chainId);
		const assets = await AssetService.list(address, chainId);
		for (let i = 0; i < assets.length; i++) {
			assets[i].balance = await UniswapModule.tokenBalance(address, assets[i].address, assets[i].decimals);
		}
		dispatch(getAssetsSuccess(assets));
	};
}
