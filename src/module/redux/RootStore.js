import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit'
import LanguageReducer from '../../persistent/language/LanguageReducer';
import NetworkReducer from '../../persistent/network/NetworkReducer';
import CurrencyReducer from "../../persistent/currency/CurrencyReducer";
import ContactReducer from '../../persistent/contact/ContactReducer';
import WalletReducer from '../../persistent/wallet/WalletReducer';
import UserReducer from '../../persistent/user/UserReducer';
import TokenReducer from '../../persistent/token/TokenReducer';
import AssetReducer from '../../persistent/asset/AssetReducer';

const applicationStore = configureStore({
    reducer: {
        LanguageReducer,
        WalletReducer,
        UserReducer,
        NetworkReducer,
        CurrencyReducer,
        ContactReducer,
        TokenReducer,
        AssetReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }),
})
export default applicationStore;
