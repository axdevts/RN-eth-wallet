import "react-native-get-random-values";
import "@ethersproject/shims"
import {ethers} from 'ethers';
const { utils, BigNumber,Wallet } = ethers;
import { entropyToMnemonic} from "@ethersproject/hdnode";
import {NetworkService} from '../network/NetworkService';

function generateMnemonics() {
    return entropyToMnemonic(utils.randomBytes(16)).split(' ');
}

async function loadWalletFromMnemonics(mnemonics,network) {
    try {
        const wallet = Wallet.fromMnemonic(mnemonics.join(' '));
        const newWallet = new Wallet(wallet.privateKey, await NetworkService.getProvider(network));
        return newWallet;
    } catch (e) {
        console.log(e.message);
        return null;
    }

}

async function loadWalletFromPrivateKey(pk, network) {
    try {
        if (pk.indexOf('0x') !== 0) pk = `0x${pk}`;
        const newWallet = new Wallet(pk, await NetworkService.getProvider(network));
        return newWallet;
    } catch (e) {
        console.log(e.message)
        return null;
    }
}

function formatBalance(balance) {
    return utils.formatEther(balance);
}

function reduceBigNumbers(items) {
    if (!(items instanceof Array)) return null;
    return items.reduce((prev, next) => prev.add(next), BigNumber.from('0'));
}

function calculateFee({ gasUsed, gasPrice }) {
    return gasUsed * Number(formatBalance(gasPrice));
}

function estimateFee({ gasLimit, gasPrice }) {
    return BigNumber.from(String(gasLimit)).mul(BigNumber.from(String(gasPrice)));
}
const WalletUtil = {
    generateMnemonics,
    loadWalletFromMnemonics,
    loadWalletFromPrivateKey,
    formatBalance,
    reduceBigNumbers,
    calculateFee,
    estimateFee
}
export default WalletUtil;
