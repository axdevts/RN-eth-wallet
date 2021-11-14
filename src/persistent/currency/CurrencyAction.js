import {CurrencyService} from './CurrencyService';
import {
    getCurrencySuccess,
} from './CurrencyReducer';


export const CurrencyAction = {
    getCurrency,
};

function getCurrency(fiat) {
    return async dispatch => {
       const currency = await CurrencyService.getCurrency(fiat);
       dispatch(getCurrencySuccess(currency));
    };
}

