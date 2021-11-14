import {ApplicationProperties} from '../../ApplicationProperties';
import {ethers} from 'ethers';


let provider = ethers.getDefaultProvider('homestead', ApplicationProperties.API_PROVIDERS);
async function setProvider(network) {
    const {name} = network;
    provider = ethers.getDefaultProvider(name, ApplicationProperties.API_PROVIDERS);
    return provider;
}
function getProvider() {
    return provider;
}
async function getNetwork(){
    return await provider.getNetwork();
}
async function getGasPrice(){
    return await provider.getGasPrice();
}
async function estimateGas(transaction){
    return await provider.estimateGas(transaction);
}

async function ready(){
    return await provider.ready;
}

export const ProviderModule = {
    setProvider,
    getProvider,
    getNetwork,
    getGasPrice,
    estimateGas,
    ready
};
