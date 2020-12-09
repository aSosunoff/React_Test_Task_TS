import { createSelector } from "reselect";

const contactsSelector = (state) => state.contacts;

export const listSelector = createSelector(
	contactsSelector,
	({ contacts }) => contacts
);

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
