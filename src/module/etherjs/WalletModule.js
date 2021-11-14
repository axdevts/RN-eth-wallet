import 'react-native-get-random-values';
import '@ethersproject/shims';
import {ethers} from 'ethers';
import {entropyToMnemonic} from '@ethersproject/hdnode';
import {ProviderModule} from './ProviderModule';

const { utils, BigNumber,Wallet } = ethers;


function generateMnemonics() {
    return entropyToMnemonic(utils.randomBytes(16)).split(' ');
}
async function fromMnemonic(mnemonics) {
    try {
        const walletMnemonic = Wallet.fromMnemonic(mnemonics.join(' '));
        return walletMnemonic.connect(ProviderModule.getProvider());
    } catch (e) {
        console.log(e.message);
        return null;
    }
}

async function fromPrivateKey(pk) {
    try {
        if (pk.indexOf('0x') !== 0) pk = `0x${pk}`;
        return new Wallet(pk, ProviderModule.getProvider());
    } catch (e) {
        console.log(e.message)
        return null;
    }
}
async function reconnect(wallet) {
    return wallet.connect(ProviderModule.getProvider())
}
async function getBalance(wallet) {
    return utils.formatEther(await wallet.getBalance());
}

function reduceBigNumbers(items) {
    if (!(items instanceof Array)) return null;
    return items.reduce((prev, next) => prev.add(next), BigNumber.from('0'));
}

//How many units should user pay for this transaction
async function getGasPrice(){
   return await ProviderModule.getGasPrice();
}
/*It's going to estimate the maximum units that user is going to pay. GAS_LIMIT*/
async function estimateGas(transaction){
    return await ProviderModule.estimateGas(transaction);
}
function isTransactionValid(tx) {
    return tx instanceof Object && Number(tx.value) > 0 && Number(tx.gasLimit) > 0 && typeof tx.to === 'string';
}

async function sendTransaction(wallet, tx) {
    if(isTransactionValid(tx)){
        return await wallet.sendTransaction(tx);
    }
    return null;
}
const WalletModule = {
    generateMnemonics,
    fromMnemonic,
    fromPrivateKey,
    getBalance,
    reduceBigNumbers,
    reconnect,
    getGasPrice,
    estimateGas,
    sendTransaction
}
export default WalletModule;
