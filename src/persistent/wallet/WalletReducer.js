import { createSlice } from '@reduxjs/toolkit';

const WalletReducer = createSlice({
	name: 'wallet',
	initialState: {
		wallets: [],
		activeWallet: {},
		rawActiveWallet: {},
		transactions: []
	},
	reducers: {
		addWalletSuccess(state, { payload }) {
			state.wallets = [...state.wallets, payload];
		},
		setActiveWalletSuccess(state, { payload }) {
			state.activeWallet = { ...state.activeWallet, ...payload };
		},
		setRawActiveWalletSuccess(state, { payload }) {
			state.rawActiveWallet = payload;
		},
		getTransactionsSuccess(state, { payload }) {
			state.transactions = payload;
		},
		getWalletsSuccess(state, { payload }) {
			state.wallets = payload;
		},
	},
})
// Extract the action creators object and the reducer
const { actions, reducer } = WalletReducer;
// Extract and export each action creator by name
export const { addWalletSuccess, setActiveWalletSuccess, setRawActiveWalletSuccess, getTransactionsSuccess, getWalletsSuccess } = actions;
// Export the reducer, either as a default or named export
export default reducer;
