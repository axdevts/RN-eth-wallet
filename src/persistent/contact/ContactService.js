import React from 'react';
import {LMStorageService} from '../storage/LMStorageService';
import {LMStorageConstant} from '../storage/LMStorageConstant';
import _ from 'lodash';

export const ContactService = {
    add,
    update,
    remove,
    list
};

async function add(contact) {
    const contacts = await LMStorageService.getItem(LMStorageConstant.CONTACT_STORAGE_KEY) || [];
    contacts.push(contact);
    await LMStorageService.setItem(LMStorageConstant.CONTACT_STORAGE_KEY, contacts);
    return {
        success : true,
        data: contacts
    };
}
async function update(contact) {
    const contacts = await LMStorageService.getItem(LMStorageConstant.CONTACT_STORAGE_KEY) || [];
    _.map(contacts,function(sContact){
        if(sContact.address == contact.address){
            sContact.name = contact.name;
        }
    });
    await LMStorageService.setItem(LMStorageConstant.CONTACT_STORAGE_KEY, contacts);
    return {
        success : true,
        data: contacts
    };
}
async function remove(contact) {
    const contacts = await LMStorageService.getItem(LMStorageConstant.CONTACT_STORAGE_KEY) || [];
    _.remove(contacts,function(sContact){
        return sContact.address == contact.address;
    });
    await LMStorageService.setItem(LMStorageConstant.CONTACT_STORAGE_KEY, contacts);
    return {
        success :true,
        data: contacts
    };
}
async function list() {
    const contacts = await LMStorageService.getItem(LMStorageConstant.CONTACT_STORAGE_KEY) || [];
    return {
        success : true,
        data: contacts
    };
}

