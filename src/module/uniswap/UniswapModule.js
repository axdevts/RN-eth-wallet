import {ProviderModule} from '../etherjs/ProviderModule';
import {
    ETH,
    TokenFactoryPublic, TokensFactoryPublic,
    TradeContext,
    TradeDirection,
    UniswapPair,
    UniswapPairSettings,
    UniswapVersion,
} from 'simple-uniswap-sdk';
import EtherUtilModule from '../etherjs/EtherUtilModule';
import {BigNumber} from 'ethers';

async function trade(ethAddress,from,to,value,direction) {
    try{
        const provider = ProviderModule.getProvider();
        const uniswapPair = new UniswapPair({
            // the contract address of the token you want to convert FROM
            fromTokenContractAddress: from,
            // the contract address of the token you want to convert TO
            toTokenContractAddress: to,
            // the ethereum address of the user using this part of the dApp
            ethereumAddress: ethAddress,
            ethereumProvider: provider,
            settings: new UniswapPairSettings({
                // if not supplied it will use `0.005` which is 0.5%
                // please pass it in as a full number decimal so 0.7%
                // would be 0.007
                slippage: 0.005,
                // if not supplied it will use 20 a deadline minutes
                deadlineMinutes: 20,
                // if not supplied it will try to use multihops
                // if this is true it will require swaps to direct
                // pairs
                disableMultihops: false,
                // for example if you only wanted to turn on quotes for v3 and not v3
                // you can only support the v3 enum same works if you only want v2 quotes
                // if you do not supply anything it query both v2 and v3
                uniswapVersions: [UniswapVersion.v2, UniswapVersion.v3],
            }),
        });

        // now to create the factory you just do
        const uniswapPairFactory = await uniswapPair.createFactory();

        //the amount is the proper entered amount
        // so if they enter 10 pass in 10
        // it will work it all out for you
        const trade = await uniswapPairFactory.trade(value, direction || TradeDirection.input);

        // can also pass in a trade direction here, for example if you want the output
        // aka your doing ETH > AAVE but want to know how much you get for 5 AAVE.
        // const trade = await uniswapPairFactory.trade('10', TradeDirection.output);

        // you should probably check this before they confirm the swap again
        // this is just so its simple to read
        if (!trade.fromBalance.hasEnough) {
            throw new Error('Insufficient balance');
        }
        // subscribe to quote changes this is just in example so your dont miss it
        trade.quoteChanged$.subscribe((value: TradeContext) => {

        });
        return trade;
    }catch (e){
        return e.message;
    }

}
const swap = async (ethWallet,trade) => {
    // Please note when you do your trade if `approvalTransaction` is defined the user does not have enough allowance to perform this trade
    // aka the router can not move their erc20 tokens on their behalf of the user.
    // This will generate the transaction for the approval of moving tokens for the user.
    // This uses the max hex possible which means they will not have to do this again if they want to swap from the SAME from token again later.
    // If they have only approved moving on uniswap v2 and try to execute a v3 trade they would have to approve that but again once approved
    // the v3 router then they will not have to again for that version.
    // Please note the approval is per each erc20 token, so if they picked another from token after they swapped they would need to do this again.
    // You have to send and sign the transaction from within your dApp. Remember when they do not have enough allowance it will mean doing 2 transaction,
    // 1 to allow uniswap to move tokens on their behalf then the next one to actually execute the trade.
    // On `eth` > `erc20` the `approvalTransaction` will always be undefined as you only need to do this when moving `erc20 > eth` and `erc20 > erc20`.
    try{
        if (trade.approvalTransaction) {
            const approved = await ethWallet.sendTransaction(trade.approvalTransaction);
            console.log('approved txHash', approved.hash);
            const approvedReceipt = await approved.wait();
            console.log('approved receipt', approvedReceipt);
        }

        const tradeTransaction = await ethWallet.sendTransaction(trade.transaction);
        console.log('trade txHash', tradeTransaction.hash);
        const tradeReceipt = await tradeTransaction.wait();
        console.log('trade receipt', tradeReceipt);
        return true;
    }catch (e){
        return 'Insufficient funds for intrinsic transaction cost';
    }finally {
        // once done with trade aka they have sent it and you don't need it anymore call
        trade.destroy();
    }

}
const tokenBalance = async (address, tokenContractAddress, decimals = 18) => {
    try{
        const network = await ProviderModule.getNetwork();
        const tokenFactoryPublic = new TokenFactoryPublic(
            tokenContractAddress,
            // this can take the same interface as pair context aka
            // `ChainIdAndProvider` | `EthereumProvider`
            // so you can pass in a providerUrl or a ethereumProvider
            {chainId: network.chainId},
        );

        const ethereumAddress = address;
        const hex = await tokenFactoryPublic.balanceOf(ethereumAddress);

        const formatEther = EtherUtilModule.formatUnits(BigNumber.from(hex).toString(), decimals);
        return {
            hex : hex,
            val : formatEther
        };
    }catch (e){
        console.log(e.message)
        return {
            hex : '0x0',
            val : 0
        };
    }

}
const commonToken = async (ethAddress) => {
    const network = await ProviderModule.getNetwork();
    const ethWallet = ETH.info(network.chainId);
    ethWallet.address = ethWallet.contractAddress;
    ethWallet.balance = await tokenBalance(ethAddress,ethWallet.contractAddress);
    ethWallet.logoURI = 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=013';
    return ethWallet;
}
const getToken = async (tokenAddress) => {
    try{
        const network = await ProviderModule.getNetwork();
        const tokensFactoryPublic = new TokensFactoryPublic(
            // this can take the same interface as pair context aka
            // `ChainIdAndProvider` | `EthereumProvider`
            // so you can pass in a providerUrl or a ethereumProvider
            {chainId: network.chainId}
        );
        const tokens = await tokensFactoryPublic.getTokens([
            tokenAddress
        ]);
        return tokens[0]
    }catch(e){
        return e.message;
    }
}
const UniswapModule = {
    trade,
    tokenBalance,
    commonToken,
    swap,
    getToken

}
export default UniswapModule;
