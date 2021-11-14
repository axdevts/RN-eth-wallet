import {TokenService} from './TokenService';
import {addCustomTokenSuccess, getTokensSuccess, addSelectedToken} from './TokenReducer';
import _ from 'lodash';
import {ApplicationProperties} from '../../ApplicationProperties';
import {LMStorageService} from '../storage/LMStorageService';
import {LMStorageConstant} from '../storage/LMStorageConstant';

export const TokenAction = {
    getTokens,
    filterTokens,
    addCustomTokens,
	selectTokenTransfer
};

function selectTokenTransfer({token}) {
	return dispatch => {
		dispatch(addSelectedToken(token))
	}
}

function getTokens({chainId}) {
    return async dispatch => {
        let data = [];
        for (const [key, value] of Object.entries(ApplicationProperties.TOKEN_URLS)) {
            const tokens = await fetchData(key,chainId);
            data = [...data,...tokens];
        }
        const customs = await LMStorageService.getItem(LMStorageConstant.CUSTOM_TOKENS_STORAGE_KEY) || [] ;
        data = [...data,...customs];
        await LMStorageService.setItem(LMStorageConstant.TOKENS_STORAGE_KEY,data);
        dispatch(getTokensSuccess(await fetchCommonTokens(chainId)));
    };
}
function addCustomTokens(token) {
    return async dispatch => {
        await TokenService.addCustomToken(token);
        dispatch(addCustomTokenSuccess(token));
    };
}
function filterTokens(keyword,chainId) {
    return async dispatch => {
        if(keyword.trim() == ''){
            dispatch(getTokensSuccess(await fetchCommonTokens(chainId)));
        }else{
            keyword = _.toUpper(keyword);
            const tokens = await LMStorageService.getItem(LMStorageConstant.TOKENS_STORAGE_KEY);
            const data = _.remove(tokens,function(token){
                return token.name.includes(keyword) || token.symbol.includes(keyword) || _.toUpper(token.address).includes(keyword)
            });
            dispatch(getTokensSuccess(data));
        }
    };
}
async function fetchData(name, chainId) {
    const {tokens} = await TokenService.getTokens(name);
    const temp1 = _.remove([...tokens], function (token) {
        return token.chainId == chainId;
    });
    return temp1;
}

async function fetchCommonTokens(chainId) {
    const commonBase = await TokenService.getCommonBaseTokens();
    const temp2 = _.remove([...commonBase], function (token) {
        return token.chainId == chainId;
    });
    return temp2;
}
