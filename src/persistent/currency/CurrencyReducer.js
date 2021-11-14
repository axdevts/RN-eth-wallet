import {ApplicationProperties} from '../../ApplicationProperties';
import {createSlice} from '@reduxjs/toolkit';

const CurrencyReducer = createSlice({
    name: 'currency',
    initialState: {
        currency : ApplicationProperties.DEFAULT_CURRENCY
    },
    reducers: {
        getCurrencySuccess(state, {payload}) {
            let currency = {};
            for (const [key, value] of Object.entries(payload)) {
                currency = {
                    key : key,
                    value : value
                }
            }
            state.currency = currency;
        },
    },
})
// Extract the action creators object and the reducer
const { actions, reducer } = CurrencyReducer;
// Extract and export each action creator by name
export const {getCurrencySuccess} = actions;
// Export the reducer, either as a default or named export
export default reducer;
