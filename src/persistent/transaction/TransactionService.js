import React from 'react';
import TransactionUtil from './TransactionUtil';
import CommonAPI from '../../module/api/CommonAPI';
import { ApplicationProperties } from '../../ApplicationProperties';

export const TransactionService = {
	add,
	list
};

async function add({ wallet, to, value, gasPrice, gasLimit }) {
	const transaction = await TransactionUtil.createTransaction(to, value, gasPrice, gasLimit);
	if (transaction.success) {
		const sendTransaction = await TransactionUtil.sendTransaction(wallet, transaction.data);
		if (sendTransaction.success) {
			console.log(await wallet.provider.waitForTransaction(sendTransaction.data.hash));
		}
		return sendTransaction;
	}
	return transaction;
}

async function list(params) {
	const { address } = params;
	const { status, message, result } = await CommonAPI.get('api?module=account&action=txlist&address=' + address + '&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=' + ApplicationProperties.ETHERSCAN_API_KEY);
	return status === '1' ? result : [];
}

