import {createSlice} from '@reduxjs/toolkit';

const AssetReducer = createSlice({
    name: 'asset',
    initialState: {
        assets: [],
    },
    reducers: {
        addAssetSuccess(state, {payload}) {
            state.assets = [payload,...state.assets];
        },
        removeAssetSuccess(state, {payload}) {
            state.assets = payload;
        },
        getAssetsSuccess(state, {payload}) {
            state.assets = payload;
        },
    },
});
// Extract the action creators object and the reducer
const {actions, reducer} = AssetReducer;
// Extract and export each action creator by name
export const {addAssetSuccess,removeAssetSuccess,getAssetsSuccess} = actions;
// Export the reducer, either as a default or named export
export default reducer;
