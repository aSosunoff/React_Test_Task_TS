import { createSelector } from "reselect";

const authUserSelector = (state) => state.authUser;

export const userSelector = createSelector(
	authUserSelector,
	({ user }) => user
);

export const isAuthenticatedSelector = createSelector(
	authUserSelector,
	({ isAuthenticated }) => isAuthenticated
);

export const loginLoadingSelector = createSelector(
	authUserSelector,
	({ loading }) => loading
);

export const loginLoadedSelector = createSelector(
	authUserSelector,
	({ loaded }) => loaded
);

export const loginErrorSelector = createSelector(
	authUserSelector,
	({ error }) => error
);
