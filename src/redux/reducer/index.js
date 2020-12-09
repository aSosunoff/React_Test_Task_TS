import { combineReducers } from "redux";

import authUser from "./authUser";
import contacts from "./contacts";

export default combineReducers({
	authUser,
	contacts,
});
