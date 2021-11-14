import { createSlice } from "@reduxjs/toolkit";
import { Languages } from "../../module/language/lang";
import { ApplicationProperties } from "../../ApplicationProperties";

const LanguageReducer = createSlice({
	name: 'language',
	initialState: {
		language: Languages[ApplicationProperties.DEFAULT_LANGUAGE.code],
		languages: ApplicationProperties.LANGUAGE_LIST,
		defaultLanguage: ApplicationProperties.DEFAULT_LANGUAGE
	},
	reducers: {
		changeSuccess(state, { payload }) {
			state.language = Languages[payload];
		},
		listSuccess(state, { payload }) {
			state.languages = payload;
		},
		changeDefaultSuccess(state, { payload }) {
			state.defaultLanguage = payload;
		}
	},
})
// Extract the action creators object and the reducer
const { actions, reducer } = LanguageReducer;
// Extract and export each action creator by name
export const { changeSuccess, listSuccess, changeDefaultSuccess } = actions;
// Export the reducer, either as a default or named export
export default reducer;
