import {createSlice} from '@reduxjs/toolkit';

const ContactReducer = createSlice({
    name: 'contact',
    initialState: {
        contacts: []
    },
    reducers: {
        addContactSuccess(state, {payload}) {
            state.contacts = payload;
        },
        updateContactSuccess(state, {payload}) {
            state.contacts = payload;
        },
        removeContactSuccess(state, {payload}) {
            state.contacts = payload;
        },
        getContactsSuccess(state, {payload}) {
            state.contacts = payload;
        }

    },
})
// Extract the action creators object and the reducer
const { actions, reducer } = ContactReducer;
// Extract and export each action creator by name
export const {addContactSuccess,updateContactSuccess,removeContactSuccess,getContactsSuccess} = actions;
// Export the reducer, either as a default or named export
export default reducer;
