import { LMStorageService } from '../storage/LMStorageService';

async function addAsset(address, chainId, token) {
	const assets = await LMStorageService.getItem(`LMStorageConstant.ASSET_STORAGE_KEY_${address}_${chainId}`) || [];
	assets.push(token);
	await LMStorageService.setItem(`LMStorageConstant.ASSET_STORAGE_KEY_${address}_${chainId}`, assets);
}
async function removeAsset(address, chainId, token) {
	const assets = await LMStorageService.getItem(`LMStorageConstant.ASSET_STORAGE_KEY_${address}_${chainId}`) || [];
	_.remove(assets, function (asset) {
		return asset.address == token.address;
	});
	await LMStorageService.setItem(`LMStorageConstant.ASSET_STORAGE_KEY_${address}_${chainId}`, assets);
	return assets;
}
async function list(address, chainId) {
	const assets = await LMStorageService.getItem(`LMStorageConstant.ASSET_STORAGE_KEY_${address}_${chainId}`) || [];
	return assets;
}
async function isExist(tokenContractAddress) {

}
export const AssetService = {
	addAsset,
	removeAsset,
	list,
	isExist
};
