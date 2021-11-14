import axios from 'axios';
import { ethers } from 'ethers';
import { ApplicationProperties } from '../../ApplicationProperties';
import { LMStorageService } from '../storage/LMStorageService';
import { LMStorageConstant } from '../storage/LMStorageConstant';
import _ from 'lodash'
import { ProviderModule } from '../../module/etherjs/ProviderModule';
import ERC20ABI from '../../data/erc20.json';
async function addCustomToken(token) {
	const customs = await LMStorageService.getItem(LMStorageConstant.CUSTOM_TOKENS_STORAGE_KEY) || [];
	const tokens = await LMStorageService.getItem(LMStorageConstant.TOKENS_STORAGE_KEY) || [];
	await LMStorageService.setItem(LMStorageConstant.TOKENS_STORAGE_KEY, [token, ...tokens]);
	await LMStorageService.setItem(LMStorageConstant.CUSTOM_TOKENS_STORAGE_KEY, [token, ...customs]);
}
async function getTokens(name) {
	const { data } = await axios.get(ApplicationProperties.TOKEN_URLS[name]);
	return data;
}
async function getTokenBalance(token, walletAddress) {
	const provider = ProviderModule.getProvider();
	const tokenContract = new ethers.Contract(token.address, ERC20ABI, provider);
	const balance = await tokenContract.balanceOf(walletAddress);
	return balance;
}
async function getCommonBaseTokens() {
	return await LMStorageService.getItem(LMStorageConstant.COMMON_TOKENS_STORAGE_KEY) || ApplicationProperties.COMMON_TOKENS;
}
async function isExist(tokenContractAddress) {
	const tokens = await LMStorageService.getItem(LMStorageConstant.TOKENS_STORAGE_KEY) || [];
	const index = _.findIndex(tokens, function (token) {
		return token.address = tokenContractAddress;
	});
	console.log(tokens[index]);
	return index == -1 ? false : true;
}
export const TokenService = {
	getTokens,
	getCommonBaseTokens,
	addCustomToken,
	isExist,
	getTokenBalance
};
