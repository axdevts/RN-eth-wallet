import 'react-native-get-random-values';
import '@ethersproject/shims';
import { ethers } from 'ethers';
import { ApplicationProperties } from '../../ApplicationProperties';
import { LMStorageService } from '../storage/LMStorageService';
import { LMStorageConstant } from '../storage/LMStorageConstant';
import _ from 'lodash';
async function setActiveNetwork(network) {
	return await LMStorageService.setItem(LMStorageConstant.ACTIVE_NETWORK_STORAGE_KEY, network);
}
async function getActiveNetwork() {
	const activeNetwork = await LMStorageService.getItem(LMStorageConstant.ACTIVE_NETWORK_STORAGE_KEY) || ApplicationProperties.ACTIVE_NETWORK;
	return activeNetwork;
}
async function list() {
	let networks = await LMStorageService.getItem(LMStorageConstant.NETWORKS_STORAGE_KEY) || ApplicationProperties.NETWORKS;
	await LMStorageService.setItem(LMStorageConstant.NETWORKS_STORAGE_KEY, networks);
	return {
		success: true,
		data: networks
	}
}
async function updateNetwork(network) {
	let networks = await LMStorageService.getItem(LMStorageConstant.NETWORKS_STORAGE_KEY) || [];
	_.map(networks, function (sContact) {
		if (sContact.name == network.name) {

		}
	});
	await LMStorageService.setItem(LMStorageConstant.NETWORKS_STORAGE_KEY, networks);
	return {
		success: true,
		data: networks
	}
}
async function removeNetwork(network) {
	let networks = await LMStorageService.getItem(LMStorageConstant.NETWORKS_STORAGE_KEY) || [];
	networks.push(network);
	_.remove(networks, function (sContact) {
		return sContact.name == network.name;
	});
	await LMStorageService.setItem(LMStorageConstant.NETWORKS_STORAGE_KEY, networks);
	return {
		success: true,
		data: networks
	}
}
async function addNetwork(network) {
	let networks = await LMStorageService.getItem(LMStorageConstant.NETWORKS_STORAGE_KEY) || ApplicationProperties.NETWORKS;
	networks.push(network);
	await LMStorageService.setItem(LMStorageConstant.NETWORKS_STORAGE_KEY, networks);
	return {
		success: true,
		data: networks
	}
}
export const NetworkService = {
	list,
	getActiveNetwork,
	setActiveNetwork,
	addNetwork,
	updateNetwork,
	removeNetwork
};
