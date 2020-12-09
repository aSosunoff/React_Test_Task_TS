import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./reducer";
import api from "./middleware/api";

import LocalStorage from "../utils/LocalStorage";

const enhancer = applyMiddleware(thunk, api);

const persistedState = LocalStorage.store ? LocalStorage.store : {};

export default createStore(
	reducer,
	persistedState,
	composeWithDevTools(enhancer)
);
