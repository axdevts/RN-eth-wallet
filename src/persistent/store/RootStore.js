import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {LanguageReducer} from '../language/LanguageReducer';
import {UserReducer} from '../user/UserReducer';
import {WalletReducer} from '../wallet/WalletReducer';
import {TransactionReducer} from '../transaction/TransactionReducer';
import {NetworkReducer} from '../network/NetworkReducer';
import {CurrencyReducer} from "../currency/CurrencyReducer";
import {ContactReducer} from '../contact/ContactReducer';

const allReducers = combineReducers({
    LanguageReducer,
    UserReducer,
    WalletReducer,
    TransactionReducer,
    NetworkReducer,
    CurrencyReducer,
    ContactReducer
});
const applicationStore = createStore(allReducers, applyMiddleware(thunkMiddleware));
export default applicationStore;
