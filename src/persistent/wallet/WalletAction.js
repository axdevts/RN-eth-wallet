import { TokenFactoryPublic } from 'simple-uniswap-sdk';
import { ethers } from 'ethers';
import {WalletService} from './WalletService';
import {
    addWalletSuccess,
    getTransactionsSuccess,
    getWalletsSuccess,
    setActiveWalletSuccess,
    setRawActiveWalletSuccess,
} from './WalletReducer';
import WalletModule from '../../module/etherjs/WalletModule';
import {LMStorageService} from '../storage/LMStorageService';
import {LMStorageConstant} from '../storage/LMStorageConstant';
import {TokenAction} from '../token/TokenAction';
import {AssetAction} from '../asset/AssetAction';
import {ProviderModule} from '../../module/etherjs/ProviderModule';
import EtherUtilModule from '../../module/etherjs/EtherUtilModule';
import ERC20ABI from '../../data/erc20.json';
import { AssetService } from '../asset/AssetService';

export const WalletAction = {
    addFromMnemonic,
    addFromPrivateKey,
    setActiveWallet,
    getActiveWallet,
    sendTransaction,
	sendTokens,
    getWallets,
    getTransactions,
};

function addFromMnemonic({mnemonics, name, isMain}) {
    return async dispatch => {
        const {success, data} = await WalletService.fromMnemonic(mnemonics);
        if (success) {
            const wallet = {
                name,
                isMain,
                privateKey: data.privateKey,
                address: data.address,
                balance: await WalletModule.getBalance(data),
            };
            dispatch(addWalletSuccess(wallet));
            dispatch(setActiveWalletSuccess(wallet));
            dispatch(setRawActiveWalletSuccess(data));
            dispatch(getTransactions(data.address));
            await LMStorageService.setItem(LMStorageConstant.ACTIVE_WALLET_STORAGE_KEY, wallet);
            await setWallets(wallet);
        }
        return {success, data};
    };
}

async function setWallets(wallet) {
    const wallets = await LMStorageService.getItem(LMStorageConstant.WALLETS_STORAGE_KEY) || [];
    wallets.push(wallet);
    await LMStorageService.setItem(LMStorageConstant.WALLETS_STORAGE_KEY, wallets);
}

function addFromPrivateKey({privateKey, name}) {
    return async dispatch => {
        const {success, data} = await WalletService.fromPrivateKey(privateKey);
        if (success) {
            const wallet = {
                name,
                privateKey: data.privateKey,
                address: data.address,
                balance: await WalletModule.getBalance(data),
            };
            dispatch(addWalletSuccess(wallet));
            await setWallets(wallet);
        }
        return {success, data};
    };
}

function setActiveWallet({privateKey, name,chainId}) {
    return async dispatch => {
        const {success, data} = await WalletService.fromPrivateKey(privateKey);
        const wallet = {
            name,
            privateKey: data.privateKey,
            address: data.address,
            balance: await WalletModule.getBalance(data),
        };
        if (success) {
            dispatch(setActiveWalletSuccess(wallet));
            dispatch(setRawActiveWalletSuccess(data));
            dispatch(getTransactions(data.address));
            await LMStorageService.setItem(LMStorageConstant.ACTIVE_WALLET_STORAGE_KEY, wallet);
            dispatch(AssetAction.list(data.address,chainId));
        }
        return {success, data};
    };
}

function getActiveWallet() {
    return async dispatch => {
        const {privateKey, name} = await LMStorageService.getItem(LMStorageConstant.ACTIVE_WALLET_STORAGE_KEY);
        const {success, data} = await WalletService.fromPrivateKey(privateKey);
        const wallet = {
            name,
            privateKey: data.privateKey,
            address: data.address,
            balance: await WalletModule.getBalance(data),
        };
        if (success) {
            dispatch(setActiveWalletSuccess(wallet));
            dispatch(setRawActiveWalletSuccess(data));
            dispatch(getTransactions(data.address));
        }
        return {success, data};
    };
}

function getWallets() {
    return async dispatch => {
        const wallets = await LMStorageService.getItem(LMStorageConstant.WALLETS_STORAGE_KEY) || [];
        const activeWallets = [];
        for (let i = 0; i < wallets.length; i++) {
            const wallet = wallets[i];
            const {data} = await WalletService.fromPrivateKey(wallet.privateKey);
            const activeWallet = {
                ...wallet,
                balance: await WalletModule.getBalance(data),
            };
            activeWallets.push(activeWallet);
        }
        dispatch(getWalletsSuccess(activeWallets));
    };
}

function sendTransaction(wallet, tx) {
    return async dispatch => {
		try {
			const {success, data} = await WalletService.sendTransaction(wallet, tx);
			if (success) {
				await wallet.provider.waitForTransaction(data.hash);
				dispatch(setActiveWalletSuccess({balance: await WalletModule.getBalance(wallet)}));
			}
		} catch(e) {
			console.log('transaction error', e);
		}
    };
}
function sendTokens(recipientAddress, amount, selectedToken, wallet, currentAddress) {
	return async dispatch => {
		console.log('amount', typeof amount, selectedToken);
		const provider = await ProviderModule.getProvider();
		const network = await ProviderModule.getNetwork();
		const tokenContract = new ethers.Contract(selectedToken.address, ERC20ABI, wallet.connect(provider));
		tokenContract.transfer(recipientAddress, EtherUtilModule.parseUnits(amount.toString(), selectedToken.decimals)).then((transferResult) => {
			dispatch(AssetAction.list(currentAddress, network.chainId));
			dispatch(getTransactions(currentAddress));
		});
	}
}

function getTransactions(address) {
    return async dispatch => {
        const transactions = await WalletService.getTransactions(address);
        dispatch(getTransactionsSuccess(transactions));
    };
}

