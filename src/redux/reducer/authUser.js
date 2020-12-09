import produce from "immer";
import { LOGIN, LOGOUT, REQUEST, SUCCESS, FAILURE } from "../types";

const initialState = {
	loading: false,
	loaded: false,
	error: null,
	user: {},
};

const handlers = {
	[LOGIN + REQUEST]: (draft) => {
		draft.loading = true;
	},
	[LOGIN + SUCCESS]: (draft, { response: [user] }) => {
		draft.loading = false;
		draft.loaded = true;
		draft.error = null;
		draft.user = user;
	},
	[LOGIN + FAILURE]: (draft, { error }) => {
		draft.loading = false;
		draft.loaded = false;
		draft.error = error;
	},
	[LOGOUT]: () => initialState,
	DEFAULT: (state) => state,
};

export default produce((draft = initialState, action) => {
	const handler = handlers[action.type] || handlers.DEFAULT;
	return handler(draft, action);
});
