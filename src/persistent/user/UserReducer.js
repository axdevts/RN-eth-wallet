import {createSlice} from '@reduxjs/toolkit';

const UserReducer = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        passwordConfirmed : false,
        user : {}
    },
    reducers: {
        signInSuccess(state, {payload}) {
            state.passwordConfirmed =true;
            state.loggedIn =true;
            state.user = payload;
        },
        signUpSuccess(state, {payload}) {
            state.passwordConfirmed =true;
            state.loggedIn =true;
            state.user = payload;
        },
        signOutSuccess(state, {payload}) {
            state.passwordConfirmed =false;
            state.loggedIn =true;
        },
        rememberMeSuccess(state, {payload}) {
            state.passwordConfirmed =false;
            state.loggedIn =true;
        },
        clearDataSuccess(state, {payload}) {
            state.passwordConfirmed =false;
            state.loggedIn =false;
            state.user = {};
        },
        updateProfileSuccess(state, {payload}) {
            state.user = payload;
        },
    },
})
// Extract the action creators object and the reducer
const { actions, reducer } = UserReducer;
// Extract and export each action creator by name
export const {signInSuccess,signUpSuccess,signOutSuccess,rememberMeSuccess,clearDataSuccess,updateProfileSuccess} = actions;
// Export the reducer, either as a default or named export
export default reducer;
