import React from 'react';
import {LMStorageService} from '../storage/LMStorageService';
import {LMStorageConstant} from '../storage/LMStorageConstant';
import _ from 'lodash';
export const UserService = {
    signIn,
    signUp,
    signOut,
    rememberMe,
    updateProfile
};

async function signIn(params) {
    const {password} = params;
    const user = await LMStorageService.getItem(LMStorageConstant.PASSWORD_STORAGE_KEY);
    if(_.isNil(password) || _.isNil(user) || password == '' || password != user.password){
        return {
            success : false,
            data : {}
        }
    }
    return {
        success : true,
        data : user
    }
}
async function signUp(params) {
    const {password,walletAddress,secretRecoveryPhrase} = params;
    await LMStorageService.setItem(LMStorageConstant.PASSWORD_STORAGE_KEY,{password,walletAddress,secretRecoveryPhrase})
    return {
        success : true,
        data : {password,walletAddress,secretRecoveryPhrase}
    };
}
async function signOut() {
    await LMStorageService.deleteItem(LMStorageConstant.PASSWORD_STORAGE_KEY);
}
async function rememberMe() {
    const user = await LMStorageService.getItem(LMStorageConstant.PASSWORD_STORAGE_KEY);
    return {
        success : !_.isNil(user),
        data : {}
    }
}
async function updateProfile({password}) {
    const user = await LMStorageService.getItem(LMStorageConstant.PASSWORD_STORAGE_KEY);
    user.password = password;
    await LMStorageService.setItem(LMStorageConstant.PASSWORD_STORAGE_KEY,user)
    return {
        success : true,
        data : user
    };
}
