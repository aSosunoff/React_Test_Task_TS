import {
	LOGIN,
	LOGOUT,
	LOAD_CONTACTS,
	DELETE_CONTACTS,
	ADD_CONTACTS,
} from "./types";

export const login = (user) => ({
	type: LOGIN,
	CallAPI: "profile",
	methodAPI: "get",
	paramsAPI: {
		params: user,
	},
});

export const logout = () => ({
	type: LOGOUT,
});

export const loadContacts = () => ({
	type: LOAD_CONTACTS,
	CallAPI: "contacts",
	methodAPI: "get",
});

export const deleteContacts = (id) => ({
	type: DELETE_CONTACTS,
	CallAPI: `contacts/${id}`,
	methodAPI: "delete",
	id,
});

export const addContacts = (contactNew) => ({
	type: ADD_CONTACTS,
	CallAPI: "contacts",
	methodAPI: "post",
	paramsAPI: contactNew,
});
