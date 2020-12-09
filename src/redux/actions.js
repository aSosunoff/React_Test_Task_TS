import { LOGIN, LOGOUT, LOAD_CONTACTS } from "./types";

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
