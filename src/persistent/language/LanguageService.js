import React from 'react';
import {ApplicationProperties} from '../../ApplicationProperties';
import {LMStorageService} from '../storage/LMStorageService';


export const LanguageService = {
    set,
    get,
    list,
    setDefault,
    getDefault
};

async function get() {
    return ApplicationProperties.DEFAULT_LANGUAGE.code;
}

async function set(lang) {
    return await LMStorageService.setItem('lang', lang);
}

async function list() {
    return ApplicationProperties.LANGUAGE_LIST;
}
async function setDefault(language) {
    await LMStorageService.setItem('defaultLang', language);
}

async function getDefault() {
    return await LMStorageService.getItem('defaultLang') || ApplicationProperties.DEFAULT_LANGUAGE;
}
