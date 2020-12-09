import { createSelector } from "reselect";
import { getById } from "../utils";

const contactsSelector = (state) => state.contacts;

export const listSelector = createSelector(
	contactsSelector,
	({ contacts }) => contacts
);

export const contactSelector = getById(listSelector);

export const loadingSelector = createSelector(
	contactsSelector,
	({ loading }) => loading
);

export const loadedSelector = createSelector(
	contactsSelector,
	({ loaded }) => loaded
);

export const errorSelector = createSelector(
	contactsSelector,
	({ error }) => error
);
