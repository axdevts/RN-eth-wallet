import { ApplicationProperties } from "../../ApplicationProperties";
import { LMStorageService } from "../storage/LMStorageService";
import { LMStorageConstant } from "../storage/LMStorageConstant";
import cryptocompare from 'cryptocompare';

async function getCurrency(fiat) {
	const currency = await LMStorageService.getItem(LMStorageConstant.DEFAULT_CURRENCY_STORAGE_KEY) || ApplicationProperties.DEFAULT_CURRENCY;
	await LMStorageService.setItem(LMStorageConstant.DEFAULT_CURRENCY_STORAGE_KEY, fiat || currency);
	const key = fiat ? fiat.key : currency.key;
	return await cryptocompare.price('ETH', key);
}
export const CurrencyService = {
	getCurrency
};
