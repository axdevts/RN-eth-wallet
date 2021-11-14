import { ContactService } from './ContactService';
import { addContactSuccess, getContactsSuccess, removeContactSuccess, updateContactSuccess } from './ContactReducer';

export const ContactAction = {
	add,
	list,
	update,
	remove,
};

function add(contact) {
	return async dispatch => {
		const { success, data } = await ContactService.add(contact);
		if (success) {
			dispatch(addContactSuccess(data));
		}
	};
}

function update(contact) {
	return async dispatch => {
		const { success, data } = await ContactService.update(contact);
		if (success) {
			dispatch(updateContactSuccess(data));
		}
	};
}

function remove(contact) {
	return async dispatch => {
		const { success, data } = await ContactService.remove(contact);
		if (success) {
			dispatch(removeContactSuccess(data));
		}
	};
}

function list() {
	return async dispatch => {
		const { success, data } = await ContactService.list();
		if (success) {
			dispatch(getContactsSuccess(data));
		}
	};
}
