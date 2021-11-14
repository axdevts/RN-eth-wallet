import {createSlice} from '@reduxjs/toolkit';
import {ApplicationProperties} from '../../ApplicationProperties';

const NetworkReducer = createSlice({
    name: 'network',
    initialState: {
        networks: [],
        activeNetwork: ApplicationProperties.ACTIVE_NETWORK
    },
    reducers: {
        addNetworkSuccess(state, {payload}) {
            state.networks = payload;
        },
        setActiveNetworkSuccess(state, {payload}) {
            state.activeNetwork = payload;
        },
        getNetworksSuccess(state, {payload}) {
            state.networks = payload;
        },
    },
})
// Extract the action creators object and the reducer
const { actions, reducer } = NetworkReducer;
// Extract and export each action creator by name
export const { addNetworkSuccess,setActiveNetworkSuccess,getNetworksSuccess} = actions;
// Export the reducer, either as a default or named export
export default reducer;
