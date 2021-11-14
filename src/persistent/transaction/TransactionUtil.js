import 'react-native-get-random-values';
import '@ethersproject/shims';
import { ethers } from 'ethers';

const { Wallet, utils } = ethers;
const DEFAULT_GAS_LIMIT = 21000;
const DEFAULT_GAS_PRICE = 4000000000; // 4 gwei

function createTransaction(to, value, gasPrice = DEFAULT_GAS_PRICE, gasLimit = DEFAULT_GAS_LIMIT, options = {}) {
	const result = {
		success: true,
		data: {}
	}
	if (!value) {
		result.success = false;
		result.data = 'The transaction value is required';
	}
	else if (!(Number(value) > 0)) {
		result.success = false;
		result.data = 'The transaction value is invalid.';
	}
	else if (isNaN(gasLimit)) gasLimit = DEFAULT_GAS_LIMIT;
	value = utils.parseEther(value);
	result.data = { gasPrice: Number(gasPrice), ...options, to, gasLimit, value };
	return result;
}

function isTransactionValid(transaction) {
	return transaction instanceof Object
		&& Number(transaction.value) > 0 && Number(transaction.gasLimit) > 0 && typeof transaction.to === 'string';
}

export async function sendTransaction(wallet, transaction) {
	try {
		const data = await wallet.sendTransaction(transaction);
		return {
			success: true,
			data: data
		}
	} catch (e) {
		let error = e.reason;
		return {
			success: false,
			data: error
		}
	}
}

const TransactionUtil = {
	createTransaction,
	isTransactionValid,
	sendTransaction
}
export default TransactionUtil;
