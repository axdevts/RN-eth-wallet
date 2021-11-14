import { LanguageService } from './LanguageService';
import { changeDefaultSuccess, changeSuccess, listSuccess } from "./LanguageReducer";

export const LanguageAction = { set, list, setDefault, getDefault };

function set(language) {
	return async dispatch => {
		const lang = language || await LanguageService.get();
		await LanguageService.set(lang);
		dispatch(changeSuccess(lang));
	};

}
function list() {
	return async dispatch => {
		dispatch(listSuccess(await LanguageService.list()));
	};
}
function setDefault(language) {
	return async dispatch => {
		await LanguageService.setDefault(language);
		dispatch(changeDefaultSuccess(language));
	};
}
function getDefault() {
	return async dispatch => {
		dispatch(changeDefaultSuccess(await LanguageService.getDefault()));
	};
}
