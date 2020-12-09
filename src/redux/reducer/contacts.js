import produce from "immer";
import {
	LOAD_CONTACTS,
	ADD_CONTACTS,
	EDIT_CONTACTS,
	DELETE_CONTACTS,
	CLEAR_CONTACTS,
	REQUEST,
	SUCCESS,
	FAILURE,
} from "../types";

const initialState = {
	loading: false,
	loaded: false,
	error: null,
	contacts: [],
};

const handlers = {
	[LOAD_CONTACTS + REQUEST]: (draft) => {
		draft.loading = true;
		draft.loaded = false;
		draft.error = null;
	},
	[LOAD_CONTACTS + SUCCESS]: (draft, { response }) => {
		draft.loading = false;
		draft.loaded = true;
		draft.error = null;
		draft.contacts = response;
	},
	[LOAD_CONTACTS + FAILURE]: (draft, { error }) => {
		draft.loading = false;
		draft.loaded = false;
		draft.error = error;
	},
	[DELETE_CONTACTS + SUCCESS]: (draft, { id }) => {
		const index = draft.contacts.findIndex((contact) => contact.id === id);
		draft.contacts.splice(index, 1);
	},
	[ADD_CONTACTS + SUCCESS]: (draft, { response }) => {
		draft.contacts.push(response);
	},
	[EDIT_CONTACTS + SUCCESS]: (draft, { response }) => {
		const index = draft.contacts.findIndex(
			(contact) => contact.id === response.id
		);
		draft.contacts.splice(index, 1, response);
	},
	[CLEAR_CONTACTS]: () => initialState,
	DEFAULT: (state) => state,
};

export default produce((draft = initialState, action) => {
	const handler = handlers[action.type] || handlers.DEFAULT;
	return handler(draft, action);
});
