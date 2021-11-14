import SensitiveInfoStorage from 'react-native-sensitive-info';
import { LMStorageConstant, LMStorageConstantConfig } from './LMStorageConstant';
import _ from 'lodash';
async function getItem(key) {
	const data = await SensitiveInfoStorage.getItem(key, LMStorageConstantConfig.CONFIG).then(item => item || null);
	return data != null ? JSON.parse(data) : null;
}

async function setItem(key, value) {
	return await SensitiveInfoStorage.setItem(key, JSON.stringify(value) || null, LMStorageConstantConfig.CONFIG);
}

async function deleteItem(key) {
	return await SensitiveInfoStorage.deleteItem(key, LMStorageConstantConfig.CONFIG);
}
async function clear() {
	const keys = _.keys(LMStorageConstant);
	_.each(keys, function (key) {
		deleteItem(LMStorageConstant[key]);
	});
}
export const LMStorageService = {
	getItem,
	setItem,
	deleteItem,
	clear
};
